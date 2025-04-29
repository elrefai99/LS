import { Server, DefaultEventsMap, Socket } from "socket.io";
import newSession from "./functions/session.socket.fun";

export default (
     io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
   ) => {
     io.on("connection",( socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
          newSession(socket)
       }
     );
   };
