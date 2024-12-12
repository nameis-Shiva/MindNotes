import mongoose from "mongoose";
import express from "express";
import { deleteUser, getUser, login, signup, updateUser, verifyEmail } from "../controller/userController.js";
import { verifyToken } from "../middlewares/jwt-Verification.js";

const userRouter = express.Router();

//Demo
userRouter.get("/",(req,res) => res.send("User Router is working"))

//User Registration or Signup
userRouter.post("/signup",signup)
//Verify Email while Signing up
userRouter.post("/verifyemail",verifyEmail)
//User Login
userRouter.post("/login",login)
//Get User
userRouter.get("/getuser",verifyToken,getUser)
//Update User
userRouter.put("/updateuser",verifyToken,updateUser)
//Delete User
userRouter.delete("/delete",verifyToken,deleteUser)

export default userRouter;