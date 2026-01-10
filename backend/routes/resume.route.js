import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { uploadResume } from "../controllers/resume.controller.js";

const resumeRouter = express.Router();

//routes

resumeRouter.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);


export default resumeRouter