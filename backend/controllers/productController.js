import Products from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    console.log('\n=== GET PRODUCTS REQUEST ===');
    console.log('Query params:', req.query);
    console.log('Category param:', req.query.category);

    const pageSize = 100;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {};

    // Add category filtering
    if (req.query.category) {
      keyword.category = req.query.category;
      console.log('Adding category filter:', req.query.category);
    }

    console.log('Final query object:', JSON.stringify(keyword, null, 2));

    const count = await Products.countDocuments({ ...keyword });
    const products = await Products.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    console.log(`Found ${products.length} products`);
    if (products.length > 0) {
      console.log('Sample products:', products.slice(0, 3).map(p => ({ name: p.name, category: p.category })));
    }
    console.log('=========================\n');

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    console.log('Create Product Request:', req.body);

    const {
      name,
      price,
      description,
      brand,
      category,
      stock,
      images,
      ratings,
      numOfReviews
    } = req.body;

    const product = new Products({
      name: name || 'Sample name',
      price: price || 0,
      createdBy: req.user._id,
      images: images || [{ url: '/images/sample.jpg' }],
      brand: brand || 'Sample brand',
      category: category || 'Electronics',
      stock: stock || 0,
      numOfReviews: numOfReviews || 0,
      ratings: ratings || 0,
      description: description || 'Sample description',
    });

    const createdProduct = await product.save();
    console.log('Product created successfully:', createdProduct._id);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      details: error.toString()
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    console.log('Update Product Request:', {
      id: req.params.id,
      body: req.body
    });

    const {
      name,
      price,
      description,
      image,
      images,
      brand,
      category,
      countInStock,
      stock,
    } = req.body;

    const product = await Products.findById(req.params.id);

    if (!product) {
      console.log('Product not found:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields only if provided
    if (name) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;

    // Handle stock
    if (stock !== undefined) {
      product.stock = Number(stock);
    } else if (countInStock !== undefined) {
      product.stock = Number(countInStock);
    }

    // Handle images - prioritize 'image' string over 'images' array
    if (image) {
      product.images = [{ url: image }];
      console.log('Updated image to:', image);
    } else if (images && Array.isArray(images) && images.length > 0) {
      product.images = images;
      console.log('Updated images array:', images);
    }

    // Save without running validators to avoid conflicts
    const updatedProduct = await product.save({ validateBeforeSave: false });

    console.log('Product updated successfully:', updatedProduct._id);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
      details: error.toString()
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (product) {
      await Products.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
