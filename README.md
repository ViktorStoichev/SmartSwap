# 📱 SmartSwap

SmartSwap is a full-featured React & Firebase application that enables users to **buy and sell second-hand phones** directly with each other. The app provides a smooth, interactive, and secure experience, including posts management, user communication, real-time chat, image uploads, and an admin approval system.

---

## ✨ Features

### 🔥 User functionalities

- **Create, edit, and delete posts** about phones for sale.
- Upload multiple images per post, which are displayed as a **carousel** on the post details page.
- **Like and comment** on other users' posts.
- **View and manage your own profile**, including:
  - Your posted phones
  - Your liked posts
  - Your pending posts waiting for admin approval
- **Browse other users' profiles** to see what else they are offering.

---

### 💬 Real-time chat

- Users can send **instant messages** to each other using a built-in real-time chat system.
- Messages are delivered immediately without refreshing the page.

---

### 🔎 Advanced browsing

- **Search bar in the header** to easily find phones by keywords.
- **Filtering options** on the main phones page to filter by specific criteria (e.g., brand, condition, price).
- **Pagination system** to prevent endless scrolling and improve user experience.

---

### 🛡️ Data validation & security

- Custom validations when creating posts or registering accounts to ensure data quality.
- **Profanity filtering** using [leo-profanity](https://github.com/jojoee/leo-profanity) to prevent offensive content.
- Posts are not publicly visible until **approved by an admin**.

---

### 👨‍💻 Admin system

- Admins can **review, approve, or reject** each newly submitted phone listing.
- Pending posts remain in the user's profile under a "Pending" section until approved.
- Prevents inappropriate or malicious content from appearing on the site.

---

### 🌐 Responsive design

- Fully responsive and optimized for **mobile phones, tablets, laptops, and desktops**.

---

## ⚙️ Tech stack

### Frontend

- **React** (with hooks and functional components)
- **React Router** for navigation
- CSS modules (or plain CSS) for styling
- Custom hooks and context for global state management

### Backend

- **Firebase**:
  - Firestore (database)
  - Firebase Authentication
  - Real-time database features for chat
- **Node.js + Express.js**:
  - Server for handling image uploads
  - Saving files to **Cloudinary**
  - Storing image URLs back to Firebase

### Cloud services

- **Cloudinary** for image hosting and transformation

---

## 🖼️ Image uploads

- Users can upload multiple images (stored in Cloudinary).
- Images are resized automatically and optimized for performance.
- Image links are saved in Firebase and displayed using a carousel on the post details page.

---

## 🧑‍💻 Access to the application

- https://thrift-shop-686da.web.app/
