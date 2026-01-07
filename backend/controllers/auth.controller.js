import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Register route for user

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    //check user exist
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "User register successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//login route

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    //check user

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    //check password
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    //generate token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //set cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//logout

export const logOutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logout successfully" });
};
