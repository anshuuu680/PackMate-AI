import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import sequelize from "./src/config/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true, // allow cookies / auth headers
  })
);

app.use(morgan("dev"));

// DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync();
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();

// Routes
import userRoutes from "./src/routes/user.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";
import wardrobeRoutes from "./src/routes/wardrobe.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";
import { initSocket } from "./src/config/socket.config.js";
import { registerChatSocket } from "./src/sockets/chat.socket.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/wardrobe", wardrobeRoutes);
app.use("/api/v1/chat", chatRoutes);

// HTTP server
const server = http.createServer(app);

// Init socket
const io = initSocket(server);

registerChatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
