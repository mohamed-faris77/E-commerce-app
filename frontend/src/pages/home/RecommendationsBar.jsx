import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Headphones, Home, ShirtIcon, LogIn } from 'lucide-react';

function RecommendationsBar() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo?.name || 'Guest';

  return (
    <section className="max-w-7xl mx-auto px-4 mt-6 bg-white dark:bg-gray-900 rounded shadow py-4 flex gap-4 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-3 border rounded p-2 min-w-[200px]">
        <img
          src={userInfo?.avatar || "https://randomuser.me/api/portraits/men/70.jpg"}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">Hi, {userName}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">recommendations for you 😊</p>
        </div>
      </div>

      {!userInfo && (
        <Link to="/login" className="flex items-center gap-3 border rounded p-2 min-w-[200px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <LogIn size={32} className="text-yellow-500" />
          <div>
            <p className="font-semibold">Login</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Sign in to account</p>
          </div>
        </Link>
      )}

      <Link to="/eletronics" className="flex items-center gap-3 border rounded p-2 min-w-[200px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Headphones size={32} className="text-blue-500" />
        <div>
          <p className="font-semibold">Electronics</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Big Sale 50%</p>
        </div>
      </Link>

      <Link to="/homeandkitchen" className="flex items-center gap-3 border rounded p-2 min-w-[200px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Home size={32} className="text-green-500" />
        <div>
          <p className="font-semibold">Home & Kitchen</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Big Sale 30%</p>
        </div>
      </Link>

      <Link to="/fashion" className="flex items-center gap-3 border rounded p-2 min-w-[200px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <ShirtIcon size={32} className="text-pink-500" />
        <div>
          <p className="font-semibold">Fashion</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Big Sale 30%</p>
        </div>
      </Link>
    </section>
  );
}

export default RecommendationsBar;
