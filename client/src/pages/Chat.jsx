import React, { useEffect, useState } from "react";
import socket from "../socket";

export default function Chat({ user, onLogout }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    // join chat
    socket.emit("user_join", user);

    // previous messages
    socket.on("previous_messages", (msgs) => setMessages(msgs));

    // new messages
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));

    // typing
    socket.on("typing_users", (users) => setTypingUsers(users));

    return () => {
      socket.off("receive_message");
      socket.off("typing_users");
      socket.off("previous_messages");
    };
  }, [user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("send_message", { text: message });
    setMessage("");
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", e.target.value.length > 0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatCard}>
        <div style={styles.header}>
          <h2>💬 Chat Room</h2>
          <div style={styles.userArea}>
            <p>Logged in as <strong>{user}</strong></p>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
          </div>
        </div>

        <div style={styles.messages}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              ...styles.message,
              alignSelf: msg.user === user ? "flex-end" : "flex-start",
              backgroundColor: msg.user === user ? "#007bff" : "#e4e6eb",
              color: msg.user === user ? "white" : "black",
            }}>
              {msg.isPrivate ? <em>Private: </em> : null}
              <strong>{msg.user !== user ? msg.user + ": " : ""}</strong>
              {msg.text}
            </div>
          ))}
        </div>

        {typingUsers.length > 0 && (
          <p style={{ fontSize: "0.8rem", margin: "5px 10px" }}>
            {typingUsers.filter(u => u !== user).join(", ")} typing...
          </p>
        )}

        <form onSubmit={sendMessage} style={styles.form}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
}

// styles same as before
const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #6f42c1, #007bff)", padding: "20px" },
  chatCard: { background: "white", borderRadius: "16px", width: "100%", maxWidth: "600px", height: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  header: { background: "#007bff", color: "white", padding: "15px 20px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  userArea: { display: "flex", alignItems: "center", gap: "10px" },
  logoutButton: { background: "white", color: "#007bff", border: "none", borderRadius: "8px", padding: "5px 12px", cursor: "pointer", fontWeight: "bold" },
  messages: { flex: 1, padding: "15px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", backgroundColor: "#f7f7f7" },
  message: { padding: "10px 15px", borderRadius: "12px", maxWidth: "70%", wordWrap: "break-word" },
  form: { display: "flex", padding: "10px 15px", borderTop: "1px solid #ddd", backgroundColor: "#f9f9f9", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" },
  input: { flex: 1, padding: "10px 15px", borderRadius: "10px", border: "1px solid #ccc", outline: "none", fontSize: "1rem" },
  button: { marginLeft: "10px", padding: "10px 20px", border: "none", borderRadius: "10px", backgroundColor: "#007bff", color: "white", cursor: "pointer", fontWeight: "bold" },
};
