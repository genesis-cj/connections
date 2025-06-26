import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { Play, Pause, Heart, ListMusic } from "lucide-react";

// Oldies playlist: 60s, 70s, 80s, 90s medley
const oldiesPlaylist = [
  { id: 1, title: "I Want to Hold Your Hand", artist: "The Beatles", decade: "60s" },
  { id: 2, title: "Dancing Queen", artist: "ABBA", decade: "70s" },
  { id: 3, title: "Billie Jean", artist: "Michael Jackson", decade: "80s" },
  { id: 4, title: "Wannabe", artist: "Spice Girls", decade: "90s" },
  { id: 5, title: "Sweet Caroline", artist: "Neil Diamond", decade: "60s" },
  { id: 6, title: "Stayin' Alive", artist: "Bee Gees", decade: "70s" },
  { id: 7, title: "Take On Me", artist: "a-ha", decade: "80s" },
  { id: 8, title: "No Scrubs", artist: "TLC", decade: "90s" },
  { id: 9, title: "Respect", artist: "Aretha Franklin", decade: "60s" },
  { id: 10, title: "Superstition", artist: "Stevie Wonder", decade: "70s" },
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
        🎵 Music Room — Oldies Medley
      </h2>
      <p className="mb-4" style={{ color: "var(--secondary-text)" }}>
        Throwback medley: 60's, 70's, 80's, 90's!  
        <span className="italic">Powered by Genesis EI AI OS™</span>
      </p>
      <ul>
        {oldiesPlaylist.map(song => (
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
              title={playingId === song.id ? "Pause" : "Play"}
            >
              {playingId === song.id ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <span className="font-semibold">{song.title}</span>
            <span className="text-xs ml-2 text-gray-500">{song.artist}</span>
            <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-100 text-amber-700">{song.decade}</span>
            <button
              onClick={() => toggleFavorite(song.id)}
              style={{
                background: "none",
                border: "none",
                color: favorites.includes(song.id) ? "#ea580c" : "#bdbdbd",
                marginLeft: 10,
                cursor: "pointer"
              }}
              title={favorites.includes(song.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart fill={favorites.includes(song.id) ? "#ea580c" : "none"} size={18} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-xs text-gray-600 flex items-center gap-2">
        <ListMusic size={16} />
        More oldies and custom playlists — coming soon!
      </div>
    </RoomCard>
  );
}