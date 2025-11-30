import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { readCart, writeCart, clearCart } from '../utils/cart';
import ProductCard from './home/ProductCard';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = readCart();
    setCartItems(saved);
  }, []);

  const updateQuantity = (id, delta, stock) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product === id
          ? { ...item, qty: Math.max(1, Math.min(stock, item.qty + delta)) }
          : item
      )
    );
  };

  const removeItem = id => {
    const updated = cartItems.filter(item => item.product !== id);
    setCartItems(updated);
    writeCart(updated);
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const proceedToCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-700 to-pink-600 opacity-90"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-white">Your Shopping Cart</h1>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-lg mb-4">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-500"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div
                  key={item.product}
                  className="flex bg-white dark:bg-gray-800 rounded-xl shadow p-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="font-semibold text-lg hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product, -1, item.countInStock)}
                        className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.product, 1, item.countInStock)}
                        className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </p>
                <hr />
                <p className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={proceedToCheckout}
                className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-500 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
