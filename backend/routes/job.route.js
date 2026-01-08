import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJobStatus,
} from "../controllers/job.controller.js";

const jobRouter = express.Router();

//routes

jobRouter.post("/", authMiddleware, createJob);
jobRouter.get("/", authMiddleware, getAllJobs);
jobRouter.patch("/:id", authMiddleware, updateJobStatus);
jobRouter.delete("/:id", authMiddleware, deleteJob);

export default jobRouter;
