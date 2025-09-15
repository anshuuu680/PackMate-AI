import { getSocket } from "../config/socket.js";

export function registerChatSocket() {
  const io = getSocket();

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("send-message", (data) => {
      console.log("📩 Message received:", data);
      io.emit("receive-message", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
}
