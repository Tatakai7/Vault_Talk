const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const messageRoutes = require("../../server/routes/messages");

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-netlify-app.netlify.app'] // Replace with your actual Netlify URL
    : ['http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/messages", messageRoutes);

module.exports = app;
