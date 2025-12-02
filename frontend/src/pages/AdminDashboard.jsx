import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../services/api';
import Modal from '../components/Modal';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    description: '',
    stock: '',
    imageUrl: ''
  });
  // Alert modal state
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsRes = await api.get('/products');
      const ordersRes = await api.get('/orders');
      const contactsRes = await api.get('/contact');
      const usersRes = await api.get('/auth/users');
      setProducts(productsRes.data.products);
      setOrders(ordersRes.data);
      setContacts(contactsRes.data.contacts || []);
      setUsers(usersRes.data.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      brand: '',
      category: 'Electronics',
      description: '',
      stock: '',
      imageUrl: ''
    });
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      description: product.description,
      stock: product.stock,
      imageUrl: product.images[0]?.url || ''
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      setAlertModal({ isOpen: true, title: 'Success', message: 'Product deleted successfully!', type: 'success', showActions: false });
    } catch (err) {
      setAlertModal({ isOpen: true, title: 'Error', message: 'Error deleting product: ' + err.message, type: 'error' });
    }
  };

  const handleMarkAsPaid = async (orderId) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/pay`, {
        id: 'manual_admin_update',
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        payer: { email_address: 'admin@manual.com' }
      });
      setOrders(orders.map(order => order._id === orderId ? data : order));
      setAlertModal({ isOpen: true, title: 'Success', message: 'Order marked as Paid', type: 'success', showActions: false });
    } catch (err) {
      setAlertModal({ isOpen: true, title: 'Error', message: 'Error updating order: ' + (err.response?.data?.message || err.message), type: 'error' });
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/deliver`);
      setOrders(orders.map(order => order._id === orderId ? data : order));
      setAlertModal({ isOpen: true, title: 'Success', message: 'Order marked as Delivered', type: 'success', showActions: false });
    } catch (err) {
      setAlertModal({ isOpen: true, title: 'Error', message: 'Error updating order: ' + (err.response?.data?.message || err.message), type: 'error' });
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: Number(formData.price),
      brand: formData.brand,
      category: formData.category,
      description: formData.description,
      stock: Number(formData.stock),
      images: [{ url: formData.imageUrl }],
      ratings: 4.5,
      numOfReviews: 0
    };
    try {
      if (editingProduct) {
        const { data } = await api.put(`/products/${editingProduct._id}`, { ...productData, image: formData.imageUrl });
        setProducts(products.map(p => p._id === editingProduct._id ? data : p));
        setAlertModal({ isOpen: true, title: 'Success', message: 'Product updated successfully!', type: 'success', showActions: false });
      } else {
        const { data } = await api.post('/products', productData);
        setProducts([...products, data]);
        setAlertModal({ isOpen: true, title: 'Success', message: 'Product created successfully!', type: 'success', showActions: false });
      }
      setShowProductModal(false);
      fetchData();
    } catch (err) {
      setAlertModal({ isOpen: true, title: 'Error', message: 'Error saving product: ' + err.message, type: 'error' });
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading Dashboard...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 min-h-screen pb-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b overflow-x-auto">
        <button className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-yellow-400 font-bold' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-yellow-400 font-bold' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
        <button className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'orders' ? 'border-b-2 border-yellow-400 font-bold' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
        <button className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-yellow-400 font-bold' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        <button className={`pb-2 px-4 whitespace-nowrap ${activeTab === 'contacts' ? 'border-b-2 border-yellow-400 font-bold' : ''}`} onClick={() => setActiveTab('contacts')}>Contact Messages</button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-green-500">${totalSales.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-500">{orders.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-purple-500">{products.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-500">{users.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Contact Messages</h3>
            <p className="text-3xl font-bold text-orange-500">{contacts.length}</p>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Manage Products</h2>
            <button onClick={handleAddProduct} className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center gap-2">
              <Plus size={20} /> Add Product
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4"><img src={product.images[0]?.url} alt={product.name} className="w-16 h-16 object-cover rounded" /></td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditProduct(product)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4">Order ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 text-sm font-mono">{order._id.substring(0, 8)}...</td>
                  <td className="p-4">{order.user ? order.user.name : 'Unknown'}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    {order.isCancelled ? (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Cancelled</span>
                    ) : order.isReturned ? (
                      <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Returned</span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Active</span>
                    )}
                  </td>
                  <td className="p-4">
                    {order.isPaid ? (
                      <span className="text-green-500 font-semibold">✓ Paid</span>
                    ) : order.isCancelled ? (
                      <button disabled className="text-gray-400 font-semibold border border-gray-300 px-2 py-1 rounded text-xs cursor-not-allowed" title="Cannot mark cancelled order as paid">Mark Paid</button>
                    ) : (
                      <button onClick={() => handleMarkAsPaid(order._id)} className="text-red-500 hover:text-red-700 font-semibold border border-red-500 px-2 py-1 rounded text-xs hover:bg-red-50">Mark Paid</button>
                    )}
                  </td>
                  <td className="p-4">
                    {order.isDelivered ? (
                      <span className="text-green-500 font-semibold">✓ Delivered</span>
                    ) : order.isCancelled ? (
                      <button disabled className="text-gray-400 font-semibold border border-gray-300 px-2 py-1 rounded text-xs cursor-not-allowed" title="Cannot mark cancelled order as delivered">Mark Delivered</button>
                    ) : !order.isPaid ? (
                      <button disabled className="text-gray-400 font-semibold border border-gray-300 px-2 py-1 rounded text-xs cursor-not-allowed" title="Order must be paid first">Mark Delivered</button>
                    ) : (
                      <button onClick={() => handleMarkAsDelivered(order._id)} className="text-orange-500 hover:text-orange-700 font-semibold border border-orange-500 px-2 py-1 rounded text-xs hover:bg-orange-50">Mark Delivered</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Modal (Add/Edit) */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowProductModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold">Product Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Price ($)</label>
                    <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600" />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Stock</label>
                    <input type="number" required value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Brand</label>
                    <input type="text" required value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600" />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Category</label>
                    <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600">
                      <option value="Electronics">Electronics</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Kitchen & Home">Kitchen & Home</option>
                      <option value="Fashion">Fashion</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600" rows={3} />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Image URL</label>
                  <input type="url" required placeholder="https://example.com/image.jpg" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600" />
                  {formData.imageUrl && (<img src={formData.imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />)}
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold">{editingProduct ? 'Update Product' : 'Create Product'}</button>
                  <button type="button" onClick={() => setShowProductModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded font-semibold">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900' : 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900'}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No users found.</p>
            </div>
          )}
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
          {contacts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded shadow text-center text-gray-500">
              <p>No contact messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map(contact => (
                <div key={contact._id} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                      <p className="font-semibold">{contact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="font-semibold text-blue-500 hover:underline cursor-pointer" onClick={() => window.location.href = `mailto:${contact.email}`}>{contact.email}</p>
                    </div>
                  </div>
                  {contact.subject && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Subject</p>
                      <p className="font-semibold">{contact.subject}</p>
                    </div>
                  )}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Message</p>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(contact.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Alert Modal */}
      <Modal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        showActions={typeof alertModal.showActions === 'boolean' ? alertModal.showActions : true}
      />
    </div>
  );
}

export default AdminDashboard;