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
const validateAnswer = async (req, res) => {
    try {
        const { questionId, selectedOption ,username} = req.body;
        
        console.log(questionId, selectedOption);
        
        const question = await QuestionsandAnswersModel.findById(questionId);

        if (!question) return res.status(404).json({ message: "Question not found" });
        console.log(question.correctAnswer);
        
        const isCorrect = question.correctAnswer === selectedOption;
        const userdetail=await User.findOne({ username });
        console.log("userdetail",userdetail);
        userdetail.currentScore+=isCorrect;
        await userdetail.save();
        
        res.json({ isCorrect });
    } catch (error) {
        res.status(500).json({ message: "Error validating answer", error });
    }
};
export {getRandomQuestions,validateAnswer}