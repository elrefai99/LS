import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/mongoDB.con';
import SiteUitles from './Utils/Site.uitles';
import { setupSwagger } from './swagger';
import appModule from './app.module';
import {Server} from 'socket.io';
import connectSocket from './Socket/connect.socket';
import { createServer } from 'http';
import { chatModel } from './schema/chat/chat.schema';

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
connectSocket(io);

SiteUitles(app)

appModule(app)

setupSwagger(app)
app.get('/messages', async (req, res) => {
  const { sender, receiver } = req.query;
  let messages;
  if (sender && receiver) {
    messages = await chatModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ createdAt: 1 });
  } else {
    messages = await chatModel.find({ receiver: null }).sort({ createdAt: 1 });
  }
  res.json(messages);
});

server.listen(process.env.PORT as string, () => {
  connectDB()
  console.log(`🖥️  Server is running on port ${process.env.PORT}`);
});
