import React from "react";

export default function RoomTabBar({ active, setActive, rooms }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
      {rooms.map(room => (
        <button
          key={room.key}
          onClick={() => setActive(room.key)}
          style={{
            background: active === room.key ? "var(--active-tab)" : "var(--inactive-tab)",
            color: "var(--primary-text)",
            border: `2px solid var(--border-accent)`,
            borderRadius: 32,
            fontWeight: 700,
            padding: "8px 20px",
            boxShadow: active === room.key ? "var(--room-shadow)" : "none",
            transition: "0.2s"
          }}
        >
          {room.label}
        </button>
      ))}
    </div>
  );
}