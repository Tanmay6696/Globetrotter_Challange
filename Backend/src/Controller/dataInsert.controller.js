import {QuestionsandAnswersModel} from '../models/QuestionsandAnswers.model.js';
const insertdata = async(req,res)=>{
    try {
        await QuestionsandAnswersModel.insertMany(req.body);
        console.log("data added");
        
    } catch (error) {
        console.error(error);
        
    }
    res.json({message:"Data added successfully"});
}
export {insertdata}