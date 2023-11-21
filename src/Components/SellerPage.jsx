import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const SellerPage = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const [products, setProducts] = useState([]);
  // const sellerId = localStorage.getItem('order')

  const sellerId = JSON.parse(localStorage.getItem('Seller'))

  useEffect(() => {
 
    Axios.get('http://localhost:9000/api/orders')
      .then((res) => {
        console.log(res.data);
        setOrderRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    
    Axios.get(`http://localhost:9000/api/product/view/`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
//   let filt=orderRequests
//   ?.filter((item)=>item?.product_id?.seller_id==sellerId._id)
// console.log(filt)
// console.log(sellerId._id)
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* View Products */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">View Products</h2>
          <ul className="list-disc pl-4">
            {products.map((product) => (
              <li key={product._id} className="mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{product.name}</span>
                  <span className="text-gray-700">${product.price}</span>
                </div>
              </li>
            ))}
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
            {orderRequests
            ?.filter((item)=>item?.product_id?.seller_id==sellerId?._id)
            .map((order) => (
              <li key={order._id} className="mb-2">
                Order Request {order._id} - Status: {order.status}
              </li>
            ))}
          </ul>
  
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
