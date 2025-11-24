import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import api from '../../services/api';

function ProductGridSection({ title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        // Get first 6 products for the home page
        setProducts(data.products.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h3 className="font-semibold text-xl mb-4">{title}</h3>
        <div className="text-center py-8">Loading products...</div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <h3 className="font-semibold text-xl mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
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
    </section>
  );
}

export default ProductGridSection;
