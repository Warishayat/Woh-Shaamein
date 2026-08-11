const nodemailer = require('nodemailer');

const sendModerationEmail = async (songDetails, token) => {
  const adminEmail = process.env.EMAIL;
  // Use localhost in dev, or your production URL in prod
  const baseUrl = process.env.BASE_URL || 'http://localhost:5173'; // Usually backend is 3000 but if we route from frontend it would be 5173, wait moderation routes are on backend so it should be backend URL.
  // Actually, backend runs on 5000 or whatever PORT is. Let's use localhost:3000 as default or what they have.
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
  
  const approveUrl = `${backendUrl}/api/moderation/${token}/approve`;
  const rejectUrl = `${backendUrl}/api/moderation/${token}/reject`;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Nayi Yaad Submit Ho Gayi 🎶</h2>
      <p>Woh Shaamein par ek naya gaana submit hua hai aur aapke review ka intezaar kar raha hai.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <img src="${songDetails.image?.url}" alt="Memory Image" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 15px;" />
        <p><strong>Gaana:</strong> ${songDetails.title}</p>
        <p><strong>Artist:</strong> ${songDetails.artist}</p>
        <p><strong>Presented By:</strong> ${songDetails.submittedBy || 'Anonymous'}</p>
        <p><strong>Saal:</strong> ${songDetails.year}</p>
        <p><strong>Kahani:</strong></p>
        <blockquote style="font-style: italic; color: #555; border-left: 3px solid #d4af37; padding-left: 10px;">
          "${songDetails.story}"
        </blockquote>
        
        <div style="margin-top: 15px; padding: 10px; background: #eee; border-radius: 5px;">
          <p style="margin: 0 0 10px 0;"><strong>Audio:</strong></p>
          <audio controls style="width: 100%;">
            <source src="${songDetails.audio?.url?.replace('/upload/', '/upload/f_mp3/')}" type="audio/mpeg">
            Your email client does not support the audio element. 
          </audio>
          <p style="margin-top: 10px; font-size: 12px;"><a href="${songDetails.audio?.url?.replace('/upload/', '/upload/f_mp3/')}" target="_blank">Click here to listen</a> if the player doesn't work.</p>
        </div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
        <a href="${approveUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px;">APPROVE</a>
        <a href="${rejectUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">REJECT</a>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Woh Shaamein" <${process.env.EMAIL}>`,
      to: adminEmail,
      subject: 'New Song Submission - Woh Shaamein',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendModerationEmail };
