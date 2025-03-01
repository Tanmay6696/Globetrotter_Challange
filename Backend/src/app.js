import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app=express();
app.use(cors());

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static('public'));
app.use(cookieParser());





//routes import 
import userRoutes from './routes/user.routes.js';
app.use("/user",userRoutes);


import dataaddRoutes from './routes/dataadd.route.js';
app.use("/adddata",dataaddRoutes)

import gameRoutes from './routes/game.route.js';
app.use("/game",gameRoutes)

import challangeRoutes from './routes/challange.route.js';
app.use("/challange",challangeRoutes);

export {app};