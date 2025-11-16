import React, { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <div style={styles.appContainer}>
      <div style={styles.card}>
        {!user ? <Login onLogin={setUser} /> : <Chat user={user} onLogout={handleLogout} />}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #007bff, #6f42c1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center",
  },
};
