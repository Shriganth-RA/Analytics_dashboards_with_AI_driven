import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';

const authRoute = express.Router();

authRoute.get('/admin', verifyToken, checkRole("Admin"), (req, res) => {
    res.json({ message: "Welcome, Admin" })
})
authRoute.get('/manager', verifyToken, checkRole("Admin", "Manager"), (req, res) => {
    res.json({ message: "Welcome, Manager" })
})
authRoute.get('/user', verifyToken, checkRole("Admin", "Manager", "User"), (req, res) => {
    res.json({ message: "Welcome, User" })
})

export default authRoute;