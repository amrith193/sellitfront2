import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import  Axios  from 'axios'

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate()
  
    const handleAdminLogin = async () => {
      try {
        const response = await Axios.post('http://localhost:9000/api/auth/admin-login', {
          email,
          password,
        });
  
        if (response.data.success) {
          // Admin login successful, navigate to the admin page
          nav('/admin');
        } else {
          // Handle login failure (display error message, etc.)
          console.error(response.data.error);
        }
      } catch (error) {
        console.error('Error during admin login:', error);
      }
    };
      
  return (
    <div>
             <div>
      <h1>Admin Login</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAdminLogin}>Login</button>
    </div>
    </div>
  )
}
