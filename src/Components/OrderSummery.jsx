// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { useParams ,Link} from "react-router-dom";

// const OrderSummary = () => {
//   const [product, setProduct] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [orderId, setOrderId] = useState(null);
//   const [orderStatusMessage, setOrderStatusMessage] = useState("");

//   const { id } = useParams();
//   const [sellerName, setSellerName] = useState("");
//   const [sellerEmail, setSellerEmail] = useState("");
  


// useEffect(() => {
//   Axios.get(`http://localhost:9000/api/product/single/${id}`)
//     .then((response) => {
//       const productData = response.data;

  
     

//       setProduct(productData);
 
//     })
//     .catch((error) => console.error("Error fetching product:", error));
// }, [id]);



//   const handleOrder = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("Seller"))._id;
//       const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
  
//       const orderData = {
//         product_id: id,
//         user_id: userId,
//         status: "pending",
//         shippingAddress: shippingAddress,
//         remarks: remarks,
//       };
     

//       const response = await Axios.post(`http://localhost:9000/api/orders/${sellerId}`, orderData);
  
//       const orderId = response.data.data._id;

//        localStorage.setItem("order", orderId);
//       console.log("Order ID:", orderId);
      
    
//       await Axios.put(`http://localhost:9000/api/orders/${orderId}`, {
//         status: 'processing',
//       });

//       setOrderStatusMessage("Waiting for order acceptance...");
//       console.log("Order request response:", response.data);
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };
  
//   const isOrderPlaced = orderStatusMessage === "Waiting for order acceptance...";

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-md">
//       <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//  {orderStatusMessage && (
//         <div className="mb-4 text-green-500">
//           <p>{orderStatusMessage}</p>
//         </div>
//       )}
//             {isOrderPlaced && (
//         <div>
//           <p>Order Placed!</p>
//           {/* Display seller's name and email from localStorage */}
//           <p>Seller Name: {JSON.parse(localStorage.getItem("Seller")).name}</p>
//           <p>Seller Email: {JSON.parse(localStorage.getItem("Seller")).email}</p>
//         </div>
//       )}

//       {product ? (
//         <div className="flex items-center justify-between border-b border-gray-300 py-2">
//           <span><img
//       src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
//       alt="Product"
//       className="w-full mb-1"
//     /></span>
//           <span className="text-lg font-semibold">Name: {product.name}</span>
//           {/* <span className="text-gray-700">${product.price}</span> */}
//         </div>
//       ) : (
//         <p>No order details available.</p>
//       )}

//       {/* Total */}
//       {product && (
//         <div className="flex items-center justify-between mt-4">
//           <span className="text-lg font-semibold">Total</span>
//           <span className="text-lg font-semibold">Rs:{product.price}</span>
//         </div>
//       )}

//       {/* Shipping Address */}
//       <div className="mb-4">
//         <label
//           htmlFor="shippingAddress"
//           className="block text-sm font-medium text-gray-600"
//         >
//           Shipping Address:
//         </label>
//         <input
//           type="text"
//           id="shippingAddress"
//           name="shippingAddress"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//       </div>

//       {/* Remarks */}
//       <div className="mb-4">
//         <label
//           htmlFor="remarks"
//           className="block text-sm font-medium text-gray-600"
//         >
//           Remarks:
//         </label>
//         <textarea
//           id="remarks"
//           name="remarks"
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//           rows="3"
//           className="mt-1 p-2 w-full border rounded-md"
//         ></textarea>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6">
//         <button
//           onClick={handleOrder}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//         >
//         Confirm Order
//         </button>
//         <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md me-2">
//           Continue Shopping
//         </button>
        
//         {/* <Link to="/orders/:id">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"  >
//          Next
//         </button>
//         </Link> */}
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";

const OrderSummary = () => {
  const [product, setProduct] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [orderStatusMessage, setOrderStatusMessage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [count, setCount] = useState(0);

  const { id } = useParams();

  // Load order information from local storage on component mount
  useEffect(() => {
    const storedOrderId = localStorage.getItem("order");
    if (storedOrderId) {
      setOrderId(storedOrderId);
  
      // Fetch order details and seller information
      Axios.get(`http://localhost:9000/api/orders/${storedOrderId}`)
        .then((response) => {
          console.log("API Response:", response); // Log the entire API response
  
          const orderData = response.data; // Adjust this line based on the actual structure
  
          if (orderData) {
            if (orderData.status === 'processing') {
              setOrderStatusMessage('Waiting for order acceptance...');
            } else if (orderData.status === 'completed') {
              if (orderData.seller && orderData.seller.name && orderData.seller.email) {
                setSellerName(orderData.seller.name);
                setSellerEmail(orderData.seller.email);
              } else {
                console.error("Error fetching seller information: Seller data is missing or incomplete");
                // Optionally set a default or handle the error as needed
              }
             
              setOrderStatusMessage('Order completed!'); // Set your success message
            } else if (orderData.status === 'rejected') {
              setOrderStatusMessage('Order rejected.'); // Set your rejection message
            } else {
              // Handle other statuses if needed
              setOrderStatusMessage('');
            }
          } else {
            // Handle the case where orderData is undefined or null
            console.error("Error fetching order information: Order data is missing");
            // Optionally set a default or handle the error as needed
          }
        })
        .catch((error) => {
          console.error("Error fetching order information:", error);
          // Handle the error, e.g., setOrderStatusMessage("Error fetching order information");
        });
    }
  }, [count]); // Add count to the dependency array
  
  
  


  
  // Fetch product details on component mount
  useEffect(() => {
    Axios.get(`http://localhost:9000/api/product/single/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
      })
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

  const isOrderPlaced = orderStatusMessage === "Waiting for order acceptance";
  const [data, setData] = useState([]);

  useEffect(() => {
    const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
 
    Axios.get(`http://localhost:9000/api/register/singleview/${sellerId}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      {orderStatusMessage && (
        <div className="mb-4 text-green-500">
          <p>{orderStatusMessage}</p>
        </div>
      )}
      {isOrderPlaced && (
        <div>
          <p>Order Placed!</p>
          {/* Display seller's name and email from state */}
          <p>Seller Name: {sellerName}</p>
          <p>Seller Email: {sellerEmail}</p>
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

      {/* ... rest of your JSX ... */}

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

