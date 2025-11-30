import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Famazon</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your one-stop shop for everything — electronics, fashion, home and more. Fast delivery, secure payments, and great deals.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Twitter" className="hover:text-blue-500"><Twitter size={20} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-700"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><Instagram size={20} /></a>
            <a href="mailto:support@famazon.com" aria-label="Email" className="hover:text-green-600"><Mail size={20} /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/eletronics" className="hover:font-bold">Electronics</Link></li>
              <li><Link to="/mobile" className="hover:font-bold">Mobile</Link></li>
              <li><Link to="/homeandkitchen" className="hover:font-bold">Kitchen & Home</Link></li>
              <li><Link to="/fashion" className="hover:font-bold">Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/contact" className="hover:font-bold">Contact Us</Link></li>
              <li><Link to="/customer" className="hover:font-bold">Customer Service</Link></li>
              <li><Link to="/about" className="hover:font-bold">About</Link></li>
              <li><Link to="/careers" className="hover:font-bold">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Join our newsletter</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get the latest deals, product launches and more — delivered straight to your inbox.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }} className="flex gap-2">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input id="footer-email" type="email" required placeholder="you@example.com" className="flex-1 px-3 py-2 border rounded-l-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-sm" />
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-r-md text-sm hover:bg-purple-700">Subscribe</button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">© {new Date().getFullYear()} <a href="https://porfoliofaris.netlify.app" className="hover:underline">Famazon</a> Inc.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
