import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length === 0) {
      navigate('/cart');
    }
    setCartItems(savedCart);

    // Check auth
    if (!localStorage.getItem('userInfo')) {
      navigate('/login?redirect=checkout');
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = subtotal * 0.18;
  const shippingPrice = subtotal > 500 ? 0 : 50;
  const totalPrice = subtotal + taxPrice + shippingPrice;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const placeOrderHandler = async () => {
    setLoading(true);
    setError(null);

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setError("Please fill in all shipping fields");
      setLoading(false);
      return;
    }

    try {
      const res = await loadRazorpayScript();

      if (!res) {
        setError('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // 1. Create Order on Backend
      const { data: orderData } = await api.post('/payment/create-order', {
        amount: Number(totalPrice),
      });

      const { data: keyData } = await api.get('/payment/get-key');

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const options = {
        key: keyData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Famazon",
        description: "Order Payment",
        image: "https://example.com/logo.png", // You can add your logo here
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 2. Verify Payment
            const verifyRes = await api.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              // 3. Create Order in Database
              const finalOrderData = {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod: 'Razorpay',
                paymentResult: {
                  id: response.razorpay_payment_id,
                  status: 'paid',
                  update_time: new Date().toISOString(),
                  email_address: userInfo.email,
                },
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
                isPaid: true,
                paidAt: new Date().toISOString(),
              };

              const { data: createdOrder } = await api.post('/orders', finalOrderData);

              // Clear cart
              localStorage.removeItem('cart');
              window.dispatchEvent(new Event('cartUpdated'));
              alert('Payment Successful! Order Placed.');
              navigate(`/`); // Redirect to home or order details
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Payment verification failed on server");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: "9999999999", // You might want to get this from user profile
        },
        notes: {
          address: shippingAddress.address,
        },
        theme: {
          color: "#FACC15", // Yellow-400
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                className="w-full border p-2 rounded dark:bg-gray-700"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className="w-full border p-2 rounded dark:bg-gray-700"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                className="w-full border p-2 rounded dark:bg-gray-700"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                className="w-full border p-2 rounded dark:bg-gray-700"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Razorpay"
                  checked={paymentMethod === 'Razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Razorpay (Credit/Debit/UPI)
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item.product} className="flex justify-between text-sm">
                <span>{item.name} (x{item.qty})</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between">
              <span>Items</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrderHandler}
            disabled={loading || !shippingAddress.address}
            className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay & Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;