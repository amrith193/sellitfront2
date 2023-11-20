import React, { useState, useEffect } from "react";
import axios from "axios";

const EditModal = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    brand: product.brand,
    price: product.price,
    stock: product.stock,
    condition: product.condition,
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
     
      await axios.put(
        `http://localhost:9000/api/product/edit/${product._id}`,
        editedProduct
      );
    
      onClose();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };



  

  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        onClose ? "" : "hidden"
      }`}
    >
  
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
     
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
     
        <form className="py-4 px-8">
          <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editedProduct.brand}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={editedProduct.stock}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              condition
            </label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={editedProduct.condition}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              onClick={handleEditSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const Products = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/product/view"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };
  const handleDelete = async (productId) => {
    try {
      
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (!confirmDelete) {
        return; 
      }
  
      await axios.delete(`http://localhost:9000/api/product/delete/${productId}`);
  
   
    
    } catch (error) {
      console.error('Error deleting item:', error.message, error.stack);
    }
  };
  
  return (
    <div className="container mx-auto mt-10">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">SL No</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Condition</th>
            <th className="py-2 px-4 border-b">Product Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.brand}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.stock}</td>
              <td className="py-2 px-4 border-b">{product.condition}</td>
              <td className="py-2 px-4 border-b">
              {product.productImage && product.productImage.length > 0 ? (
  <img
    src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
    alt="Product"
    className="rounded-full w-16 h-16 object-cover"
  />
) : (
  <p>No images available</p>
)}

              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-2 rounded-md"  onClick={() => handleDelete(product._id)} >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

       
        {isEditModalOpen && (
          <EditModal product={selectedProduct} onClose={closeEditModal} />
        )}
      </table>
    </div>
  );
};

export default Products;
