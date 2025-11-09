// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar({ theme, setTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md dark:shadow-gray-800 bg-white dark:bg-gray-900 transition-colors">
      {/* Brand / Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white"
      >
        Famazon!
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-600">
          Shop
        </Link>
        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>
        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>

        {/* Show Dashboard only if Admin */}
        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-blue-600">
            Dashboard
          </Link>
        )}

        {/* Cart Icon */}
        <Link to="/cart" className="relative text-xl hover:text-blue-600">
          🛒
        </Link>

        {/* Login / Logout Logic */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-xl hover:text-blue-600">
            👤
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
