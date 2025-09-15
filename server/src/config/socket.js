import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  return io;
}

export function getSocket() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
