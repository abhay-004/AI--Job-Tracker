//get user profile

export const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
