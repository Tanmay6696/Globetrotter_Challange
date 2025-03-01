import { QuestionsandAnswersModel } from "../models/QuestionsandAnswers.model.js";
import { User } from "../models/user.model.js";
const getRandomQuestions = async (req, res) => {
    try {
        const questions = await QuestionsandAnswersModel.aggregate([{ $sample: { size: 5 } }]);
        let questionsindex=questions.map((question,index)=>question._id);
        console.log(questionsindex);
        
        res.json({ questionsindex });
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};
const getQuestionofparticularIndex = async (req, res) => {
    try {
        console.log(req.body);
        const Question_id=req.body.questionId;
        const questions = await QuestionsandAnswersModel.findById(Question_id).select("-correctAnswer");

       if(!questions) return res.status(404).json({ message: "Question not found" });
        console.log(questions);
        
        res.json({ questions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};
const validateAnswer = async (req, res) => {
    try {
        const { questionId, selectedOption ,userId} = req.body;
        
        console.log(questionId, selectedOption);
        
        const question = await QuestionsandAnswersModel.findById(questionId);

        if (!question) return res.status(404).json({ message: "Question not found" });
        console.log(question.correctAnswer);
        
        const isCorrect = question.correctAnswer === selectedOption;
        const userdetail=await User.findById(userId);
        console.log("userdetail",userdetail);
        userdetail.currentScore+=isCorrect;
        await userdetail.save();
        
        res.json({ isCorrect });
    } catch (error) {
        res.status(500).json({ message: "Error validating answer", error });
    }
};
const getFinalScore = async (req, res) => {
    try {
        const { userId } = req.body;  // Fetch userId from query params
        console.log("userId",userId);
        
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ finalScore: user.currentScore });

    } catch (error) {
        res.status(500).json({ message: "Error fetching final score", error: error.message });
    }
};


export {getRandomQuestions,validateAnswer,getQuestionofparticularIndex,getFinalScore}