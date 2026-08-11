const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createSong, getSongs, getSongById } = require("../Controller/CreatSong");

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB limit per file to prevent memory exhaustion
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Sirf images (jpg, png, etc.) allowed hain cover ke liye!"));
      }
    } else if (file.fieldname === "audio") {
      if (file.mimetype.startsWith("audio/") || file.mimetype === "video/mp4") {
        cb(null, true);
      } else {
        cb(new Error("Sirf audio files allowed hain!"));
      }
    } else {
      cb(new Error("Unexpected field"));
    }
  }
});

router.get("/", getSongs);
router.get("/:id", getSongById);
router.post(
  "/",
  (req, res, next) => {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ])(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: "File size zyada hai (Max 15MB allowed) ya format galat hai." });
      } else if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  createSong
);

module.exports = router;
