import { getSocket } from "../config/socket.config.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

const onlineUsers = new Map();

export function registerChatSocket() {
  const io = getSocket();

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // 1️⃣ Token verification
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
      console.log("❌ Invalid token:", err.message);
      return socket.disconnect();
    }

    socket.on("chat:send", async (data) => {
      try {
        const { chatId, message, type = "text" } = data;
        const userId = socket.user.id;

        if (!message || !userId) return;

        let chat;
        if (!chatId) {
          chat = await Chat.create({ userId, title: "New Chat" });
        } else {
          chat = await Chat.findOne({ where: { id: chatId, userId } });
          if (!chat) return;
        }

        const userMessage = await Message.create({
          chatId: chat.id,
          sender: "user",
          message,
        });

        chat.lastMessageId = userMessage.id;
        await chat.save();

        io.to(socket.id).emit("chat:receive", {
          chatId: chat.id,
          sender: "user",
          type: "text",
          message: userMessage.message,
          createdAt: userMessage.createdAt,
        });

        setTimeout(async () => {
          const assistantMessage = await Message.create({
            chatId: chat.id,
            sender: "assistant",
            message:
              "Hello! I’m PackMate, your travel assistant. How can I help you today? ✈️",
          });

          // Update chat lastMessageId
          chat.lastMessageId = assistantMessage.id;
          await chat.save();

          // Send assistant message
          io.to(socket.id).emit("chat:receive", {
            chatId: chat.id,
            from: "assistant",
            type: "text",
            message: assistantMessage.message,
            createdAt: assistantMessage.createdAt,
          });
        }, 1000); // 1-second delay for "thinking..."
      } catch (err) {
        console.error("Error handling chat:send:", err.message);
      }
    });

    // 4️⃣ Handle disconnect
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
      onlineUsers.delete(socket.user?.id);
    });
  });
}
