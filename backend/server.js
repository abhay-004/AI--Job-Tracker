import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import mongoose from "mongoose";

//db connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGO DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
console.log(process.env.MONGO_URI);

//server run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
