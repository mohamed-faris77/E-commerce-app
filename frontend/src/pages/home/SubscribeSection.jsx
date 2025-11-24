import React, { useState } from 'react';

function SubscribeSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    alert(`Subscribed with ${email}! (Demo)`);
    setEmail('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 my-12 bg-white dark:bg-gray-900 rounded shadow p-8 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-3">SUBSCRIBE TO THE NEWS</h2>
        <p className="mb-4">Be aware of all discounts and bargains. Don’t miss your benefits!</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded mr-2 w-full md:w-auto"
        />
        <button onClick={handleSubscribe} className="mt-2 md:mt-0 px-4 py-2 border rounded border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700">
          Subscribe
        </button>
      </div>
      <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" alt="Subscribe" className="w-48 rounded" />
    </section>
  );
}

export default SubscribeSection;
