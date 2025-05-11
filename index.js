import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import ConnectDB from "./config/db.connection.js";
import cors from "cors"


dotenv.config();

const app =express();
const port =process.env.PORT || 40404

//middleware
app.use(cors({
    origin:"*",
    Credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))






app.listen(port ,(req,res)=>{
    ConnectDB();
    console.log(`Server is running on ${port}`);
    
})