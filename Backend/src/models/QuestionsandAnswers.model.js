import mongoose ,{Schema} from "mongoose";
const QuestionsandAnswersSchema=new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    clues: [{type:String,required:true}],
    fun_fact: [{type:String,required:true}],
    trivia: [{type:String,required:true}],
    options: [{type:String,required:true}], 
    correctAnswer: { type: String, required: true } 
});
export const QuestionsandAnswersModel=mongoose.model("QuestionsandAnswersModel",QuestionsandAnswersSchema);