import dotenv from "dotenv";
import {app} from './app.js'
import connectDB from "./db/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({path:"./env"});

const server = createServer(app); 

const io = new Server(server, 
    { 
        cors: { 
            origin: process.env.CLIENT_URL || "*"
        } 
    }
);
export {io};
connectDB()
.then(()=>{
    server.listen(process.env.PORT ||3000, ()=>{
        console.log(`server is running on port ${process.env.PORT ||3000}`);
        
    })
})
.catch((error)=>console.log("error",error));
