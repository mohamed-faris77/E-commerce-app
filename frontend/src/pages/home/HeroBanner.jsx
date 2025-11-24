import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const offers = [
  {
    id: 1,
    title: "JBL T460BT Black Headphones",
    description: "Wireless on-ear headphones with extra bass, 11 hours playtime.",
    price: 125.0,
    oldPrice: 250.0,
    discount: "50% OFF",
    image: "https://i.pinimg.com/1200x/13/ac/f7/13acf7d59bf7c738caddf5a170ebfe35.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Puma AXIS TR BOOT WTR Black Men's Shoe",
    description: "Durable waterproof boots for all terrains.",
    price: 150.99,
    oldPrice: 200.0,
    discount: "25% OFF",
    image: "https://i.pinimg.com/1200x/01/96/c4/0196c44c36a90f9d2d391960250035a1.jpg",
    category: "Fashion",
  },
  {
    id: 3,
    title: "Nike Air Max Light Red Series",
    description: "Comfortable running shoes with air cushioning.",
    price: 86.0,
    oldPrice: 120.0,
    discount: "28% OFF",
    image: "https://i.pinimg.com/736x/3a/d5/25/3ad525b5473221b8f474f87ab07d7481.jpg",
    category: "Fashion",
  },
  {
    id: 4,
    title: "Adidas Fusion Storm Winter Jacket",
    description: "Warm and stylish winter jacket for cold weather.",
    price: 79.97,
    oldPrice: 100.0,
    discount: "20% OFF",
    image: "https://i.pinimg.com/1200x/f1/06/10/f10610acf7c8ae0bc733c1d4ff706188.jpg",
    category: "Fashion",
  },
];

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };

  const currentOffer = offers[currentIndex];

  // Get the category link
  const getCategoryLink = (category) => {
    switch (category) {
      case 'Electronics':
        return '/eletronics';
      case 'Fashion':
        return '/fashion';
      case 'Kitchen & Home':
        return '/homeandkitchen';
      case 'Mobile':
        return '/mobile';
      default:
        return '/';
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 rounded shadow overflow-hidden">
      {/* Carousel Container */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-3">SHOP COMPUTERS & ACCESSORIES</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
            Shop laptops, desktops, monitors, tablets, PC gaming, hard drives and storage, accessories and more.
          </p>
          <Link
            to="/eletronics"
            className="inline-block border border-black dark:border-white px-5 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            View more
          </Link>
        </div>

        {/* Product Offer Carousel */}
        <div className="flex-1 relative">
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <Link to={getCategoryLink(offer.category)} className="block w-full h-full relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded-full">
                    {offer.discount}
                  </div>
                  <div className="absolute bottom-0 left-0 bg-white bg-opacity-90 p-4 max-w-xs rounded shadow">
                    <h3 className="font-semibold text-lg mb-1">{offer.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{offer.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="line-through text-gray-400">${offer.oldPrice.toFixed(2)}</span>
                      <span className="font-bold text-xl">${offer.price.toFixed(2)}</span>
                    </div>
                    <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 text-sm transition-colors">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous offer"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next offer"
          >
            ›
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
