import { Link } from 'react-router-dom';

const categories = [
  { name: "Beauty picks", img: "https://i.pinimg.com/1200x/18/0f/fd/180ffdfa2d2fe92663ed8e979db3deb1.jpg", link: "/fashion" },
  { name: "Fashions", img: "https://i.pinimg.com/1200x/58/c1/fc/58c1fc38f5b7ab7a8cc5bc38a96516bd.jpg", link: "/fashion" },
  { name: "Computer & Accessories", img: "https://i.pinimg.com/736x/18/da/dc/18dadc856ef63a913b4c35bc46aaacbc.jpg", link: "/eletronics" },
  { name: "Toys & Games", img: "https://i.pinimg.com/736x/e2/51/d1/e251d15da7012604555a82d204c6d978.jpg", link: "/homeandkitchen" },
];

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <h2 className="font-semibold text-xl mb-3">Shop by categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map(({ name, img, link }, i) => (
          <Link key={i} to={link} className="relative rounded overflow-hidden cursor-pointer group block">
            <img src={img} alt={name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 text-center text-sm font-semibold py-1">{name}</div>
          </Link>
        ))}
      </div>

      {/* Below category grid: Amazon Basics & Deals */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
          <h3 className="font-semibold mb-2">Famazon Basics</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">Shop Today's Deals, Lightning Deals, and limited-time discounts.</p>
          <button className="mt-3 text-sm font-semibold underline">See more</button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
          <h3 className="font-semibold mb-2">Deals & Promotions</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">Shop Today's Deals, Lightning Deals, and limited-time discounts.</p>
          <button className="mt-3 text-sm font-semibold underline">See more</button>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
