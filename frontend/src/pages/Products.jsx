import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from './home/ProductCard'; // Assuming ProductCard is in pages/home/ – adjust if needed

// Sample product data (replace with API fetch based on :id)
const sampleProduct = {
  id: '1',
  title: 'JBL T460BT Black Headphones',
  price: 125.0,
  oldPrice: 250.0,
  rating: 4.7,
  brand: 'JBL',
  description: 'Wireless on-ear headphones with extra bass, 11 hours playtime, noise cancellation, and comfortable fit.',
  specifications: [
    'Battery Life: 11 hours',
    'Connectivity: Bluetooth 5.0',
    'Weight: 185g',
    'Color: Black',
  ],
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  ],
  reviews: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Amazing sound quality and battery life!' },
    { id: 2, user: 'Sarah K.', rating: 4, comment: 'Comfortable for long sessions, but a bit bulky.' },
    { id: 3, user: 'Mike R.', rating: 5, comment: 'Noise cancellation is top-notch. Highly recommend!' },
  ],
};

// Sample related products
const relatedProducts = [
  { id: 'r1', title: 'Sony WH-1000XM5 Headphones', price: 349, rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' },
  { id: 'r2', title: 'Bose QuietComfort Earbuds', price: 279, rating: 4.7, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' },
  { id: 'r3', title: 'Apple AirPods Pro', price: 249, rating: 4.8, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' },
];

// Sample recently watched products (from localStorage)
const getRecentlyWatched = () => {
  const watched = localStorage.getItem('recentlyWatched');
  return watched ? JSON.parse(watched) : [];
};

function ProductDetails() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [recentlyWatched, setRecentlyWatched] = useState(getRecentlyWatched());

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sampleProduct.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Add to recently watched
  useEffect(() => {
    const updatedWatched = [sampleProduct, ...recentlyWatched.filter(p => p.id !== sampleProduct.id)].slice(0, 5);
    setRecentlyWatched(updatedWatched);
    localStorage.setItem('recentlyWatched', JSON.stringify(updatedWatched));
  }, [id]);

  const addToCart = () => {
    alert(`Added ${qty} x "${sampleProduct.title}" to cart. (Demo - integrate with cart state)`);
  };

  const buyNow = () => {
    alert(`Proceeding to buy "${sampleProduct.title}". (Demo - redirect to checkout)`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <Link to="/products" className="text-sm underline mb-4 inline-block">← Back to Products</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Carousel */}
        <div className="relative">
          <img
            src={sampleProduct.images[currentImageIndex]}
            alt={sampleProduct.title}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="flex justify-center mt-4 space-x-2">
            {sampleProduct.images.map((_, index) => (
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
          <h1 className="text-3xl font-bold">{sampleProduct.title}</h1>
          <p className="text-yellow-500 text-lg">⭐ {sampleProduct.rating} ({sampleProduct.reviews.length} reviews)</p>
          <div className="flex items-center gap-3">
            {sampleProduct.oldPrice && <span className="line-through text-gray-500">${sampleProduct.oldPrice.toFixed(2)}</span>}
            <span className="text-2xl font-bold">${sampleProduct.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{sampleProduct.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Specifications:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
              {sampleProduct.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="qty" className="font-semibold">Quantity:</label>
            <input
              id="qty"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-20 border rounded p-1 text-center dark:bg-gray-700"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-500"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="bg-orange-500 text-white py-2 px-6 rounded font-semibold hover:bg-orange-600"
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
          {sampleProduct.reviews.map(review => (
            <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{review.user}</span>
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
          {recentlyWatched.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard 
                image={product.images ? product.images[0] : product.image} 
                title={product.title} 
                price={product.price} 
                rating={product.rating} 
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {relatedProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard 
                image={product.image} 
                title={product.title} 
                price={product.price} 
                rating={product.rating} 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
