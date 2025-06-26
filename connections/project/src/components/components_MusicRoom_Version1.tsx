import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { Play, Pause, Heart, ListMusic } from "lucide-react";

const samplePlaylist = [
  { id: 1, title: "Voltes V Anime Theme", artist: "Childhood Heroes" },
  { id: 2, title: "Lo-fi Chill for Healing", artist: "Lo-Fi Beats" },
  { id: 3, title: "Senti Bop", artist: "Sadboi Supreme" },
];

export default function MusicRoom() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const togglePlay = (id: number) => setPlayingId(playingId === id ? null : id);
  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );

  return (
    <RoomCard>
      <h2 style={{ color: "var(--primary-text)" }} className="text-2xl font-bold mb-3">
        🎵 Music Room
      </h2>
      <p className="mb-4" style={{ color: "var(--secondary-text)" }}>
        Drop your soundtracks for healing, nostalgia, or hype.  
        <span className="italic">Powered by Genesis EI AI OS™</span>
      </p>
      <ul>
        {samplePlaylist.map(song => (
          <li key={song.id} className="mb-3 flex items-center gap-3">
            <button
              onClick={() => togglePlay(song.id)}
              style={{
                background: "var(--button-bg)",
                color: "var(--button-text)",
                border: "none",
                borderRadius: 8,
                padding: "8px 12px",
                marginRight: 10,
                cursor: "pointer"
              }}
            >
              {playingId === song.id ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <span className="font-semibold">{song.title}</span>
            <span className="text-xs ml-2 text-gray-500">{song.artist}</span>
            <button
              onClick={() => toggleFavorite(song.id)}
              style={{
                background: "none",
                border: "none",
                color: favorites.includes(song.id) ? "#ea580c" : "#bdbdbd",
                marginLeft: 10,
                cursor: "pointer"
              }}
            >
              <Heart fill={favorites.includes(song.id) ? "#ea580c" : "none"} size={18} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-xs text-gray-600 flex items-center gap-2">
        <ListMusic size={16} />
        Share your own playlist — coming soon!
      </div>
    </RoomCard>
  );
}