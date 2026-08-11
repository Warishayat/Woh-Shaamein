const Song = require("../Schemas/Memory");
const { uploadToCloudinary } = require("../utils/cloudinaryUpload");
const crypto = require("crypto");
const { sendModerationEmail } = require("../utils/email");

const createSong = async (req, res) => {
  try {
    const { title, artist, year, story, submittedBy } = req.body;
    const imageFile = req.files && req.files.image ? req.files.image[0] : null;
    const audioFile = req.files && req.files.audio ? req.files.audio[0] : null;

    if (!title || !artist || !year || !story || !imageFile || !audioFile) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Upload to Cloudinary
    const imageUpload = await uploadToCloudinary(imageFile.buffer, "image");
    const audioUpload = await uploadToCloudinary(audioFile.buffer, "video"); // audio is often uploaded as video in Cloudinary or raw

    // Generate token
    const moderationToken = crypto.randomBytes(32).toString("hex");

    const newSong = await Song.create({
      title,
      artist,
      year: parseInt(year),
      story,
      image: imageUpload,
      audio: audioUpload,
      submittedBy: submittedBy || "Anonymous",
      status: "pending",
      moderationToken
    });

    // Send email notification
    await sendModerationEmail(newSong, moderationToken);

    res.status(201).json({ success: true, message: "Song submitted successfully", song: newSong });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({ status: "approved" }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id, status: "approved" });
    if (!song) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }
    res.status(200).json({ success: true, song });
  } catch (error) {
    console.error("Error fetching song:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createSong, getSongs, getSongById };
