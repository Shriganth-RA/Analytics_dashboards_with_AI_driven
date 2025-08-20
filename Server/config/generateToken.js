import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const generateToken = asyncHandler(async (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, { expiresIn: "7d" });
});