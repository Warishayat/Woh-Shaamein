const express = require("express");
const router = express.Router();
const Song = require("../Schemas/Memory");

// Approve a song via email token
router.get("/:token/approve", async (req, res) => {
  try {
    const { token } = req.params;
    
    const song = await Song.findOne({ moderationToken: token, status: "pending" });
    if (!song) {
      return res.status(404).send("<h2>Link expired or invalid. Song may have already been moderated.</h2>");
    }

    song.status = "approved";
    song.reviewedAt = new Date();
    // Invalidate the token
    song.moderationToken = null;
    await song.save();

    res.status(200).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #28a745;">Song Approved Successfully ✓</h1>
        <p>The song "${song.title}" is now live on the public homepage.</p>
      </div>
    `);
  } catch (error) {
    console.error("Error approving song:", error);
    res.status(500).send("Server Error");
  }
});

// Reject a song via email token
router.get("/:token/reject", async (req, res) => {
  try {
    const { token } = req.params;
    
    const song = await Song.findOne({ moderationToken: token, status: "pending" });
    if (!song) {
      return res.status(404).send("<h2>Link expired or invalid. Song may have already been moderated.</h2>");
    }

    song.status = "rejected";
    song.reviewedAt = new Date();
    // Invalidate the token
    song.moderationToken = null;
    await song.save();

    res.status(200).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #dc3545;">Song Rejected ✓</h1>
        <p>The song "${song.title}" has been rejected and will not be displayed.</p>
      </div>
    `);
  } catch (error) {
    console.error("Error rejecting song:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
