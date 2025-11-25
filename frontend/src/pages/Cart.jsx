import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { readCart, writeCart } from '../utils/cart';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = readCart();
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, newQty, stock) => {
    if (newQty < 1 || newQty > stock) return;

    const updatedCart = cartItems.map(item =>
      item.product === id ? { ...item, qty: newQty } : item
    );
    setCartItems(updatedCart);
    writeCart(updatedCart);
  };

  const onRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.product !== id);
    setCartItems(updatedCart);
    writeCart(updatedCart);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50;
  const totalPrice = subtotal + tax + shipping;

  const checkoutHandler = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-yellow-400 text-black py-2 px-6 rounded font-semibold hover:bg-yellow-500">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-4">
            {cartItems.map(item => (
              <div key={item.product} className="flex gap-4 bg-white dark:bg-gray-800 rounded shadow p-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded" />
                <div className="flex flex-col justify-between flex-grow">
                  <Link to={`/product/${item.product}`} className="font-semibold hover:underline">{item.name}</Link>
                  <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <span>Quantity:</span>
                    <button
                      onClick={() => updateQuantity(item.product, item.qty - 1, item.countInStock)}
                      className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.product, item.qty + 1, item.countInStock)}
                      className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.product)}
                  className="self-start text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded shadow p-6 h-fit">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <p>Subtotal: <span className="float-right">${subtotal.toFixed(2)}</span></p>
              <p>Tax (18%): <span className="float-right">${tax.toFixed(2)}</span></p>
              <p>Shipping: <span className="float-right">${shipping.toFixed(2)}</span></p>
              <hr />
              <p className="font-bold">Total: <span className="float-right">${totalPrice.toFixed(2)}</span></p>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-500 block text-center"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <Link to="/" className="inline-block mt-6 underline">Continue Shopping</Link>
      )}
    </div>
  );
}

export default Cart;
