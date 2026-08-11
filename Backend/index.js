const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Config/database");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173'] : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const songRoutes = require("./routes/songRoutes");
const adminRoutes = require("./routes/adminRoutes");
const moderationRoutes = require("./routes/moderationRoutes");

app.use("/api/songs", songRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/moderation", moderationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("onlineUsers", onlineUsers);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); 