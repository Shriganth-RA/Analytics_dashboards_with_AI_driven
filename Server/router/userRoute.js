import express from 'express'
import { login, logout, register } from '../controller/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { allUser } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout', logout);

userRoute.get('/user', verifyToken, allUser)

export default userRoute;