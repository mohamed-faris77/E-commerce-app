// components/ProductCard.jsx
import { Link } from 'react-router-dom';


function ProductCard({ product }) {
return (
<div className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all">
<img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
<div className="p-4">
<h3 className="text-lg font-semibold mb-2">{product.name}</h3>
<p className="text-gray-500 mb-2">${product.price}</p>
<div className="flex justify-between items-center">
<Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">More Info</Link>
<button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">Add to Cart</button>
</div>
</div>
</div>
);
}


export default ProductCard;