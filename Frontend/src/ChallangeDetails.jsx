import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ChallengeDetails = () => {
  const { challengeId } = useParams(); // Get challengeId from URL
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch challenge details
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        console.log("challengeId",challengeId);
        alert("Challenge found");
        const response = await axios.get(`http://localhost:8000/challange/${challengeId}`);
        console.log("response",response);
        
        setChallenge(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        alert("Challenge not found");
      }
    };

    fetchChallenge();
  }, [challengeId, navigate]);

  // Accept challenge
  const handleAccept = async () => {
    try {
      await axios.post(`http://localhost:8000/challange/${challengeId}/accept`);
      alert("Challenge accepted!");
      navigate(`/`); // Redirect to game page
    } catch (error) {
      console.error("Error accepting challenge:", error);
    }
  };

  // Reject challenge
  const handleReject = async () => {
    try {
      await axios.post(`http://localhost:8000/challenge/${challengeId}/reject`);
      alert("Challenge rejected.");
      navigate("/");
    } catch (error) {
      console.error("Error rejecting challenge:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Challenge Details</h1>
      <p><strong>Challenger:</strong> {challenge?.challenger?.username}</p>
      <p><strong>scoreChallengers:</strong> {challenge.scoreChallengers}</p>
      <p><strong>Opponent:</strong> {challenge.invitee.username}</p>
      
      <button onClick={handleAccept} style={{ marginRight: "10px", padding: "10px" }}>
        ✅ Accept
      </button>
      
      <button onClick={handleReject} style={{ padding: "10px" }}>
        ❌ Reject
      </button>
    </div>
  );
};

export default ChallengeDetails;
