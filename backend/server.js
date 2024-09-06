import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import songRoutes from "./routes/songRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Use the song routes
app.use("/songs", songRoutes);
app.use("/users", userRoutes);
// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
