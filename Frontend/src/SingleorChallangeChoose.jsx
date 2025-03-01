import React ,{useEffect} from 'react'
import ButtonComponnet from './ButtonComponnet'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleorChallangeChoose = () => {
  
    const history = useNavigate();
    
    const HandleSingleplayerMatch = () => {
        // Add code here
        history("/game");
    }
    const HandleTheChallenge = () => {
        // Add code here
        history("/challange");
    }
  return (
    <div>
        <ButtonComponnet name="Single Player" onClick={HandleSingleplayerMatch}/>
        <ButtonComponnet name="Challange" onClick={HandleTheChallenge}/>
    </div>
  )
}

export default SingleorChallangeChoose