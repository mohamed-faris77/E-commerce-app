import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomerService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'Log in to your account, go to "Your Orders," and click on the order to view tracking details.',
    },
    {
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days of delivery. Items must be in original condition. Visit our Returns page for more details.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click "Forgot Password." Follow the instructions to reset via email.',
    },
    {
      question: 'Can I change my shipping address?',
      answer: 'Yes, if the order hasn\'t shipped yet. Contact us via email or phone to update it.',
    },
  ];

  const helpCategories = [
    { title: 'Orders & Purchases', description: 'Track orders, manage purchases, and view history.', link: '/orders' },
    { title: 'Returns & Refunds', description: 'Learn about returns, exchanges, and refunds.', link: '/returns' },
    { title: 'Account & Login', description: 'Manage your account, password, and login issues.', link: '/account' },
    { title: 'Payment & Billing', description: 'Payment methods, billing questions, and disputes.', link: '/billing' },
    { title: 'Shipping & Delivery', description: 'Shipping options, delivery times, and tracking.', link: '/shipping' },
    { title: 'Product Support', description: 'Product info, warranties, and troubleshooting.', link: '/support' },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Customer Service</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />
      </div>

      {/* Help Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category, index) => (
            <Link key={index} to={category.link} className="block">
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full text-left font-semibold flex justify-between items-center"
              >
                {faq.question}
                <span>{expandedFaq === index ? '−' : '+'}</span>
              </button>
              {expandedFaq === index && (
                <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Call us at 1-800-FAMAZON (1-800-326-2966)</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Available 24/7</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300">support@famazon.com</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 dark:text-gray-300">Chat with our support team online.</p>
          <button className="mt-2 bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500">
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerService;