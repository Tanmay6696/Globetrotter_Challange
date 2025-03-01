import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:5173");
const ChallangePageforReciver = () => {
    const userId=useSelector((state)=>state.user.userId);

    
    
  return (
    <div>ChallangePageforReciver</div>
  )
}

export default ChallangePageforReciver