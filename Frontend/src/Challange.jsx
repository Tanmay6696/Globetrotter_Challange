import React,{useState} from 'react'
import ButtonComponent from './ButtonComponnet.jsx';
import { useSelector } from "react-redux";
import './Challange.css';
import axios from 'axios';
const Challange = () => {
  const [opponenetUsername, setOpponenetUsername] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sharablelink,setsharablelink]=useState("");
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };
  const user=useSelector((state)=>state.user.username.username);
  const Handlesubmit=async()=>{
      console.log(user);
      
      
      if(opponenetUsername===""|| user===""){
        alert("Please enter the opponentUsername");
        return;
      }
      
      const challangeid=await axios.post('http://localhost:8000/challange/createchallnage', {
        "challengerUsername":user,
        "opponentUsername":opponenetUsername
      })
      
      setsharablelink(challangeid.data.invitelink)
      alert("Challange started");
      showPopup();
      
  }
  return (
    
    <div>
      
      <input placeholder="Enter the opponentUsername" onChange={(e)=>setOpponenetUsername(e.target.value) } required/>
      <ButtonComponent name="Submit" onClick={Handlesubmit}/>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-button" onClick={hidePopup}>&times;</span>
            <h1>Dyanmic link</h1>
            <p>{sharablelink}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Challange