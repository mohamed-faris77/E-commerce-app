// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';


function Navbar({ theme, setTheme }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md dark:shadow-gray-800">
      <h1 className="text-2xl font-bold">Famazon!</h1>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/products" className="hover:underline">Shop</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/cart" className="hover:underline">🛒</Link>
        <Link to="/login" className="hover:underline">👤</Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}


export default Navbar;