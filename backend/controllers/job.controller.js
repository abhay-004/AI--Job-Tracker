import JobModel from "../models/Job.model.js";

//create job
export const createJob = async (req, res) => {
  try {
    const job = await JobModel.create({ ...req.body, userId: req.user._id });

    return res.status(201).json({ success: true, job });
  } catch (error) {
    return res, status(500).json({ success: false, message: "Server error" });
  }
};

//get all jobs(user specific)

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res, status(500).json({ success: false, message: "Server error" });
  }
};

//update job status

export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const job = await JobModel.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res, status(500).json({ success: false, message: "Server error" });
  }
};

//delete job

export const deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Job Deleted successfully" });
  } catch (error) {
    return res, status(500).json({ success: false, message: "Server error" });
  }
};
