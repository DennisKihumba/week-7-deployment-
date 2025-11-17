# MERN Real-Time Chat Application (Socket.IO + MongoDB Atlas)

A full-stack real-time chat application built using the MERN stack, Socket.IO, and MongoDB Atlas.  
Features authentication, online indicators, private messaging, and message persistence.

---

# 🚀 Live Deployment

### **Frontend (React, Vercel)**
🔗 https://mern-chat-webapp.vercel.app

### **Backend API (Node.js, Render)**
🔗 https://mern-chat-server.onrender.com

> ✔ Both deployments automatically update on every `git push` (CI/CD enabled)

---

# 📌 Main Features

- 🔥 **Real-time messaging** (Socket.IO)  
- 👤 **User login** required before chatting  
- 🟢 **Online users display**  
- 💬 **Typing indicators**  
- 📨 **Private & group chat support**  
- 🗄️ **MongoDB Atlas chat storage**  
- 🔐 **JWT authentication**  
- 🚀 **CI/CD automated deployment (Vercel + Render)**  
- 📊 **Monitoring on Render + MongoDB Atlas**

---

# 🧪 CI/CD Pipeline Documentation

### **Frontend – Vercel**
- Auto deploys when pushing to GitHub  
- Handles build + static file optimization  
- Shows deployment logs and preview URLs  

📸 **Pipeline Screenshot**  
![Vercel Deployment](./screenshots/vercel-deploy.png)

---

### **Backend – Render**
- Automatically deploys on every push  
- Runs Node server + sockets  
- Live logs and build progress included  

📸 **Build Logs**  
![Render Build](./screenshots/render-build.png)

📸 **Server Logs**  
![Render Logs](./screenshots/render-logs.png)

---

# 📊 Monitoring Setup

### **Render Monitoring**
- Real-time CPU, RAM, and server health checks  
- Error logging + uptime monitoring  

📸  
![Render Metrics](./screenshots/render-metrics.png)

### **MongoDB Atlas Monitoring**
- Live cluster metrics  
- Network traffic  
- Query performance  
- Connection activity  

📸  
![Atlas Metrics](./screenshots/atlas-metrics.png)

---

# 🛠 Tech Stack

### **Frontend**
- React  
- Vite  
- Socket.IO client  
- Vercel Hosting  

### **Backend**
- Node.js + Express  
- Socket.IO  
- JWT Auth  
- MongoDB Atlas  
- Render Hosting  

---

# 💾 Installation (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

###project structure
/client
  /src
    /pages
    socket.js
    App.jsx

/server
  server.js
  routes/
  models/
  controllers/
