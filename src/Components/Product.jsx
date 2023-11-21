

import React, { useState, useEffect } from "react";
import Axios from "axios";
import {  useNavigate } from 'react-router-dom';
import { Link ,useParams} from "react-router-dom";
import { FaRegEnvelope, FaBell, FaSearch, FaShoppingCart } from "react-icons/fa";
import {
  IoPhonePortraitOutline,
  IoLaptopOutline,
  IoTvOutline,
  IoCarOutline,
} from "react-icons/io5";

// Card component for navbar
const NavbarCard = ({ title, to }) => (
  <Link to={to} className="text-xl font-bold pr-4">
    {title}
  </Link>
);

const CategoryIcon = ({ categoryName }) => {
  switch (categoryName) {
    case "mobile":
      return <IoPhonePortraitOutline className="mr-2" />;
    case "laptop":
      return <IoLaptopOutline className="mr-2" />;
    case "electronics":
      return <IoTvOutline className="mr-2" />;
    case "vehicles":
      return <IoCarOutline className="mr-2" />;
    default:
      return null;
  }
};

const Product = () => {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState("");

  const nav = useNavigate();
  const [count, setCount] = useState(0); 

  
  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      nav("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("Token")));
    
     
    }
  }, []);
  
  const addToCart = async (productId) => {
    try {
     
      const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
  
      const response = await Axios.post(
        "http://localhost:9000/api/cart/addtocart",
        {
          product_id: productId,
          seller_id: sellerId,
       
        },
        {
          headers: { Token: user }, 
        }
      );
  
      console.log("Seller ID from local storage:", sellerId);
      console.log("Product added to cart:", response.data);
  
      
      setCount(prevCount => prevCount + 1);
     
  
     
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const { product_id } = useParams();

  useEffect(() => {
    Axios.get("http://localhost:9000/api/product/view")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    Axios.get("http://localhost:9000/api/category/view")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.category_id === selectedCategory);

  const filteredCatProducts =
    searchInput === ""
      ? filteredProducts
      : filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  return (
    <>
      <div className="relative overflow-hidden bg-grey-100">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-5">
          <div className="relative mx-auto max-w-8x1 px-4 sm:static sm:px-6 lg:px-8">
            <div className="bg-white border-b border-gray-300 m-4 p-2 rounded-md">
              <nav className="p-4 text-center border rounded-md bg-gray-100">
                <div className="flex items-center ml-auto">
                  <input
                    type="text"
                    placeholder="Search…"
                    className="px-2 py-1 border rounded-md mr-2"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />

                  <div className="flex items-center">
                    <div className="mx-2 relative">
                      <FaSearch />
                    </div>
                    <div className="mx-2 relative"></div>
                    <div className="mx-2">
                      <h1
                        className=" text-center"
                        style={{ marginLeft: "350px", fontSize: "23px" }}
                      >
                        {/* <b>All products</b> */}
                      </h1>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div className="container mx-auto my-4 flex gap-4">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 bg-gray-100 rounded-md m-4 border-l border-t">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Categories
                </h2>
                <ul className="divide-y divide-gray-300">
                  <li
                    className="flex items-center py-2 cursor-pointer hover:bg-gray-100 text-center"
                    onClick={() => handleCategoryClick("")}
                  >
                    <CategoryIcon className="mr-2" />
                    All Categories
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className="flex items-center py-2 cursor-pointer hover:bg-gray-200 text-center"
                      onClick={() => handleCategoryClick(category._id)}
                    >
                      <CategoryIcon categoryName={category.name} />
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                {filteredCatProducts.map((product) => (
                  <div key={product._id} className="p-10 border rounded-md transition-colors hover:border-gray-700">
                    <Link to={`/product/${product._id}`}>
                      {product.productImage && product.productImage.length > 0 && (
                        <img
                          src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
                          alt="Product"
                          className="w-full mb-2"
                        />
                      )}
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-gray-600">Rs: {product.price}</p>
                      <p>Product ID: {product_id}</p>
                    </Link>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
