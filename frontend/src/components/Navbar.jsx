
  import { Link, useNavigate, useLocation } from 'react-router-dom';
  import { ShoppingCart, Search, User, Globe, Menu, LogOut } from 'lucide-react';
  import { useState, useEffect } from 'react';
  import { readCart } from '../utils/cart';

  function Navbar({ theme, setTheme }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      // Update user info on route change
      const user = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(user);
    }, [location]);

    const isAdmin = userInfo && userInfo.role === 'admin';

    // Cart count handling
    useEffect(() => {
      const updateCartCount = (e) => {
        if (e && e.detail && typeof e.detail.count === 'number') {
          setCartCount(e.detail.count);
          return;
        }
        const cart = readCart();
        const count = (cart || []).reduce((acc, item) => acc + Number(item.qty || 0), 0);
        setCartCount(count);
      };
      updateCartCount();
      window.addEventListener('cartUpdated', updateCartCount);
      window.addEventListener('storage', updateCartCount);
      return () => {
        window.removeEventListener('cartUpdated', updateCartCount);
        window.removeEventListener('storage', updateCartCount);
      };
    }, []);

    const logoutHandler = () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      setUserInfo(null);
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/login');
    };

    // Search navigation helper
    const executeSearch = () => {
      if (searchTerm.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      }
    };

    return (
      <nav className="border-b bg-white dark:bg-gray-900 px-4 py-2 fixed w-full z-50">
        {/* Desktop Navbar */}
        {isAdmin ? (
          <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-5 text-sm text-gray-700 dark:text-gray-300">
              <Link to="/" className="font-bold text-lg mr-4">Famazon</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-blue-500 hover:underline">Admin Dashboard</Link>
              <button onClick={logoutHandler} className="text-red-500 hover:underline">
                <LogOut size={20} />
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
            {/* Left links */}
            <div className="flex items-center gap-5 text-sm text-gray-700 dark:text-gray-300">
              <Link to="/" className="font-bold text-lg mr-4">Famazon</Link>
              {/* <Link to="/about" className="hover:underline">About</Link> */}
              <Link to="/eletronics" className="hover:font-bold">Electronics</Link>
              <Link to="/mobile" className="hover:font-bold">Mobile</Link>
              <Link to="/homeandkitchen" className="hover:font-bold">Kitchen & Home</Link>
              <Link to="/fashion" className="hover:font-bold">Fashion</Link>
            </div>

            {/* Center search bar */}
            <div className="flex flex-grow max-w-xl mx-4">
              <input
                type="text"
                placeholder="Search Famazon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') executeSearch(); }}
                className="flex-grow rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 p-2 focus:outline-none"
                aria-label="Search Famazon"
              />
              <button
                onClick={executeSearch}
                className="bg-yellow-400 p-2 rounded-r-md hover:bg-yellow-500 text-gray-900 dark:text-gray-100"
                aria-label="Execute Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Right icons & links */}
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300 text-sm">
              <button className="flex items-center gap-1 hover:font-bold">
                <Globe size={18} /> EN
              </button>
              <Link to="/customer" className="hover:font-bold hidden lg:inline">Customer Service</Link>
              {userInfo && (
                <Link to="/cart" className="relative hover:font-bold">
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-yellow-400 text-black rounded-full text-xs px-1">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              {userInfo ? (
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Hi, {userInfo.name}</span>
                  <Link to="/account" className="text-blue-500 hover:underline">Account</Link>
                  {userInfo.role === 'admin' && (
                    <Link to="/admin" className="text-blue-500 hover:underline">Admin</Link>
                  )}
                  <button onClick={logoutHandler} className="text-red-500 hover:underline">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hover:underline">
                  <User size={24} />
                </Link>
              )}
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navbar */}
        {isAdmin ? (
          <div className="flex md:hidden justify-between items-center">
            <Link to="/" className="font-bold text-lg">Famazon</Link>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu size={24} />
              </button>
              <button onClick={logoutHandler} className="ml-2 text-red-500">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex md:hidden justify-between items-center">
            <Link to="/" className="font-bold text-lg">Famazon</Link>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu size={24} />
              </button>
              {userInfo && (
                <Link to="/cart" className="relative">
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-yellow-400 text-black rounded-full text-xs px-1">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              {isAdmin ? (
                <>
                  {userInfo && <span className="font-bold">Hi, {userInfo.name}</span>}
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-blue-500">Admin Dashboard</Link>
                  <button onClick={() => { logoutHandler(); setMobileMenuOpen(false); }} className="text-left text-red-500">Logout</button>
                  <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileMenuOpen(false); }} className="text-left">Toggle Theme {theme === 'dark' ? '🌞' : '🌙'}</button>
                </>
              ) : (
                <>
                  {userInfo && <span className="font-bold">Hi, {userInfo.name}</span>}
                  {userInfo && <Link to="/account" onClick={() => setMobileMenuOpen(false)}>Account</Link>}
                  <Link to="/mobile" onClick={() => setMobileMenuOpen(false)}>Mobile</Link>
                  <Link to="/eletronics" onClick={() => setMobileMenuOpen(false)}>Electronics</Link>
                  <Link to="/homeandkitchen" onClick={() => setMobileMenuOpen(false)}>Kitchen & Home</Link>
                  <Link to="/fashion" onClick={() => setMobileMenuOpen(false)}>Fashion</Link>
                  <Link to="/customer" onClick={() => setMobileMenuOpen(false)}>Customer Service</Link>
                  {userInfo && userInfo.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-blue-500">Admin Dashboard</Link>
                  )}
                  {userInfo ? (
                    <button onClick={() => { logoutHandler(); setMobileMenuOpen(false); }} className="text-left text-red-500">Logout</button>
                  ) : (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  )}
                  <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileMenuOpen(false); }} className="text-left">Toggle Theme {theme === 'dark' ? '🌞' : '🌙'}</button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }

  export default Navbar;
