import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";

export const getOnlineStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found." })
        }
        res.status(200).json({ success: true, message: userModel.isOnline })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};


//  Get all user
export const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})