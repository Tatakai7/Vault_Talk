# 💬 Real-Time Chat Application

> A modern, playful, and lightning-fast chat app built with the **MERN Stack** and **Socket.IO** for seamless real-time communication.  
> Connect, chat, and share moments instantly — all in one sleek platform. ⚡

![Login_Form](./public/public/images/LoginForm.png)
![Register_Form](./public/public/images/RegisterForm.png)
![Chat_Page](./public/public/images/ChatPage.png)

---

## 🚀 Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB, Socket.IO  
**Additional Tools:** bcrypt, dotenv, cors, mongoose, nodemon

---

## ✨ Features

- ⚡ **Real-Time Messaging** — Instant message delivery using Socket.IO
- 👥 **User Authentication** — Secure login and registration with bcrypt
- 💬 **Private & Group Chats** — Communicate one-on-one or with multiple users
- 📱 **Responsive UI** — Optimized for desktop and mobile devices
- 🧠 **Persistent Storage** — MongoDB to keep your conversations safe
- 🧩 **Modern & Playful Interface** — Vibrant, fun, and easy to navigate

---

## 📦 Installation

Clone the repository and set up both **client** and **server**:

```bash
git clone https://github.com/Tatakai7/Chat_Application_Web_App.git
cd Chat_Application_Web_App
```

---

## 🖥️ Backend Setup

1. Navigate to the server directory:

```bash
cd Chat_Application_Web_App/server/
```

2. Install dependencies:

```bash
npm install express mongoose bcrypt cors dotenv socket.io nodemon
```

3. Create a .env file in the server folder:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the backend server:

```bash
npm run start
```

---

## 💻 Frontend Setup

1. Navigate to the client directory:

```bash
cd Chat_Application_Web_App/public/
```

2. Install frontend dependencies:

```bash
npm install ajv@^8.0.0 ajv-keywords@^5.0.0
```

3. Run the frontend:

```bash
npm start
```

---

🌍 Project Purpose

This project promotes an understanding of real-time systems, web sockets, and collaborative open-source development.
Developers can freely fork, experiment, and submit pull requests to enhance the platform and squash bugs 🐛.

---

🤝 Contributing

1. Fork this repository
2. Create a new branch
3. Commit your enhancements or bug fixes
4. Open a Pull Request
   Let’s make real-time communication more fun, fast, and open for everyone! 💫

---

📜 License
This project is open-source and available under the GPL-3.0 License.
