import { DefaultEventsMap, Socket } from "socket.io";

export default (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on("session", (data) => {
    socket.join(data.currentAuthenticatedUserId);
  });
};
