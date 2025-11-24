import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './home/ProductCard';
import api from '../services/api';

function MobilePage() {
  const [products, setProducts] = useState([]);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    rating: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?category=Mobile');
        // Filter for Mobile category (redundant but safe)
        const mobileProducts = data.products;
        setProducts(mobileProducts);
        setFilteredMobiles(mobileProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = products;

    if (filters.brand) {
      filtered = filtered.filter(mobile => mobile.brand === filters.brand);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(mobile => mobile.price >= min && mobile.price <= max);
    }

    if (filters.rating) {
      filtered = filtered.filter(mobile => mobile.ratings >= Number(filters.rating));
    }

    setFilteredMobiles(filtered);
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen pt-24">
      <h1 className="text-3xl font-semibold mb-6">Mobile Phones</h1>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Brands</option>
            <option value="Samsung">Samsung</option>
            <option value="Apple">Apple</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Nothing">Nothing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Prices</option>
            <option value="0-300">$0 - $300</option>
            <option value="300-600">$300 - $600</option>
            <option value="600-1000">$600 - $1000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Min Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Ratings</option>
            <option value="4.0">4.0+</option>
            <option value="4.5">4.5+</option>
            <option value="4.8">4.8+</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({ brand: '', priceRange: '', rating: '' })}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Clear Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMobiles.map(mobile => (
          <Link key={mobile._id} to={`/product/${mobile._id}`}>
            <ProductCard
              image={mobile.images[0]?.url}
              title={mobile.name}
              price={mobile.price}
              rating={mobile.ratings}
            />
          </Link>
        ))}
      </div>

      {filteredMobiles.length === 0 && (
        <p className="text-center mt-10">No mobiles match your filters.</p>
      )}
    </div>
  );
}

export default MobilePage;