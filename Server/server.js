import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';

dotenv.config();

const app = express();
const PORT = 4000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});