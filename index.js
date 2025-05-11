import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import ConnectDB from "./config/db.connection.js";

import userRouter from "./routes/user.route.js";


dotenv.config();

const app =express();
const port = 4040

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))


//routes
app.use("/api/v1",userRouter)
app.use("/",(req,res)=>{
    res.send("Thos is rever")
})




const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1); 
  }
};

startServer();