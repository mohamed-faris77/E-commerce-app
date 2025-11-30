import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Heart, Globe, Users } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Famazon</h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Famazon started with a simple idea: make shopping easy, delightful and dependable. We build
            thoughtful shopping experiences for customers and powerful tools for sellers.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Truck size={20} />
            </div>
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">We work with trusted carriers to deliver quickly and safely.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Heart size={20} />
            </div>
            <h3 className="font-semibold text-lg">Customer Obsessed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">We listen to customers and iterate quickly to improve every experience.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Globe size={20} />
            </div>
            <h3 className="font-semibold text-lg">Global Selection</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Millions of products from sellers around the world — all in one place.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our mission</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">Our mission is to be the Earth's most customer-centric company where customers can find and discover anything they might want to buy online. We aim to offer our customers the lowest possible prices, the best available selection, and the utmost convenience.</p>
        </section>
{/* 
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-xl font-bold">JD</div>
                <h4 className="font-semibold">Faris</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product Lead</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Timeline</h2>
          <ol className="border-l border-gray-200 dark:border-gray-700">
            <li className="mb-6 ml-4">
              <div className="absolute w-3 h-3 mt-1.5 -left-1.5 rounded-full bg-yellow-400 border border-white dark:border-gray-900"></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">2015 — Famazon launches with 1000 products.</div>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute w-3 h-3 mt-1.5 -left-1.5 rounded-full bg-yellow-400 border border-white dark:border-gray-900"></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">2018 — Expanded into new categories and international shipping.</div>
            </li>
            <li className="mb-6 ml-4">
              <div className="absolute w-3 h-3 mt-1.5 -left-1.5 rounded-full bg-yellow-400 border border-white dark:border-gray-900"></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">2023 — Reached 1M happy customers.</div>
            </li>
          </ol>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><Users size={18} /></div>
            <div>
              <h3 className="font-semibold text-xl">Join our mission</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">We're hiring across product, engineering and support — see our careers page to learn more.</p>
            </div>
          </div>
          <button onClick={() => navigate('/careers')} className="inline-block bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">View Careers</button>
        </section>
      </div>
    </div>
  );
};

export default About;
