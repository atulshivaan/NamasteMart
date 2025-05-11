import express from "express"
import { forgotPassword, getUserbyID, getUsers, resetPasswordWithCode, updatePassword, userDelete, userEdit, userLogin, userLogout, userRegister, verifyUser } from "../controllers/user.controller.js";
import authenticateUser from "../middleware/authenticateUser.js";

const userRouter = express.Router();

userRouter.post("/register",userRegister)
userRouter.post("/verify-user",verifyUser)
userRouter.post("/login",userLogin)
userRouter.get("/get-users" , authenticateUser, getUsers)
userRouter.get("/get-user/:id", authenticateUser,getUserbyID)
userRouter.put("/edit-user/:id", authenticateUser,userEdit)
userRouter.delete("/delete-user/:id", authenticateUser, userDelete)
userRouter.post("/forgot-password",authenticateUser, forgotPassword);
userRouter.post("/reset-password",authenticateUser, resetPasswordWithCode);
userRouter.put("/update-password",authenticateUser, updatePassword);
userRouter.post("/logout",userLogout)




export default userRouter