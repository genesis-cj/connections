import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { Play, Pause, Heart, ListMusic } from "lucide-react";

// Medley of Oldies, Anime, Ballad, OPM, and R&B
const medleyPlaylist = [
  // Oldies
  { id: 1, title: "I Want to Hold Your Hand", artist: "The Beatles", decade: "60s" },
  { id: 2, title: "Dancing Queen", artist: "ABBA", decade: "70s" },
  // Anime
  { id: 11, title: "Voltes V no Uta (Theme Song)", artist: "Mitsuko Horie & Columbia Yurikago-kai", decade: "Anime" },
  { id: 16, title: "Kimi ga Suki da to Sakebitai (Slam Dunk OP)", artist: "BAAD", decade: "Anime" },
  // Ballad
  { id: 21, title: "All My Life", artist: "America", genre: "Ballad" },
  { id: 22, title: "Breathe Again", artist: "Toni Braxton", genre: "Ballad / R&B" },
  // OPM
  { id: 31, title: "Hanggang", artist: "Wency Cornejo", genre: "OPM Ballad" },
  { id: 32, title: "Kahit Maputi Na Ang Buhok Ko", artist: "Rey Valera", genre: "OPM Classic" },
  { id: 33, title: "Tadhana", artist: "Up Dharma Down", genre: "OPM" },
  { id: 34, title: "214", artist: "Rivermaya", genre: "OPM" },
  // R&B
  { id: 41, title: "Always Be My Baby", artist: "Mariah Carey", genre: "R&B" },
  { id: 42, title: "Water Runs Dry", artist: "Boyz II Men", genre: "R&B" },
  { id: 43, title: "Weak", artist: "SWV", genre: "R&B" },
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
        🎵 Music Room — Medley: Oldies, Anime, Ballad, OPM & R&B
      </h2>
      <p className="mb-4" style={{ color: "var(--secondary-text)" }}>
        All the feels: Old school, Anime, Ballad, OPM, and R&B classics!  
        <span className="italic">Powered by Genesis EI AI OS™</span>
      </p>
      <ul>
        {medleyPlaylist.map(song => (
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
            {song.decade && (
              <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-100 text-amber-700">{song.decade}</span>
            )}
            {song.genre && (
              <span className="ml-2 px-2 py-1 text-xs rounded bg-purple-100 text-violet-700">{song.genre}</span>
            )}
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
        More mood playlists coming soon!
      </div>
    </RoomCard>
  );
}