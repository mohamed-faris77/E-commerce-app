import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './home/ProductCard';
import api from '../services/api';

function FashionPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    rating: ''
  });

  // Fetch fashion products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?category=Fashion');
        const fashionProducts = data.products;
        setProducts(fashionProducts);
        setFilteredProducts(fashionProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = products;
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }
    if (filters.rating) {
      filtered = filtered.filter(p => p.ratings >= Number(filters.rating));
    }
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen pt-24">
      <h1 className="text-3xl font-semibold mb-6">Fashion</h1>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 flex flex-wrap gap-4">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-semibold mb-1">Brand</label>
          <select
            value={filters.brand}
            onChange={e => handleFilterChange('brand', e.target.value)}
            className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Brands</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Levi's">Levi's</option>
            <option value="Zara">Zara</option>
            <option value="H&M">H&M</option>
            <option value="Gucci">Gucci</option>
            <option value="Puma">Puma</option>
            <option value="Uniqlo">Uniqlo</option>
            <option value="Ray-Ban">Ray-Ban</option>
            <option value="Forever 21">Forever 21</option>
            <option value="New Balance">New Balance</option>
            <option value="Calvin Klein">Calvin Klein</option>
            <option value="Louis Vuitton">Louis Vuitton</option>
            <option value="Gap">Gap</option>
            <option value="Tommy Hilfiger">Tommy Hilfiger</option>
            <option value="Converse">Converse</option>
            <option value="Banana Republic">Banana Republic</option>
            <option value="Old Navy">Old Navy</option>
            <option value="Rolex">Rolex</option>
            <option value="Victoria's Secret">Victoria's Secret</option>
            <option value="Under Armour">Under Armour</option>
            <option value="Kate Spade">Kate Spade</option>
            <option value="Reebok">Reebok</option>
            <option value="Ann Taylor">Ann Taylor</option>
            <option value="Coach">Coach</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-semibold mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={e => handleFilterChange('priceRange', e.target.value)}
            className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-150">$50 - $150</option>
            <option value="150-500">$150 - $500</option>
            <option value="500-2000">$500 - $2000</option>
            <option value="2000-10000">$2000+</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold mb-1">Min Rating</label>
          <select
            value={filters.rating}
            onChange={e => handleFilterChange('rating', e.target.value)}
            className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Ratings</option>
            <option value="4.0">4.0+</option>
            <option value="4.5">4.5+</option>
            <option value="4.8">4.8+</option>
          </select>
        </div>

        {/* Clear Filters Button */}
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

export default FashionPage;