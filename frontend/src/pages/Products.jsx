import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => (
  <>
    <h2 className="text-2xl font-bold mb-6">Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </>
);

export default Products;
