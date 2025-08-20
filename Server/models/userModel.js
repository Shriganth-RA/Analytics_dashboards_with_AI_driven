import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ["Admin", "Manager", "User"] },
        profilePic: { type: String, default: "https://ui-avatars.com/api/?name=Conversa&background=random&bold=true" },
    },
    { timeStamp: true }
);

const User = mongoose.model('User', userSchema);

export default User;