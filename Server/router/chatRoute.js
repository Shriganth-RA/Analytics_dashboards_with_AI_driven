import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import { accessChat } from '../controller/chatController.js';

const chatRoute = express.Router();

chatRoute.post('/', verifyToken, accessChat);


export default chatRoute;