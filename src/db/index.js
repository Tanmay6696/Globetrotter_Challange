import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB=async()=>{
    try {
        let connectionInstance=await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log("connected",connectionInstance.connection.host);


        
    } catch (error) {
        console.log("errors",error);
        
    }
}
export default connectDB;