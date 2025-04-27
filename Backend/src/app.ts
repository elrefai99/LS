import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/mongoDB.con';

const app = express();

app.listen(process.env.PORT, () => {
  connectDB()
  console.log(`🖥️  Server is running on port ${process.env.PORT}`);
});
