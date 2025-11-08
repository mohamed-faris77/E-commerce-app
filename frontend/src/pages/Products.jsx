// pages/Products.jsx
import ProductCard from '../components/ProductCard';


const products = [
{ id: 1, name: 'Smart Watch', price: 199, image: 'https://frankybros.com/wp-content/uploads/2022/04/keep-life-simple-minimalist-aesthetic-art-printed-tshirt-for-women-buy-online.webp' },
{ id: 2, name: 'Wireless Earbuds', price: 99, image: '' },
{ id: 3, name: 'Laptop', price: 899, image: '' }
];


function Products() {
return (
<div>
<h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{products.map((p) => (
<ProductCard key={p.id} product={p} />
))}
</div>
</div>
);
}


export default Products;