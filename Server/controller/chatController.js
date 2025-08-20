import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'
import User from '../models/userModel.js'


// access or create one to one chat
export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    // console.log(userId)
    // console.log(req.user._id)

    if (!userId) {
        res.status(400).json({ success: false, message: "User ID is missing." })
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } }, { users: { $elemMatch: { $eq: req.user._id } } }
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name, email, profilePic",
    });

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        // console.log(chatData);
        // console.log("hello")

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            console.log(fullChat)
            res.status(200).json(fullChat)
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
})