import React from 'react';
import { Link } from 'react-router-dom';

function DeliveryBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 bg-yellow-50 dark:bg-yellow-900 rounded flex flex-col md:flex-row items-center justify-between p-6">
      <div className="md:max-w-lg">
        <h2 className="text-3xl font-bold mb-2">FAMAZON DELIVERS TO YOU</h2>
        <p>Worldwide shipping. We ship to over 100 countries and regions, right to your doorstep.</p>
        <Link to="/customer" className="mt-4 border border-black dark:border-white rounded px-4 py-2 hover:bg-yellow-300 dark:hover:bg-yellow-700 inline-block">
          View more
        </Link>
      </div>
      <img
        src="https://i.pinimg.com/1200x/49/ef/df/49efdf7c8b165d5e653e9147e0543cdd.jpg"
        alt="Dog in box"
        className="w-40 rounded mt-6 md:mt-0"
      />
    </section>
  );
}

export default DeliveryBanner;
