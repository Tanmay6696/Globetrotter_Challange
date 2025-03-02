import dotenv from "dotenv";
import {app} from './app.js'
import connectDB from "./db/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({path:"./env"});

const server = createServer(app); 
const connectedUsers = {};
const io = new Server(server, 
    { 
        cors: { 
            origin: process.env.CLIENT_URL || "*"
        } 
    }
);
io.on("connection", (socket) => {
  
    socket.on("register", (userId) => {
        console.log(`User ${userId} joined room`);

      connectedUsers[userId] = socket.id;
    });
  
    
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      Object.keys(connectedUsers).forEach((key) => {
        if (connectedUsers[key] === socket.id) delete connectedUsers[key];
      });
    });
  });
export {io};
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
