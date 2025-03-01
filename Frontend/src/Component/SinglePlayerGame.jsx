import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lossimage from '../assets/SadFaces.png';
import winimage from '../assets/win.png';
const SinglePlayerGame = () => {
    const userId=useSelector((state)=>state?.user?.userId?.userId);
    const [lastQuestion,setLastQuestion]=useState(0)
    const [questionsIndex, setQuestionsIndex] = useState([]);
    const [clue, setClue] = useState('');
    const [options, setOptions] = useState([]);
    const [index, setIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [responeImage, setResponseImage] = useState(lossimage);
    const [fact, setFact] = useState('');
    const [showFact, setShowFact] = useState(false);
    const [FinalScore, setFinalScore] = useState(0);
    useEffect(() => {
        startGame();
    }, []);

    const startGame = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/game/startgame');
            setQuestionsIndex(data.questionsindex);
            fetchQuestion(data.questionsindex[0]);
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    const fetchQuestion = async (questionId) => {
        try {
            const { data } = await axios.post('http://localhost:8000/game/getparticularquestion', {
                questionId
            });

            setClue(data.questions.clues[0]);
            setOptions(data.questions.options);
            setFact(data.questions.fun_fact[0]);
            setSelectedOption(null);
            setIsCorrect(null);
            setShowFact(false);
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };

    const handleAnswer = async (option) => {
        setSelectedOption(option);
        console.log(userId);
        
        try {
            const { data } = await axios.post('http://localhost:8000/game/validateanswer', {
                questionId: questionsIndex[index],
                selectedOption: option,
                userId: userId // Replace with actual user ID from Redux
            });
    
            console.log("data", data);
    
            if (data.isCorrect) {
                setResponseImage(winimage);
                console.log("winimage", winimage);
            } else {
                setResponseImage(lossimage);
            }
    
            setIsCorrect(data.isCorrect);
            setShowFact(true); // Show the fact immediately
    
            if (index + 1 < questionsIndex.length) {
                // Wait for 3 seconds before loading the next question
                setTimeout(() => {
                    setShowFact(false);
                    setIndex(index + 1);
                    fetchQuestion(questionsIndex[index + 1]);
                }, 3000);
            } else {
                setTimeout(async () => {
                    alert("Game Over!");
                    const score = await axios.post('http://localhost:8000/game/finalscoredcard', {
                        userId: userId
                    });
                    setShowFact(false);
                    setLastQuestion(1);
                    console.log("score", score);
                    setFinalScore(score.data.finalScore);
                }, 3000);
            }
        } catch (error) {
            console.error("Error validating answer:", error);
        }
    };
    
    

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Single Player Game</h1>

            {/* Clue Animation */}
            <h2 
                style={{
                    opacity: clue ? 1 : 0,
                    transition: "opacity 0.5s ease-in"
                }}
            >
                {clue}
            </h2>

            {/* Options with Click Animation */}
            {options.map((option, i) => (
                <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    style={{
                        padding: "10px 20px",
                        margin: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease"
                    }}
                    
                >
                    {option}
                </button>
            ))}

            {/* Fact Reveal Animation */}
            {showFact && (<>
                    <p 
                        style={{
                            opacity: showFact ? 1 : 0,
                            transition: "opacity 1s ease-in",
                            fontSize: "18px",
                            color: "blue",
                            marginTop: "20px"
                        }}
                    >
                        <strong>Fact:</strong> {fact}
                    </p>
                    <img src={responeImage}/>
                </>
            )}
            {FinalScore !== 0 && (<p>Final Score: {FinalScore}</p>)}

            {lastQuestion!=1 &&
            <button 
                
                onClick={() => fetchQuestion(questionsIndex[index + 1])} 
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            >
                Next Question
            </button>}
        </div>
    );
};

export default SinglePlayerGame;
