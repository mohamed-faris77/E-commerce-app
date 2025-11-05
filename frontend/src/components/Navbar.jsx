import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import famazonLogo from '../assets/famazon.png';
import { useState, useEffect } from 'react';
import { Hanko } from '@teamhanko/hanko-elements';

const hankoApi = import.meta.env.VITE_HANKO_API_URL;
const hanko = new Hanko(hankoApi);

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/cart', label: 'Cart' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await hanko.user.getCurrent();
        setIsLoggedIn(!!user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkSession();

    hanko.onSessionCreated(() => {
      setIsLoggedIn(true);
    });

    hanko.onSessionExpired(() => {
      setIsLoggedIn(false);
    });
  }, []);

  const logout = async () => {
    try {
      await hanko.user.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={famazonLogo} alt="Famazon Logo" className="h-20 w-auto" />
        </Link>

        {/* Links */}
        <nav className="space-x-4">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `hover:underline ${isActive ? 'text-blue-600 dark:text-blue-400' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hover:underline ${isActive ? 'text-blue-600 dark:text-blue-400' : ''
                  }`
                }
              >
                Profile
              </NavLink>
              <button
                onClick={logout}
                className="hover:underline text-red-600 dark:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:underline ${isActive ? 'text-blue-600 dark:text-blue-400' : ''
                }`
              }
            >
              Login
            </NavLink>
          )}
        </nav>

        {/* Right controls */}
        <div className="flex items-center space-x-4">
          <NavLink to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {/* Badge example */}
            {/* <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">3</span> */}
          </NavLink>

          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
