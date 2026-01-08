import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

//routes

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logOutUser);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
