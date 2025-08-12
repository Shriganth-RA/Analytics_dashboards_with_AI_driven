import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: [ "Admin", "Manager", "Member" ] },
    },
    {
        timeStamp: { type: Date, default: Date.now() }
    }
);

const userModel = mongoose.model('userModel', userSchema);

export default userModel;