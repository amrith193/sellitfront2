
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Pr from './Product'
import T from './Banner'
import H from './Categories'

const navigation = {
  categories: [
    // ... (unchanged)
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                        Create account
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium text-gray-900">CAD</span>
                      <span className="sr-only">, change currency</span>
                    </a>
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

          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </a>
                  </div>

                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium">CAD</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
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
  )
}


// import React, { useState, useEffect ,Fragment} from 'react';
// import Axios from 'axios';
// import { Dialog, Transition } from '@headlessui/react';

// import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link } from 'react-router-dom';
// import T from './Banner'
// import H from './Categories'

// // ... (previous imports)

// // ... (previous imports)

// const SearchModal = ({ isOpen, onClose, onSearch }) => {
//   const [searchInput, setSearchInput] = useState('');
//   const [products, setProducts] = useState([]);
//   const closeButtonRef = useRef(null);
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     Axios.get('http://localhost:9000/api/product/view')
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   const filteredProducts =
//     searchInput === ''
//       ? products
//       : products.filter((product) =>
//           product.name.toLowerCase().includes(searchInput.toLowerCase())
//         );

//   useEffect(() => {
//     if (isOpen) {
//       // Set focus to the search input when the modal opens
//       searchInputRef.current.focus();
//     }
//   }, [isOpen]);

//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
//         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
//           </Transition.Child>

//           <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//             &#8203;
//           </span>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
//               <div className="sm:flex sm:items-start">
//                 <button
//                   ref={closeButtonRef}
//                   onClick={onClose}
//                   type="button"
//                   className="absolute top-0 right-0 pt-4 pr-4"
//                 >
//                   <XMarkIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
//                 </button>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">Search Products</h3>
//                   <div className="mt-2">
//                     <div className="flex items-center">
//                       <input
//                         ref={searchInputRef}
//                         type="text"
//                         placeholder="Search products"
//                         className="border-2 border-gray-300 p-2 flex-grow"
//                         value={searchInput}
//                         onChange={(e) => setSearchInput(e.target.value)}
//                         autoFocus // Ensure autofocus
//                       />
//                       <button
//                         onClick={() => onSearch(filteredProducts)}
//                         className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                       >
//                         Search
//                       </button>
//                     </div>
//                     {filteredProducts.length > 0 && (
//                       <div className="mt-2">
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">Search Results</h3>
//                         <ul>
//                           {filteredProducts.map((product) => (
//                             <li key={product.id} className="mb-2">
//                               {product.name}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// // ... (rest of the code)

// // ... (rest of the code)


// export default function Example() {
//   const [open, setOpen] = useState(false);

//   const handleSearch = (results) => {
//     // Handle search results
//     console.log('Search Results:', results);
//   };

//   const navigation = {
//     categories: [
//       // ... (unchanged)
//     ],
//     pages: [
//       { name: 'Company', href: '#' },
//       { name: 'Stores', href: '#' },
//     ],
//   }
//   return (
//     <>
//       <div className="bg-white">
//         Mobile menu
     

//         <header className="relative bg-white">
//           <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
//             Get free delivery on orders over $100
//           </p>

//           <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="border-b border-gray-200">
//               <div className="flex h-16 items-center">
//                 <button
//                   type="button"
//                   className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
//                   onClick={() => setOpen(true)}
//                 >
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open menu</span>
//                   <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//                 </button>

//                 <div className="ml-4 flex lg:ml-0">
//                   <a href="#">
//                     <span className="sr-only">Your Company</span>
//                     <img
//                       className="h-8 w-auto"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                       alt=""
//                     />
//                   </a>
//                 </div>

//                 <div className="ml-auto flex items-center">
//                   <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                     <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
//                       Sign in
//                     </a>
//                     <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
//                     <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
//                       Create account
//                     </a>
//                   </div>

//                   <div className="hidden lg:ml-8 lg:flex">
//                     <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
//                       <img
//                         src="https://tailwindui.com/img/flags/flag-canada.svg"
//                         alt=""
//                         className="block h-auto w-5 flex-shrink-0"
//                       />
//                       <span className="ml-3 block text-sm font-medium">CAD</span>
//                       <span className="sr-only">, change currency</span>
//                     </a>
//                   </div>

//                   <div className="flex lg:ml-6">
//                     <button onClick={() => setOpen(true)}>
//                       <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
//                     </button>
//                   </div>

//                   {/* Cart */}
//                   <div className="ml-4 flow-root lg:ml-6">
//                     <a href="#" className="group -m-2 flex items-center p-2">
//                       <ShoppingBagIcon
//                         className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                         aria-hidden="true"
//                       />
//                       <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
//                       <span className="sr-only">items in cart, view bag</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           <T />
//           <br />
//         </header>

//         <H />
//       </div>
//     </>
//   );
// }