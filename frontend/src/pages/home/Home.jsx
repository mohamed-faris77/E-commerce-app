// pages/Home.jsx
import { Link } from 'react-router-dom';
import React from 'react';
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
      <main className="pt-20 md:pt-24">
        <HeroBanner />
        <RecommendationsBar />
        <CategorySection />
        <DeliveryBanner />
        <ProductGridSection title="Recently Viewed" />
        <ComfyStylesSection />
        <SubscribeSection />
      </main>
    </div>
);
}


export default Home;