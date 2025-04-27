import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/mongoDB.con';
import SiteUitles from './Utils/Site.uitles';
import { setupSwagger } from './swagger';

const app = express();

SiteUitles(app)

setupSwagger(app)

app.listen(process.env.PORT, () => {
  connectDB()
  console.log(`🖥️  Server is running on port ${process.env.PORT}`);
});
