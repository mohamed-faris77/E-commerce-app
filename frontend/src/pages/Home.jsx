// pages/Home.jsx
import { Link } from 'react-router-dom';


function Home() {
return (
<section className="text-center py-10">
<h2 className="text-3xl font-semibold mb-4">Welcome to Famazon</h2>
<p className="text-lg opacity-80 mb-6">Your one-stop destination for modern shopping.</p>
<Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Shop Now</Link>
</section>
);
}


export default Home;