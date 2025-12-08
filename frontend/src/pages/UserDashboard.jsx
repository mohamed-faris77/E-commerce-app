import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';

// Utility component for a glassmorphism card
const GlassCard = ({ children, className = '' }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 ${className}`}
  >
    {children}
  </div>
);

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);

  // Profile form state
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
    onConfirm: null,
    confirmText: 'Yes',
    cancelText: 'No'
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/auth/me');
      setUser(data.data);
      setForm({ name: data.data.name || '', email: data.data.email || '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/myorders');
      setOrders(data || []);
    } catch (err) {
      console.error('fetchOrders', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) payload.password = form.password;
      const { data } = await api.put('/auth/me', payload);
      setUser(data.data);
      setIsEditing(false); // Exit edit mode
      setModal({ isOpen: true, title: 'Profile Updated', message: 'Your profile has been updated successfully.', type: 'success' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancelOrder = async (orderId) => {
    setModal({
      isOpen: true,
      title: 'Confirm Cancellation',
      message: 'Are you sure you want to cancel this order? This will cancel all items in the order.',
      type: 'confirm',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: async () => {
        try {
          await api.put(`/orders/${orderId}/cancel`);
          setModal({ isOpen: true, title: 'Order Cancelled', message: 'Your order has been cancelled.', type: 'success' });
          fetchOrders();
        } catch (err) {
          setModal({ isOpen: true, title: 'Error', message: err.response?.data?.message || 'Failed to cancel order', type: 'error' });
        }
      },
    });
  };

  const handleReturnOrder = async (orderId) => {
    setModal({
      isOpen: true,
      title: 'Request Return',
      message: 'Do you want to request a return for this delivered order?',
      type: 'confirm',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: async () => {
        try {
          await api.put(`/orders/${orderId}/return`);
          setModal({ isOpen: true, title: 'Return Requested', message: 'Return has been requested for this order.', type: 'success' });
          fetchOrders();
        } catch (err) {
          setModal({ isOpen: true, title: 'Error', message: err.response?.data?.message || 'Failed to request return', type: 'error' });
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <span className="text-xl font-medium text-gray-700 dark:text-gray-200">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">

        {/* Profile Section */}
        <GlassCard className="lg:col-span-1 h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
              >
                Edit
              </button>
            )}
          </div>

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Name</label>
              {isEditing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 p-2.5 transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">{user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
              {isEditing ? (
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 p-2.5 transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg">{user?.email}</p>
              )}
            </div>

            {isEditing && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">New Password (optional)</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                  className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 p-2.5 transition-all"
                />
              </div>
            )}

            {isEditing && (
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ name: user.name, email: user.email, password: '' });
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </GlassCard>

        {/* Orders Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Orders</h2>

          {orders.length === 0 ? (
            <GlassCard>
              <p className="text-gray-500 text-center py-8">You have not placed any orders yet.</p>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <GlassCard key={order._id} className="overflow-hidden">
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-start border-b border-gray-100 dark:border-gray-700 pb-4 mb-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Order Placed</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">${order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Order ID</p>
                      <p className="text-sm font-mono text-gray-600 dark:text-gray-400">#{order._id.slice(-8)}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium mb-1">
                        {order.isCancelled ? (
                          <span className="text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">Cancelled</span>
                        ) : order.isRefunded ? (
                          <span className="text-purple-500 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">Refunded</span>
                        ) : order.isReturned ? (
                          <span className="text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">Returned</span>
                        ) : order.isDelivered ? (
                          <span className="text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Delivered</span>
                        ) : (
                          <span className="text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">On the way</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-6">
                    {order.orderItems.map((item) => (
                      <div key={item.product} className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{item.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">Quantity: {item.qty}</p>
                          <p className="text-indigo-600 font-medium mt-1">${item.price.toFixed(2)}</p>
                        </div>

                        {/* Action Buttons - Placed next to items visually but act on Order */}
                        <div className="flex-shrink-0">
                          {/* Only show Cancel if NOT delivered AND NOT cancelled */}
                          {!order.isDelivered && !order.isCancelled && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition shadow-sm w-full sm:w-auto"
                            >
                              Cancel Order
                            </button>
                          )}

                          {/* Only show Return if DELIVERED AND NOT returned AND NOT cancelled */}
                          {order.isDelivered && !order.isReturned && !order.isCancelled && (
                            <button
                              onClick={() => handleReturnOrder(order._id)}
                              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition shadow-sm w-full sm:w-auto"
                            >
                              Request Return
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        showActions={true}
      />
    </div>
  );
};

export default UserDashboard;
