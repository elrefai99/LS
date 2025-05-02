import { DefaultEventsMap, Socket } from "socket.io";
import { DMModel } from "../../schema/chat/dm.schema";

export default (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on('sendMessage', async ({ sender, receiver, content }) => {
    const message = await new DMModel({ sender, receiver, message: content, status: "sent" }).save();

    if (receiver) {
      // send to both users (assuming they're connected)
      socket.to(receiver).emit(`privateMessage:${sender}:${receiver}`, message);
      socket.to(sender).emit(`privateMessage:${receiver}:${sender}`, message);
    } else {
      socket.broadcast.emit('newMessage', message);
    }
  });
};
