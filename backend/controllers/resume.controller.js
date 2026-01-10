//upload resume

import UserModel from "../models/User.model.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "NO file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    await UserModel.findByIdAndUpdate(req.user._id, {
      resume: result.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
