import React from "react";

export default function RoomCard({ children }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      border: "1px solid var(--border-accent)",
      borderRadius: 18,
      padding: 24,
      boxShadow: "var(--room-shadow)",
      marginBottom: 24
    }}>
      {children}
    </div>
  );
}