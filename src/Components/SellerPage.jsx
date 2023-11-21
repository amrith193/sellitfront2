// SellerPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SellerPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* View Products */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">View Products</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">Product 1</li>
            <li className="mb-2">Product 2</li>
            {/* Add more product items as needed */}
          </ul>
        </div>

        {/* Add Product (Link) */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <Link
            to="/add"
            className="block bg-blue-500 text-white px-4 py-2 rounded-md text-center transition duration-300 hover:bg-blue-600"
          >
            Add a new product
          </Link>
        </div>

        {/* Order Requests */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Requests</h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">Order Request 1</li>
            <li className="mb-2">Order Request 2</li>
            {/* Add more order request items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
