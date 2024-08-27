const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const songRoutes = require("./routes/songRoutes");

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use the song routes
app.use("/api", songRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
