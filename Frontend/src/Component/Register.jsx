import React, { useState } from 'react';
import axios from 'axios';
import '../CssComponent/Login.css';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => { 
      try {
          console.log("Logging in with:", username, password);
          
          const res = await axios.post('http://localhost:8000/user/register', { 
              username, 
              password 
          });

          console.log("Response:", res.data);
          alert("Login Successful!");
          history("/login");
          // // Save token to localStorage (if your backend returns one)
          // if (res.data.token) {
          //     localStorage.setItem('authToken', res.data.token);
          //     alert("Login Successful!");
          //     // Redirect or refresh after login (if needed)
          //     window.location.href = "/dashboard"; // Change as needed
          // } else {
          //     alert("Login failed! No token received.");
          // }
          
      } catch (error) {
          console.error("Login error:", error);
          alert(error.response?.data?.message || "Invalid credentials!");
      }
  };
  return (
    <div>
      <div className='Logindiv'>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Register</button>
        </div>
    </div>
  )
}

export default Register