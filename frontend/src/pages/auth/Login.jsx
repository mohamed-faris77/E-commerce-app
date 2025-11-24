import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      alert(`Welcome back, ${data.data.name}!`);

      if (data.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 pt-24">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Famazon</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label htmlFor="email" className="block mb-1 font-semibold">Email or Mobile Phone Number</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 mb-4 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />

        <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 mb-6 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />

        <button className="w-full bg-yellow-400 py-3 rounded font-semibold hover:bg-yellow-500 text-black mb-4">
          Sign In
        </button>

        <div className="text-center">
          <Link to="/registe" className="text-sm text-blue-500 hover:underline">New to Famazon? Create an account</Link>
        </div>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">Forgot your password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;