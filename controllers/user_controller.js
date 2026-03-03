import { User } from "../models/user_models.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Invalid user ID"
    });
  }
};