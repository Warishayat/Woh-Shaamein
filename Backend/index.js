const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Config/database");

const app = express();

app.use(cors());
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

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); 