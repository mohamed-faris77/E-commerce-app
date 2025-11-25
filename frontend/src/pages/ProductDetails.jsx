import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from './home/ProductCard';
import Modal from '../components/Modal';
import api from '../services/api';
import { readCart, writeCart } from '../utils/cart';

const getRecentlyWatched = () => {
  const watched = localStorage.getItem('recentlyWatched');
  return watched ? JSON.parse(watched) : [];
};

function ProductDetails() {
  const { id } = useParams();
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

  // Auto-slide images every 3 seconds
  useEffect(() => {
    if (product && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 3000);
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
    // Directly navigate to cart page
    window.location.href = '/cart';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Added to Cart!"
        message={`${product.name} has been added to your cart.`}
        type="success"
      />
      <Link to="/eletronics" className="text-sm underline mb-4 inline-block">← Back to Products</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Carousel */}
        <div className="relative">
          <img
            src={product.images[currentImageIndex]?.url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="flex justify-center mt-4 space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-yellow-400' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-yellow-500 text-lg">⭐ {product.ratings} ({product.numOfReviews} reviews)</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

          <div className="flex items-center gap-4">
            <label htmlFor="qty" className="font-semibold">Quantity:</label>
            <input
              id="qty"
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
              className="w-20 border rounded p-1 text-center dark:bg-gray-700"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-500 disabled:opacity-50"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={buyNow}
              disabled={product.stock === 0}
              className="bg-orange-500 text-white py-2 px-6 rounded font-semibold hover:bg-orange-600 disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews.length === 0 && <p>No reviews yet</p>}
          {product.reviews.map(review => (
            <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{review.name}</span>
                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Watched Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recently Watched</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentlyWatched.map(p => (
            <Link key={p._id} to={`/product/${p._id}`}>
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
    </div>
  );
}

export default ProductDetails;
