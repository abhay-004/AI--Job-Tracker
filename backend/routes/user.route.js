import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controller.js";

const userRouter = express.Router();

//routes

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logOutUser);

export default userRouter;
