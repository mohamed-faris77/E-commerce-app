import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 px-4 py-10 mt-12 max-w-7xl mx-auto rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Get to Know Us</h4>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Famazon Devices</li>
            <li>Famazon Tours</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Make Money with Us</h4>
          <ul>
            <li>Sell products on Famazon</li>
            <li>Sell apps on Famazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Famazon Hub</li>
            <li>See More Make Money with Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Let Us Help You</h4>
          <ul>
            <li>Famazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Amazon Assistant</li>
            <li>Help</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Amazon Payment Products</h4>
          <ul>
            <li>Famazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Famazon Currency Converter</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs mt-6">© 2023 famazon, Inc. or its affiliates</p>
    </footer>
  );
}

export default Footer;
