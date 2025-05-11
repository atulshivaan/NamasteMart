import express from "express"
import { forgotPassword, getUserbyID, getUsers, resetPasswordWithCode, updatePassword, userDelete, userEdit, userLogin, userLogout, userRegister, verifyUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register",userRegister)
userRouter.post("/verify-user",verifyUser)
userRouter.post("/login",userLogin)
userRouter.get("/get-users" , getUsers)
userRouter.get("/get-user/:id",getUserbyID)
userRouter.put("/edit-user/:id",userEdit)
userRouter.delete("/delete-user/:id",userDelete)
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPasswordWithCode);
userRouter.put("/update-password", updatePassword);
userRouter.post("/logout",userLogout)




export default userRouter