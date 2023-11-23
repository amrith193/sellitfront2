import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const SellerPage = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const [products, setProducts] = useState([]);
  const sellerId = JSON.parse(localStorage.getItem('Seller'));
  const sellId = JSON.parse(localStorage.getItem('Seller'))._id;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await Axios.get('http://localhost:9000/api/orders');
        setOrderRequests(ordersResponse.data);
  
        // Fetch products based on seller ID
        const productsUrl = `http://localhost:9000/api/product/view2?seller_id=${sellerId._id}`;
        console.log('Products URL:', productsUrl);
  
        const productsResponse = await Axios.get(productsUrl);
        console.log('Products Response:', productsResponse.data);
  
        setProducts(productsResponse.data);
  
        // Save order data to local storage after fetching from API
        localStorage.setItem('OrderRequests', JSON.stringify(ordersResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [sellerId._id]);

  const handleApprove = async (orderId) => {
    try {
      const response = await Axios.put(`http://localhost:9000/api/orders/${orderId}`, {
        status: 'completed',
      });

      if (response.status === 200) {
        setOrderRequests((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'completed' } : order
          )
        );

        console.log(`Order ${orderId} approved successfully`);
      } else {
        console.error(`Failed to approve order ${orderId}`);
      }
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  const handleReject = async (orderId) => {
    try {
      const response = await Axios.put(`http://localhost:9000/api/orders/${orderId}`, {
        status: 'cancelled',
      });

      if (response.status === 200) {
        setOrderRequests((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'cancelled' } : order
          )
        );

        console.log(`Order ${orderId} cancelled successfully`);
      } else {
        console.error(`Failed to reject order ${orderId}`);
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

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


        {/* Order Requests */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Requests</h2>
          <ul className="list-disc pl-4">
            {orderRequests
              ?.filter(
                (item) =>
                  item?.product_id?.seller_id === sellerId?._id &&
                  item.status !== 'completed' &&
                  item.status !== 'cancelled'
              )
              .map((order) => (
                <li key={order._id} className="mb-4 p-4 bg-gray-100 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      Order Request {order._id} - Status: {order.status}
                    </span>
                    <div className="space-x-4">
                      {/* Add Approve Button */}
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>

                      {/* Add Reject Button */}
                      <button
                        onClick={() => handleReject(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <Link
            to="/add"
            className="block bg-blue-500 text-white px-4 py-2 rounded-md text-center transition duration-300 hover:bg-blue-600"
          >
            Add a new product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
