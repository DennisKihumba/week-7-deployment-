import React, { useState, useEffect } from "react";
import { socket } from "../socket";

export default function MessageInput({ onSend, online = [] }) {
  const [text, setText] = useState("");
  const [to, setTo] = useState(""); // for private messages

  useEffect(() => {
    // emit typing events
    if (!text) return;
    const id = setTimeout(() => {}, 0);
    return () => clearTimeout(id);
  }, [text]);

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim(), to || undefined);
    setText("");
    // also tell server that message was read/delivered by emit ack in server
  }

  function handleTyping() {
    socket.emit("typing", {});
  }

  return (
    <form onSubmit={handleSend} style={{ marginTop: 8 }}>
      <div>
        <select value={to} onChange={e => setTo(e.target.value)}>
          <option value="">Global</option>
          {online.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleTyping}
        placeholder="Message..."
        style={{ width: "60%" }}
      />
      <button type="submit">Send</button>
    </form>
  );
}
