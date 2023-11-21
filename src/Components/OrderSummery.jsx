import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams ,Link} from "react-router-dom";

const OrderSummary = () => {
  const [product, setProduct] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [orderId, setOrderId] = useState(null);

  const { id } = useParams();



  useEffect(() => {
    Axios.get(`http://localhost:9000/api/product/single/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
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
  
      const orderId = response.data.data._id;

       localStorage.setItem("order", orderId);
      console.log("Order ID:", orderId);
      
    
      await Axios.put(`http://localhost:9000/api/orders/${orderId}`, {
        status: 'processing',
      });

  
      console.log("Order request response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  


  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

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

      {/* Shipping Address */}
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

      {/* Remarks */}
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

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
        Confirm Order
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md me-2">
          Continue Shopping
        </button>
        
        {/* <Link to="/orders/:id">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"  >
         Next
        </button>
        </Link> */}
      </div>
    </div>
  );
};

export default OrderSummary;
