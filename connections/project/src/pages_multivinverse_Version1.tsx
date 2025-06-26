import React, { useState } from "react";
import VinVault from "./vinvault"; // adjust path if needed
// import VinLore from "./vinlore"; // future: your legacy/lore vault
// import OtherVault from "./other-vault"; // add more as you grow

const rooms = [
  { key: "vinvault", label: "S!lly SH!t VinVault™" },
  // { key: "vinlore", label: "VinLore™ Legacy Capsule" },
  // { key: "othervault", label: "Other Vault" },
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
        {/* {activeRoom === "vinlore" && <VinLore />} */}
        {/* Add more rooms as you invent them */}
      </div>
    </div>
  );
}