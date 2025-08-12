import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';


// Register Module
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "Missing details." })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User register successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
};


// Login Module
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "Missing details." })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid User." })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Invalid Password." })
        }

        if (role !== user.role) {
            return res.status(404).json({ success: false, message: "User role is not matched." })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ success: true, message: "Login successfully.", userData: { id: user._id, name: user.name, email: user.email, role: user.role } })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// Logout Module
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "node" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(201).json({ success: true, message: "Logout successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}