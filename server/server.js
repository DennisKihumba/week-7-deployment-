// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------- MongoDB Setup --------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Message schema & model
const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
  to: String,
});

const Message = mongoose.model("Message", messageSchema);

// -------------------- App & Socket Setup --------------------
const app = express();
const server = http.createServer(app);

// IMPORTANT: Allow both HTTPS (Vercel) + WebSocket for Render
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL, 
      "http://localhost:5173",
      "https://websocket-puce-three.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// -------------------- Middleware --------------------
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "https://websocket-puce-three.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// -------------------- Store users --------------------
const users = {};
const typingUsers = {};

// -------------------- Socket.io Handlers --------------------
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User login
  socket.on("user_join", async (username) => {
    if (!username || users[socket.id]) return;

    users[socket.id] = { username, id: socket.id };

    // Send previous messages
    const allMessages = await Message.find().sort({ timestamp: 1 });
    socket.emit("previous_messages", allMessages);

    // Notify users
    io.emit("user_list", Object.values(users));
    io.emit("user_joined", { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  // Public message
  socket.on("send_message", async (data) => {
    const username = users[socket.id]?.username;
    if (!username) return;

    const message = new Message({
      user: username,
      text: data.text,
      isPrivate: false,
    });

    await message.save();
    io.emit("receive_message", message);
  });

  // Typing
  socket.on("typing", (isTyping) => {
    const username = users[socket.id]?.username;
    if (!username) return;

    if (isTyping) typingUsers[socket.id] = username;
    else delete typingUsers[socket.id];

    io.emit("typing_users", Object.values(typingUsers));
  });

  // Private messages
  socket.on("private_message", async ({ to, text }) => {
    const username = users[socket.id]?.username;
    if (!username) return;

    const message = new Message({
      user: username,
      text,
      isPrivate: true,
      to,
    });

    await message.save();

    socket.to(to).emit("private_message", message);
    socket.emit("private_message", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id]?.username;

    if (username) {
      console.log(`${username} left`);
      io.emit("user_left", { username, id: socket.id });
    }

    delete users[socket.id];
    delete typingUsers[socket.id];

    io.emit("user_list", Object.values(users));
    io.emit("typing_users", Object.values(typingUsers));
  });
});

// -------------------- API Routes --------------------
app.get("/api/messages", async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.json(messages);
});

app.get("/api/users", (req, res) => {
  res.json(Object.values(users));
});

// Health route for Render uptime
app.get("/", (req, res) => {
  res.send("Server is running ✔️");
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
