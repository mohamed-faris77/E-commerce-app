// pages/ProductDetails.jsx
import { useParams } from 'react-router-dom';


function ProductDetails() {
const { id } = useParams();
return (
<div className="text-center">
<h2 className="text-2xl font-semibold mb-4">Product Details - ID: {id}</h2>
<p className="text-gray-600 dark:text-gray-300">This page will show more details about the product.</p>
</div>
);
}


export default ProductDetails;


