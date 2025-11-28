import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/auth/me');
      setUser(data.data);
      setForm({ name: data.data.name || '', email: data.data.email || '', password: '' });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/myorders');
      setOrders(data || []);
    } catch (err) {
      console.error('fetchOrders', err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;
      const { data } = await api.put('/auth/me', payload);
      setUser(data.data);
      setModal({ isOpen: true, title: 'Profile Updated', message: 'Your profile has been updated successfully.' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const { data } = await api.put(`/orders/${orderId}/cancel`);
      setModal({ isOpen: true, title: 'Order Cancelled', message: 'Your order has been cancelled.' });
      fetchOrders();
    } catch (err) {
      setModal({ isOpen: true, title: 'Error', message: err.response?.data?.message || 'Failed to cancel order' });
    }
  };

  const handleReturnOrder = async (orderId) => {
    if (!window.confirm('Request return for this delivered order?')) return;
    try {
      const { data } = await api.put(`/orders/${orderId}/return`);
      setModal({ isOpen: true, title: 'Return Requested', message: 'Return has been requested for this order.' });
      fetchOrders();
    } catch (err) {
      setModal({ isOpen: true, title: 'Error', message: err.response?.data?.message || 'Failed to request return' });
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4 pb-12">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password (optional)</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700" />
            </div>
            <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded">Save Changes</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">You have not placed any orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm text-gray-500">Order ID <span className="font-mono text-xs">{order._id.substring(0, 8)}...</span></div>
                      <div className="text-sm text-gray-600">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Total: <span className="font-semibold">${order.totalPrice.toFixed(2)}</span></div>
                      <div className="text-sm mt-1">
                        {order.isCancelled ? (
                          <span className="text-red-500 font-semibold">Cancelled</span>
                        ) : order.isReturned ? (
                          <span className="text-orange-500 font-semibold">Returned</span>
                        ) : order.isDelivered ? (
                          <span className="text-green-500 font-semibold">Delivered</span>
                        ) : (
                          <span className="text-yellow-500 font-semibold">On the way</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="md:col-span-2">
                      {order.orderItems.map(item => (
                        <div key={item.product} className="flex items-center gap-4 mb-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-sm text-gray-500">Qty: {item.qty} • ${item.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="md:col-span-1 flex flex-col gap-2">
                      {!order.isDelivered && !order.isCancelled && (
                        <button onClick={() => handleCancelOrder(order._id)} className="px-3 py-2 bg-red-500 text-white rounded">Cancel Order</button>
                      )}
                      {order.isDelivered && !order.isReturned && (
                        <button onClick={() => handleReturnOrder(order._id)} className="px-3 py-2 bg-orange-500 text-white rounded">Request Return</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.title === 'Error' ? 'error' : 'success'}
        showActions={false}
      />
    </div>
  );
};

export default UserDashboard;
