import React, { useState } from 'react';
import axios from 'axios';
import '../CssComponent/Login.css';
import { useDispatch } from "react-redux";
import SingleorChallangeChoose from '../SingleorChallangeChoose.jsx';
import { useNavigate } from "react-router-dom";
import { setUser } from "../Store/userSlice.jsx";
import { useSelector } from "react-redux";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    
    const dispatch=useDispatch();
    const uscername=useSelector((state)=>state.user.userId);
    const user=useSelector((state)=>state.user.userId);

    const handleLogin = async () => { 
        try {
            console.log("Logging in with:", username, password);
            
            const res = await axios.post('http://localhost:8000/user/login', { 
                username, 
                password 
            });
            
            const datas=res.data.user
            console.log("Response:", res.data.user);
            dispatch(setUser({userId:datas._id,username:datas.username}))
            
            console.log("user fff",datas._id);
            history("/SingleorChallangeChoose");
            alert("Login Successful!");
            
            
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Invalid credentials!");
        }
    };

    return (
        <div className='Logindiv'>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
