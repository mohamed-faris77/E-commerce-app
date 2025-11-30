import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from './HeroBanner';
import RecommendationsBar from './RecommendationsBar';
import CategorySection from './CategorySection';
import DeliveryBanner from './DeliveryBanner';
import ProductGridSection from './ProductGridSection';
import ComfyStylesSection from './ComfyStylesSection';
import SubscribeSection from './SubscribeSection';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Premium Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-800 to-pink-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Discover Premium Products
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Curated collections across fashion, tech, home, and more – all at your fingertips.
          </p>
          <Link
            to="/products"
            className="inline-block bg-yellow-400 text-black font-semibold py-3 px-8 rounded-lg hover:bg-yellow-500 transition"
          >
            Shop All
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <HeroBanner />
        <RecommendationsBar />
        <CategorySection />
        <DeliveryBanner />
        <ProductGridSection title="Featured Products" />
        <ComfyStylesSection />
        <SubscribeSection />
      </main>
    </div>
  );
}

export default Home;