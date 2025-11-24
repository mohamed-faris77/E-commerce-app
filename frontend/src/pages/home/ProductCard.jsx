import React from 'react';

function ProductCard({ image, title, price, oldPrice, rating, badge }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-3 cursor-pointer hover:shadow-lg flex flex-col items-center">
      <img src={image} alt={title} className="h-28 object-contain mb-3" />
      <p className="text-sm font-semibold text-center line-clamp-2">{title}</p>
      <div className="flex items-center gap-2 mt-1">
        {oldPrice && <span className="line-through text-gray-500">${oldPrice.toFixed(2)}</span>}
        <span className="font-bold">${price.toFixed(2)}</span>
      </div>
      {rating && <p className="text-xs text-yellow-500 mt-1">⭐ {rating}</p>}
      {badge && <span className="bg-yellow-400 text-black px-1 rounded text-xs mt-1">{badge}</span>}
    </div>
  );
}

export default ProductCard;
