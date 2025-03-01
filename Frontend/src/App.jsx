import { useState ,useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Login from './Component/Login.jsx';
import Register from './Component/Register.jsx';
import SinglePlayerGame from './Component/SinglePlayerGame.jsx';
import Home from './Home.jsx';
import SingleorChallangeChoose from './SingleorChallangeChoose.jsx';
import Challange from './Challange.jsx';
import ChallengeDetails from './ChallangeDetails.jsx';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  const userId=useSelector((state)=>state.user.userId);

  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<SinglePlayerGame />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/SingleorChallangeChoose" element={<SingleorChallangeChoose />}/>
        <Route path="/challange" element={<Challange />}/>
        <Route path="/challange/:challengeId" element={<ChallengeDetails />}/>
      </Routes>      
    </>
  )
}

export default App
