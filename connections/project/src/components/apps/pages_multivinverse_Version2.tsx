import React, { useState } from "react";
import VinVault from "./vinvault";
import MechaMechaVault from "./MechaMechaVault";
import DracVault from "./DracVault"; // <--- Add this import

const rooms = [
  { key: "vinvault", label: "S!lly SH!t VinVault™" },
  { key: "mechamecha", label: "MechaMecha Vault™" },
  { key: "dracvault", label: "Drac Vault™" }, // <--- Add Drac Vault tab
];

export default function MultiVinVerse() {
  const [activeRoom, setActiveRoom] = useState("vinvault");

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-yellow-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-fuchsia-700 drop-shadow">
        MultiVinVerse™ — Emotional Multiverse Hub
      </h1>
      <div className="flex gap-4 mb-8">
        {rooms.map(room => (
          <button
            key={room.key}
            onClick={() => setActiveRoom(room.key)}
            className={`px-4 py-2 rounded-full font-semibold ${activeRoom === room.key ? "bg-fuchsia-300 text-white" : "bg-white text-fuchsia-700 border border-fuchsia-300"}`}
          >
            {room.label}
          </button>
        ))}
      </div>
      <div className="w-full max-w-3xl">
        {activeRoom === "vinvault" && <VinVault />}
        {activeRoom === "mechamecha" && <MechaMechaVault />}
        {activeRoom === "dracvault" && <DracVault />} {/* <--- Drac Vault room */}
      </div>
    </div>
  );
}