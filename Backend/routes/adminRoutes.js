const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// In a real application, you'd have an Admin model. For simplicity, we might hardcode or use ENV if no model was specified, but let's assume one admin for now or use env credentials.

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Simplistic check against ENV variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "1d" });
      
      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      
      return res.status(200).json({ success: true, message: "Login successful", token });
    }
    
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
