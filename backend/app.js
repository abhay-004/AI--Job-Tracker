import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.route.js";
import analyticsRouter from "./routes/analytics.route.js";

const app = express();

//middlewares

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//api endpoints

app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/analytics", analyticsRouter);

export default app;
