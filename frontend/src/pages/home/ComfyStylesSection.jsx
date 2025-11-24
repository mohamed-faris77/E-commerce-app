import React from 'react';
import { Link } from 'react-router-dom';

const comfyStyles = [
  { title: "Comfy styles for her", description: "Shop Famazon Fashion including clothing, shoes, jewelry, watches, bags and more.", img: "https://i.pinimg.com/736x/38/c4/42/38c442d2c1baad23d9c1d6c1699737d7.jpg", tag: "Top Handbags", discount: "Big Sale 30%" },
  { title: "Comfy styles for him", description: "Shop Famazon Fashion including clothing, shoes, jewelry, watches, bags and more.`", img: "https://i.pinimg.com/736x/68/65/0a/68650ad7ccb0e8179b3aeadaf019f390.jpg", tag: "Checkered shirt", discount: "Big Sale 30%" },
];

function ComfyStylesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {comfyStyles.map(({ title, description, img, tag, discount }, idx) => (
        <Link key={idx} to="/fashion" className="bg-white dark:bg-gray-800 rounded shadow p-4 flex gap-4 items-center cursor-pointer hover:shadow-lg block">
          <img src={img} alt={title} className="w-32 h-32 object-cover rounded" />
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{description}</p>
            <p className="font-semibold">{tag}</p>
            <p className="text-yellow-500 text-sm font-bold">{discount}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default ComfyStylesSection;
