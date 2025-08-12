import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import userRoute from './router/userRoute.js';

dotenv.config({ path: './Server/.env' });


const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use('/auth/', userRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});