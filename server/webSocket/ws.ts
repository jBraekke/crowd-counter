import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const initiateSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer);
  return io.on("connect", (socket) => {
    console.log(`connect ${socket.id}`);

    return socket;
  });
};
