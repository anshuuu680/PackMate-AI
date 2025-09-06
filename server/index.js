import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./src/config/db.js";
import morgan from "morgan";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync();
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();

import userRoutes from "./src/routes/user.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
