import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/chat",
    transports: ["websocket"],
  });

  return io;
}

export function getSocket() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
