import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Register from "./Register";
import Text from './Navbar'
// import Test from './Admin/Test'
import Main from './Admin/Main';
import  Edit  from "./Admin/Edit";
// import SellerForm from "./SellerForm";
// import SingleProductView from "./SingleProductView";
// import Dashboard from './Admin/Dashboard';
// import Users from './Admin/User';
// import Products from './Admin/Product';
// import Orders from './Admin/Order';


export default function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
         
          
          <Route
            path="/admin"
            element={<Main/>}





          />
          <Route path='/' element={<Text />} />
          {/* <Route path='/ad' element={<Test/>} /> */}
          {/* <Route path='/admin/edit' element={<Edit/>} /> */}
          {/* <Route path='/admin/dasboard' element={<Dashboard/>} />
          <Route path='/admin/user' element={<Users/>} />
          <Route path='/admin/product' element={<Products/>} /> */}
          {/* <Route path='/seller' element={<SellerForm />} /> */}
         
        {/* <Route path="/product/:id" element={<SingleProductView/>} /> */}

        </Routes>
      </Router>
    </div>
  );
}
