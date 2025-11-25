import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      // Do not auto-login the user after registration. Redirect them to login.
      alert(data.message || `Account created for ${data.data?.name || name}! Please log in.`);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 pt-24">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Your Famazon Account</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label htmlFor="name" className="block mb-1 font-semibold">Your Name</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 mb-4 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />

        <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
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
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 mb-4 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />

        <label htmlFor="confirmPassword" className="block mb-1 font-semibold">Re-enter Password</label>
        <input
          type="password"
          id="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 mb-6 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />

        <button className="w-full bg-yellow-400 py-3 rounded font-semibold hover:bg-yellow-500 text-black mb-4">
          Create Your Famazon Account
        </button>

        <div className="text-center">
          <Link to="/login" className="text-sm text-blue-500 hover:underline">Already have an account? Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;