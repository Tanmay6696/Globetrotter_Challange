import {ChallengesCollectionmodel} from '../models/ChallengesCollection.model.js';
import {User} from '../models/user.model.js';
import {io} from '../index.js';
import {QuestionsandAnswersModel} from '../models/QuestionsandAnswers.model.js';
import { getRandomQuestions,validateAnswer } from './game.controller.js';

const createChallange=async(req,res)=>{
    try {
        const { challengerUsername, opponentUsername } = req.body;
        const challenger = await User.findOne({ username: challengerUsername });
        
        
        if (!challenger) return res.status(404).json({ message: "Challenger not found" });

        const opponent = await User.findOne({ username: opponentUsername });
        if (!opponent) return res.status(404).json({ message: "opponent not found" });
        const newchallange=new ChallengesCollectionmodel({
            challenger:challenger._id,
            invitee:opponent._id,
            status:"pending",
        })
        await newchallange.save();
        const newchallangeid=newchallange._id;
        const invitelink=`${process.env.CLIENT_URL}/challange/${newchallange._id}`;
        res.json({
            messgae:"Challange created successfully",
            invitelink,
            newchallangeid,
            ChallangerScore:challenger.highScore
        })
    } catch (error) {
        console.error(error);
        
    }
}
const getChallengeDetails =async(req,res)=>{
    try {
        const ChallangeDetails=await ChallengesCollectionmodel.findById(req.params.challengeId)
        const challenger=await User.findById(ChallangeDetails.challenger);
        const invitee=await User.findById(ChallangeDetails.invitee);
        const scoreChallengers=challenger.currentScore;
        console.log(scoreChallengers);
        
        console.log(ChallangeDetails,req.params.challengeId);
        if(!ChallangeDetails){
            return res.status(404).json({message:"Challange not found"})
        }
        if(ChallangeDetails.status!=="pending"){
            return res.json({
                message:"Challange is alerady accepted",
                ChallangeDetails
            })
        }
        res.json({
            challenger,
            invitee,
            scoreChallengers
        })

    } catch (error) {
        console.log(error);
        
    }
}
const AcceptChallenge =async(req,res)=>{
    try {
        const ChallangeDetails=await ChallengesCollectionmodel.findById(req.params.challengeId)
        const challangeid=req.params.challengeId;
        if(!ChallangeDetails){
            return res.status(404).json({message:"Challange not found"})
        }
        const challenger=await User.findById(ChallangeDetails.challenger);
        const invitee=await User.findById(ChallangeDetails.invitee);
        const scoreChallengers=challenger.currentScore;
        console.log(scoreChallengers);
        
        console.log(ChallangeDetails,req.params.challengeId);
        if(ChallangeDetails.status!=="pending"){
            return res.json({
                message:"Challange is alerady accepted",
                ChallangeDetails
            })
        }
        ChallangeDetails.status = "active";
        await ChallangeDetails.save();
        if(challenger){
            console.log("challenger",challenger);
            
            io.to(challenger).emit("challangeAccepted",{
                message: "Your challenge has been accepted!",
                challangeid,
                opponent: opponentId,
                questions
            });
            console.log("io",io);
            
        }
        res.json({
            message:"challange accepted",
            challenger,
            invitee,
            scoreChallengers
        });


    } catch (error) {
        console.log(error);
        
    }
}
const validateAnswerinChallange = async (req, res) => {
    try {
        const { userId, questionId, selectedOption, challengeId } = req.body;
        console.log("Request Data:", req.body);

        const question = await QuestionsandAnswersModel.findById(questionId);
        if (!question) return res.status(404).json({ message: "Question not found" });

        const isCorrect = question.correctAnswer === selectedOption;

        const challenge = await ChallengesCollectionmodel.findById(challengeId);
        if (!challenge) return res.status(404).json({ message: "Challenge not found" });
        console.log("Challenge:", challenge);
        if(userId==challenge.challenger){
            challenge.scoreChallenger+=isCorrect;
            
        }
        else if(userId==challenge.invitee){
            challenge.scoreInvitee+=isCorrect;
        }
        else {
            console.log(userId);
            
            return res.status(404).json({ message: "User not found" });
        }

        

        await challenge.save(); 
        
        res.json({ isCorrect });
    } catch (error) {
        console.error("Error validating answer:", error);
        res.status(500).json({ message: "Error validating answer", error });
    }
};

export {createChallange,getChallengeDetails,AcceptChallenge,validateAnswerinChallange};