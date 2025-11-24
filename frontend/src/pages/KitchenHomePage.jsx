import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './home/ProductCard';
import api from '../services/api';

function KitchenHomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
        const categoryName = 'Kitchen & Home';
        const encodedCategory = encodeURIComponent(categoryName);
        const url = `/products?category=${encodedCategory}`;

        console.log('🔍 KitchenHomePage - Fetching products');
        console.log('Category:', categoryName);
        console.log('Encoded:', encodedCategory);
        console.log('URL:', url);

        const { data } = await api.get(url);

        console.log('📦 Response received:', data);
        console.log('Products count:', data.products?.length);
        if (data.products?.length > 0) {
          console.log('First 3 products:', data.products.slice(0, 3).map(p => ({ name: p.name, category: p.category })));
        }

        const kitchenProducts = data.products;
        setProducts(kitchenProducts);
        setFilteredProducts(kitchenProducts);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
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
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    if (filters.rating) {
      filtered = filtered.filter(product => product.ratings >= Number(filters.rating));
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen pt-24">
      <h1 className="text-3xl font-semibold mb-6">Kitchen & Home</h1>

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
            <option value="Instant Pot">Instant Pot</option>
            <option value="Ninja">Ninja</option>
            <option value="KitchenAid">KitchenAid</option>
            <option value="Cuisinart">Cuisinart</option>
            <option value="Dyson">Dyson</option>
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
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-2000">$1000+</option>
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
        {filteredProducts.map(product => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <ProductCard
              image={product.images[0]?.url}
              title={product.name}
              price={product.price}
              rating={product.ratings}
            />
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center mt-10">No products match your filters.</p>
      )}
    </div>
  );
}

export default KitchenHomePage;