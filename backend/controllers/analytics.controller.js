import JobModel from "../models/Job.model.js";

//DashBoard Analytics
export const getDashBoardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    //total jobs
    const totalJobs = await JobModel.countDocuments({ userId });

    //status count
    const statusStats = await JobModel.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    //monthly count
    const monthlyStats = await JobModel.aggregate([
      { $match: { userId } },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      totalJobs,
      statusStats,
      monthlyStats,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
