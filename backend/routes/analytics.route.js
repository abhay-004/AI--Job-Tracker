import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getDashBoardStats } from "../controllers/analytics.controller.js";

const analyticsRouter = express.Router();

//routes

analyticsRouter.get("/dashboard", authMiddleware, getDashBoardStats);

export default analyticsRouter;
