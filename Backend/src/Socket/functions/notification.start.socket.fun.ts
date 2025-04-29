import { DefaultEventsMap, Socket } from "socket.io";
import { notificationModel } from "../../schema/notification/notification.schema";

export default (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on("newUser", async (data) => {
    const { recieverId } = data;

    const message = 'Welcome to the chat!';

    const notification = new notificationModel({
      recieverId, 
      owner: recieverId,
      message
    }).save()

    socket.to(recieverId).emit("notificationSent", { notification });
  });
};
