import React from 'react'
import ButtonComponnet from './ButtonComponnet.jsx'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const history = useNavigate();

    const HandleClickLogin = () => {
        history("/login");
    }
    const HandleClickRegister = () => {
        history("/register");
    }
  return (
    <div>
        <ButtonComponnet name="Login" onClick={HandleClickLogin}/>
        <ButtonComponnet name="Register" onClick={HandleClickRegister}/>
    </div>
  )
}

export default Home