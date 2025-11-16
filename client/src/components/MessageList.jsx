import React from "react";

export default function MessageList({ messages = [] }) {
  return (
    <div style={{ height: 400, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
      {messages.map(m => (
        <div key={m.id} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: "#666" }}>
            <strong>{m.from}</strong> <span> {new Date(m.ts).toLocaleTimeString()}</span>
            {m.to && m.to !== "global" && <em> → {m.to}</em>}
          </div>
          <div>{m.text}</div>
        </div>
      ))}
    </div>
  );
}
