import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
    <Link to={`/products/${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
    </Link>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-500 mb-4">${product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View
      </Link>
    </div>
  </div>
);

export default ProductCard;
