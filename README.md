# 📻 Woh Shaamein - A Digital Time Capsule

Woh Shaamein is a deeply nostalgic, cinematic web application built to preserve memories associated with old, sad, and heartbroken 90s/millennial songs. It serves as a community-driven digital time capsule where users can share their favorite nostalgic tracks along with the personal stories attached to them.




https://github.com/user-attachments/assets/e2474614-63b8-4e8b-a5c5-4638f9969054






## ✨ Features

- **🎧 Uninterrupted Global Audio Player:** Powered by React Context, the music never stops. Users can navigate between "Home", "Memories", and "Support Us" pages without interrupting the current song.
- **📱 Single-Screen Cinematic UI:** A beautiful, responsive glassmorphism design that scales perfectly across Mobile, Tablet, and 4K Desktop screens without unnecessary scrolling.
- **🛡️ Secure Email Moderation:** Every uploaded song/memory goes through a rigorous admin approval process. Admins receive an email with a secure cryptographic token and a rich-media preview to approve or reject the submission.
- **☁️ Cloud-Optimized Media:** Audio and images are securely processed and hosted on Cloudinary, with audio files automatically transcoded and optimized for seamless browser compatibility.
- **📝 Story & Memory Sharing:** Users can attach their names and deeply personal stories to each song. 
- **☕ Built-in Support Ecosystem:** An integrated "Support Us" page featuring a QR scanner and Easypaisa details to help fund the project.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (Glassmorphism, custom animations, custom scrollbars)
- **State Management:** React Context API (Global Audio Player)
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Media Storage:** Cloudinary
- **Email Service:** Nodemailer

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary Account (API Keys)
- Gmail App Password (for Nodemailer)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/woh-shaamein.git
cd woh-shaamein
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file inside the `Backend` directory:
```env
MONGO_ATLAS_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
EMAIL=your_admin_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=3000
```
Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
Run the frontend development server:
```bash
npm run dev
```

---

## 🔒 Security Measures Implemented
- **File Validation:** Multer strictly enforces a 15MB limit and only accepts `audio/*` and `image/*` MIME types to prevent memory exhaustion and malware uploads.
- **Crypto Tokens:** Admin moderation uses randomized `crypto.randomBytes(32)` tokens to ensure approvals cannot be bypassed or brute-forced.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
