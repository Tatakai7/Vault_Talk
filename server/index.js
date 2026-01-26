const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();

// Track online users for Socket.IO presence features
if (!global.onlineUsers) {
  global.onlineUsers = new Map();
}

// CORS configuration - allow requests from deployed frontend and local development
const corsOptions = {
  origin: process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production' ? 'https://vault-talk-chat.netlify.app' : 'http://localhost:3000'),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection (only if a connection URI is provided)
const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;
if (mongoUri) {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connection Successful");
    })
    .catch((err) => {
      console.log(err.message);
    });
} else {
  console.warn("No MongoDB URI provided - skipping DB connection (debug mode)");
}

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Error handler to log exceptions and return JSON error responses
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// For Vercel serverless functions
module.exports = app;

// For local development
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
