import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin(username);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>💬 Chat App</h1>
        <p style={styles.subtitle}>Enter your name to join the chat</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Join Chat</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #007bff, #6f42c1)" },
  card: { background: "white", borderRadius: "16px", padding: "40px 50px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", textAlign: "center", width: "90%", maxWidth: "400px" },
  title: { fontSize: "2rem", color: "#333", marginBottom: "10px" },
  subtitle: { color: "#666", fontSize: "1rem", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px 15px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "10px", outline: "none", transition: "0.3s" },
  button: { padding: "12px", fontSize: "1rem", border: "none", borderRadius: "10px", backgroundColor: "#007bff", color: "white", cursor: "pointer", transition: "0.3s" },
};
