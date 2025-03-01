import mongoose ,{Schema} from "mongoose";
import { User } from "./user.model.js";
const ChallengesCollectionSchema=new Schema({
    challenger: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, 
    invitee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }, 
    status: { type: String, enum: ["pending", "accepted", "completed"], default: "pending" },
    scoreChallenger: { type: Number, default: 0 },
    scoreInvitee: { type: Number, default: 0 },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});
export const ChallengesCollectionmodel=mongoose.model("ChallengesCollectionmodel",ChallengesCollectionSchema);