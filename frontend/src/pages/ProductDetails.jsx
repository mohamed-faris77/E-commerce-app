import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-500 mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>

      <Link
        to="/cart"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Add to Cart
      </Link>
    </div>
  );
};

export default ProductDetails;
