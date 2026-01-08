import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    //get token
    const  token  = req.cookies.token;

    //check token
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach user request

    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
