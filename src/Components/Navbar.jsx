import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Pr from "./Product";
import T from "./Banner";
import H from "./Categories";
import Axios from "axios";
import { data } from "autoprefixer";
import { Link, useNavigate } from "react-router-dom";

const navigation = {
  categories: [],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ... (your existing imports)

// ... (your existing imports)

export default function Example() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const [user, setUser] = useState("");
  const nav = useNavigate();
  const navigate = useNavigate();

  // After successful login
  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("Token")));
    }
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem("Token");
    setLoggedIn(!!authToken);

    if (loggedIn) {
      // Fetch details for each product in the cart
      const fetchProductDetails = async (productId) => {
        try {
          const response = await Axios.get(
            `http://localhost:9000/api/product/single/${productId}`
          );
          return response.data; // Assuming your API response contains the product details
        } catch (error) {
          console.error(
            `Error fetching product data for product ID ${productId}:`,
            error
          );
          return null;
        }
      };

      // Fetch the seller's ID from local storage
      const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;


      // Fetch cart data using Axios
      Axios.get(`http://localhost:9000/api/cart/viewSingle/${sellerId}`, {
        headers: {
          Token: authToken,
        },
      })
        .then(async (response) => {
          // Fetch details for each product in the cart
          const cartWithDetails = await Promise.all(
            response.data.map(async (cartItem) => {
              if (
                cartItem.product_id &&
                typeof cartItem.product_id === "string"
              ) {
                // Check if product_id is defined and is a string
                const productDetails = await fetchProductDetails(
                  cartItem.product_id
                );
                if (productDetails) {
                  return { ...cartItem, productDetails };
                } else {
                  console.error(
                    `Product details are not available for product ID ${cartItem.product_id}`
                  );
                  return null;
                }
              } else {
                console.error("Invalid product ID for cart item:", cartItem);
                return null;
              }
            })
          );
          
   

          const validCartItems = cartWithDetails.filter(
            (item) => item !== null
          );

          setCart(validCartItems);
          setCount((prevCount) => prevCount + 1); // Increment count to trigger a re-render
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [loggedIn]);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Seller");
    setLoggedIn(false);
    nav("/login");
  };
  const deleteCartItem = async (cartItemId) => {
    try {
      
      const response = await Axios.delete(
        `http://localhost:9000/api/cart/removecart/${cartItemId}`
      );

      if (response.status === 200) {
        
        console.log(`Cart item with ID ${cartItemId} deleted successfully`);
    
      } else {
        console.error(`Failed to delete cart item with ID ${cartItemId}`);
      }
    } catch (error) {
      console.error(`Error deleting cart item with ID ${cartItemId}:`, error);
    }
  };

  const [pendingSellers, setPendingSellers] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState("unknown"); // Default status

  useEffect(() => {
    const fetchPendingSellers = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:9000/api/register/admin/approve-seller"
        );
        setPendingSellers(response.data);
      } catch (error) {
        console.error("Error fetching seller requests", error);
      }
    };

    fetchPendingSellers();
  }, []);


  const sellerData = JSON.parse(localStorage.getItem("Seller"));
  if (!sellerData || !sellerData._id) {
    console.error("Invalid or missing seller data in localStorage");
    // Handle the error or set a default sellerId
    return;
  }
  
  const sellerId = sellerData._id;
  

  useEffect(() => {
    const fetchApprovalStatus = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:9000/api/register/view-status/${sellerId}`
        );
        setApprovalStatus(response.data.approvalStatus);
      } catch (error) {
        console.error("Error fetching user status", error);
        setApprovalStatus("unknown");
      }
    };

    fetchApprovalStatus();
  }, [sellerId]);



  return (
    <>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 " onClose={closeMobileMenu}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  {/* Links */}
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none"
                    >
                      <div className="h-6 w-6" aria-hidden="true" />
                      <br />
                    </button>

                    {loggedIn ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          onClick={() => setOpen(!open)}
                          className="flex text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none"
                        >
                          <div className="h-6 w-6" aria-hidden="true" />
                          <br />
                        </button>
                        <div style={{ marginTop: "-26px" }}>
                          <div className="py-1">
                            <span className="ml-4">
                              <Link to="/manage-account" className=" ">
                                Manage Account
                              </Link>
                            </span>
                          </div>

                          <div className="py-2 ">
                            {approvalStatus === "approved" ? (
                              // Render seller page content here
                              <span className="ml-4">
                                <Link to="/seller" className=" ">
                                  Seller page
                                </Link>
                              </span>
                            ) : approvalStatus === "pending" ? (
                              // Render waiting for approval message

                              <span className="ml-4">Waiting for Approval</span>
                            ) : (
                              // Handle other status values as needed
                              <span className="ml-4">rejected</span>
                            )}
                          </div>

                          <div className="py-2">
                            <span
                              style={{
                                marginRight: "20px",
                                padding: "15px",
                                paddingTop: "0px",
                              }}
                            >
                              <button onClick={handleLogout} className=" ">
                                Logout
                                <div className="h-4 w-4 inline-block ml-1" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => nav("/login")} className=" ">
                        Login
                      </button>
                    )}
                    <div className="py-2 pl-5">
                      <span className="ml-4">
                        <Link to="/adminlogin" className=" ">
                          Admin Login
                        </Link>
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p>

          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:show"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:ml-8 lg:flex">
                    <a
                      href="#"
                      className="flex items-center text-gray-700 hover:text-gray-800"
                    >
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 fl  ex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium">
                        CAD
                      </span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>

                  {/* Cart */}
                  <Transition.Root show={cartModalOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="fixed inset-0 overflow-y-auto"
                      onClose={closeCartModal}
                      initialFocus={cancelButtonRef}
                    >
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* Modal Panel */}
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            {/* Close button */}
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={closeCartModal}
                              >
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Close</span>
                              </button>
                            </div>

                            {/* Modal Content */}
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Shopping Cart
                              </h3>
                              <div className="mt-2">
                                {/* Display cart items here */}
                                {cart.map((item) =>
                                  item && item.productDetails ? (
                                    <div
                                      key={item._id}
                                      className="flex justify-between items-center mt-4"
                                    >
                                      <div className="flex items-center">
                                        <img
                                          src={`http://localhost:9000/uploads/product/${item.productDetails.productImage[0]}`}
                                          alt="Product"
                                          className="h-8 w-8 object-cover rounded mr-2"
                                        />
                                        <span>{item.productDetails.name}</span>
                                      </div>
                                      <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() =>
                                          deleteCartItem(
                                            item.productDetails._id
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ) : null
                                )}
                              </div>
                            </div>
                          </div>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition.Root>

                  <div className="ml-4 flow-root lg:ml-6">
                    <a
                      href="#"
                      className="group -m-2 flex items-center p-2"
                      onClick={openCartModal}
                    >
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cart.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {<T />}
          <br />
        </header>

        {/* {<H />} */}
        <Pr></Pr>
      </div>
    </>
  );
}
