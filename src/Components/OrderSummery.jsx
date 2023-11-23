

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, Link, Await } from "react-router-dom";

const OrderSummary = () => {
  const [product, setProduct] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [orderStatusMessage, setOrderStatusMessage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [count, setCount] = useState(0);
  const [seller, setSeller] = useState(null);
const [info,setinfo]=useState("")
  const { id } = useParams();

  // Load order information from local storage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedOrderId = localStorage.getItem("order");
        if (storedOrderId) {
          setOrderId(storedOrderId);
  
          // Fetch order details
          const orderResponse = await Axios.get(`http://localhost:9000/api/orders/${storedOrderId}`);
          const orderData = orderResponse.data;
  
          console.log("API Response:", orderResponse);
  
          if (orderData) {
            const pid = orderData.product_id;
            console.log("Product ID:", pid);
  
            // Fetch product details
            const productResponse = await Axios.get(`http://localhost:9000/api/product/single/${pid}`);
            const prodData = productResponse.data;
            setinfo(prodData);
            console.log("Product Info:", prodData);

            const sellerId = prodData.seller_id;

            // const sellerResponse = await Axios.get(`http://localhost:9000/api/register/singleview/${sellerId}`);
            // const sellerData = sellerResponse.data;
            // setSeller(sellerData);
            // console.log("seller",sellerData);
  
            if (orderData.status === 'processing') {
              setOrderStatusMessage('Waiting for order acceptance...');
              console.log("Status:", orderData.status);
            } else if (orderData.status === 'completed') {
              const sellerResponse = await Axios.get(`http://localhost:9000/api/register/singleview/${sellerId}`);
              const sellerData = sellerResponse.data;
              setSeller(sellerData);
              console.log("seller",sellerData);
              setOrderStatusMessage('Order completed!');
            } else if (orderData.status === 'rejected') {
              setOrderStatusMessage('Order rejected.');
            } else {
              setOrderStatusMessage('');
            }
          } else {
            console.error("Error fetching order information: Order data is missing");
          }
        }
      } catch (error) {
        console.error("Error fetching order information:", error);
        // Handle the error, e.g., setOrderStatusMessage("Error fetching order information");
      }
    };
  
    fetchData();
  }, [count]);
  
  
  
  


  
  // Fetch product details on component mount
  useEffect(() => {
    const fetchProductAndSeller = async () => {
      try {
        // Fetch product details
        const response = await Axios.get(`http://localhost:9000/api/product/single/${id}`);
        const productData = response.data;
        setProduct(productData);

        // Extract seller ID from product data
        // const sellerId = productData.seller_id; // Replace with the actual key used in your product data

        // // Fetch seller details using the seller ID
        // const sellerResponse = await Axios.get(`http://localhost:9000/api/register/singleview/${sellerId}`);
        // const sellerData = sellerResponse.data;
        // setSeller(sellerData);
        // console.log("seller",sellerData);

     
       
      } catch (error) {
        console.error("Error fetching product, seller, or order status:", error);
      }
    };

    fetchProductAndSeller();
  }, [id]);


  const handleOrder = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("Seller"))._id;
      const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;

      const orderData = {
        product_id: id,
        user_id: userId,
        status: "pending",
        shippingAddress: shippingAddress,
        remarks: remarks,
      };

      const response = await Axios.post(`http://localhost:9000/api/orders/${sellerId}`, orderData);

      const newOrderId = response.data.data._id;
      localStorage.setItem("order", newOrderId);
      setOrderId(newOrderId);

      await Axios.put(`http://localhost:9000/api/orders/${newOrderId}`, {
        status: 'processing',
      });

      setOrderStatusMessage("Waiting for order acceptance...");
      console.log("Order request response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  
  

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      {orderStatusMessage && (
        <div className="mb-4 text-green-500">
          <p>{orderStatusMessage}</p>
        </div>
      )}

     
      {product ? (
        <div className="flex items-center justify-between border-b border-gray-300 py-2">
          <span><img
      src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
      alt="Product"
      className="w-full mb-1"
    /></span>
          <span className="text-lg font-semibold">Name: {product.name}</span>
      
          {/* <span className="text-gray-700">${product.price}</span> */}
        </div>
      ) : (
        <p>No order details available.</p>
      )}
      

      {/* Total */}
      {product && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">Rs:{product.price}</span>
        </div>
      )}
          {seller && (
        <div>
          <h2>Seller Details</h2>
          <p>Name: {seller.name}</p>
          <p>Email: {seller.email}</p>
          <p>phone: {seller.phone}</p>
          {/* Add other seller details as needed */}
        </div>
      )}
            {/* Shipping Address */}
  {/* Shipping Address */}
{!orderStatusMessage && (
  <div className="mb-4">
    <label
      htmlFor="shippingAddress"
      className="block text-sm font-medium text-gray-600"
    >
      Shipping Address:
    </label>
    <input
      type="text"
      id="shippingAddress"
      name="shippingAddress"
      value={shippingAddress}
      onChange={(e) => setShippingAddress(e.target.value)}
      className="mt-1 p-2 w-full border rounded-md"
    />
  </div>
)}

{/* Remarks */}
{!orderStatusMessage && (
  <div className="mb-4">
    <label
      htmlFor="remarks"
      className="block text-sm font-medium text-gray-600"
    >
      Remarks:
    </label>
    <textarea
      id="remarks"
      name="remarks"
      value={remarks}
      onChange={(e) => setRemarks(e.target.value)}
      rows="3"
      className="mt-1 p-2 w-full border rounded-md"
    ></textarea>
  </div>
)}

{/* Confirm Order Button */}

  <div className="mt-6">
    <button
      onClick={handleOrder}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
    >
      Confirm Order
    </button>
    {/* ... rest of your buttons ... */}
  </div>

    </div>
  );
};

export default OrderSummary;

