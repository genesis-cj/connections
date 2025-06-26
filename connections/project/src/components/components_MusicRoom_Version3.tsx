import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { Play, Pause, Heart, ListMusic } from "lucide-react";

// Oldies & Anime playlist: 60s-90s + Anime Medley (Voltes V, Ghost Fighter, Slam Dunk)
const medleyPlaylist = [
  // Oldies (keep your previous entries if you want)
  { id: 1, title: "I Want to Hold Your Hand", artist: "The Beatles", decade: "60s" },
  { id: 2, title: "Dancing Queen", artist: "ABBA", decade: "70s" },
  { id: 3, title: "Billie Jean", artist: "Michael Jackson", decade: "80s" },
  { id: 4, title: "Wannabe", artist: "Spice Girls", decade: "90s" },
  // Anime section
  { id: 11, title: "Voltes V no Uta (Theme Song)", artist: "Mitsuko Horie & Columbia Yurikago-kai", decade: "Anime" },
  { id: 12, title: "Voltes V Ending - Chichi wo Motomete", artist: "Kumiko Osugi", decade: "Anime" },
  { id: 13, title: "Moonlight Densetsu", artist: "DALI (Sailor Moon)", decade: "Anime" },
  { id: 14, title: "Hohoemi no Bakudan (Yu Yu Hakusho OP)", artist: "Matsuko Mawatari", decade: "Anime" },
  { id: 15, title: "Unbalance na Kiss wo Shite (Yu Yu Hakusho ED)", artist: "Hiro Takahashi", decade: "Anime" },
  { id: 16, title: "Kimi ga Suki da to Sakebitai (Slam Dunk OP)", artist: "BAAD", decade: "Anime" },
  { id: 17, title: "Zettai ni Daremo (Slam Dunk OP 2)", artist: "ZYYG", decade: "Anime" },
  { id: 18, title: "Sekai ga Owaru made wa (Slam Dunk ED)", artist: "WANDS", decade: "Anime" },
  { id: 19, title: "Anata Dake Mitsumeteru (Slam Dunk ED 1)", artist: "Maki Ohguro", decade: "Anime" },
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
        🎵 Music Room — Oldies & Anime Medley
      </h2>
      <p className="mb-4" style={{ color: "var(--secondary-text)" }}>
        Throwback medley: 60's, 70's, 80's, 90's + Classic Anime themes (Voltes V, Ghost Fighter, Slam Dunk)!  
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
        More medleys and custom playlists — coming soon!
      </div>
    </RoomCard>
  );
}