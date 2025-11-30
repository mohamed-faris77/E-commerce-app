import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from './home/ProductCard';
import Modal from '../components/Modal';
import api from '../services/api';
import { readCart, writeCart } from '../utils/cart';
import { Star, ShoppingCart, CreditCard, ArrowLeft, Minus, Plus, Truck, ShieldCheck } from 'lucide-react';

const getRecentlyWatched = () => {
  const watched = localStorage.getItem('recentlyWatched');
  return watched ? JSON.parse(watched) : [];
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [recentlyWatched, setRecentlyWatched] = useState(getRecentlyWatched());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Auto-slide images every 5 seconds (slower for better UX)
  useEffect(() => {
    if (product && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [product]);

  // Add to recently watched
  useEffect(() => {
    if (product) {
      const updatedWatched = [product, ...recentlyWatched.filter(p => p._id !== product._id)].slice(0, 5);
      setRecentlyWatched(updatedWatched);
      localStorage.setItem('recentlyWatched', JSON.stringify(updatedWatched));
    }
  }, [product]);

  const addToCart = () => {
    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.images[0]?.url,
      price: product.price,
      countInStock: product.stock,
      qty,
    };

    const existingCart = readCart();
    const existingItemIndex = existingCart.findIndex(x => x.product === cartItem.product);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].qty = qty;
    } else {
      existingCart.push(cartItem);
    }

    writeCart(existingCart);
    // Update local stock display after adding to cart
    setProduct(prev => ({
      ...prev,
      stock: Math.max(0, prev.stock - qty),
    }));
    setShowModal(true);
  };

  const buyNow = () => {
    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.images[0]?.url,
      price: product.price,
      countInStock: product.stock,
      qty,
    };

    const existingCart = readCart();
    const existingItemIndex = existingCart.findIndex(x => x.product === cartItem.product);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].qty = qty;
    } else {
      existingCart.push(cartItem);
    }

    writeCart(existingCart);
    // Update local stock before navigating to cart
    setProduct(prev => ({
      ...prev,
      stock: Math.max(0, prev.stock - qty),
    }));
    navigate('/cart');
  };

  const handleQtyChange = (delta) => {
    setQty(prev => Math.max(1, Math.min(product.stock, prev + delta)));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Added to Cart!"
        message={`${product.name} has been added to your cart.`}
        type="success"
      />

      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Images Section */}
            <div className="p-8 bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-square mb-4">
                <img
                  src={product.images[currentImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg"
                />
              </div>
              <div className="flex justify-center gap-3 mt-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-yellow-400 w-6' : 'bg-gray-400 hover:bg-gray-500'}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-2">
                <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(product.ratings) ? "currentColor" : "none"} className={i < Math.floor(product.ratings) ? "" : "text-gray-300 dark:text-gray-600"} />
                    ))}
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">({product.numOfReviews} reviews)</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-8">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Quantity</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    disabled={qty <= 1}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    disabled={qty >= product.stock}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className={`text-sm ${product.stock > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={buyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/30"
                >
                  <CreditCard size={20} />
                  Buy Now
                </button>
              </div>

              {/* Features / Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Truck className="text-yellow-500" size={24} />
                  <span className="text-sm">Free Delivery over $500</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <ShieldCheck className="text-green-500" size={24} />
                  <span className="text-sm">2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Watched Products */}
        {recentlyWatched.length > 0 && (
          <div className="mt-16 mb-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recentlyWatched.map(p => (
                <Link key={p._id} to={`/product/${p._id}`} className="group">
                  <ProductCard
                    image={p.images[0]?.url}
                    title={p.name}
                    price={p.price}
                    rating={p.ratings}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
