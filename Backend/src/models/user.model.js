import mongoose ,{Schema} from "mongoose";
const UserSchema=new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    match:{type:Number,default:0},
    currentScore: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
export const User=mongoose.model("User",UserSchema);