import { getSocket } from "../config/socket.config.js";
import jwt from "jsonwebtoken";

const onlineUsers = new Map();

export function registerChatSocket() {
  const io = getSocket();

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        console.log("❌ No token provided, disconnecting...");
        return socket.disconnect();
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;
      onlineUsers.set(decoded.id, socket.id);
    } catch (err) {
      console.log("❌ Invalid token", err.message);
      return socket.disconnect();
    }

    socket.on("chat:send", async (data) => {
      const assistant = {
        from: "assistant",
        type: "text",
        text: "This is the assistant’s reply! 🤖",
      };

      io.to(socket.id).emit("chat:receive", assistant);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
      onlineUsers.delete(socket.user?.id);
    });
  });
}
