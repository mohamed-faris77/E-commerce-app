import { Link } from 'react-router-dom';

const Home = () => (
  <section className="text-center space-y-6">
    <h1 className="text-4xl font-bold">
      Welcome to <span className="text-blue-600">MyShop</span>
    </h1>
    <p className="max-w-lg mx-auto">
      Discover the best products at unbeatable prices.
    </p>
    <Link
      to="/products"
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
    >
      Browse Products
    </Link>
  </section>
);

export default Home;
