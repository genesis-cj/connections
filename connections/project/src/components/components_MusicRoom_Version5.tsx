import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { Play, Pause, Heart, ListMusic } from "lucide-react";

// Ultimate Medley: Oldies, Anime, Ballad, OPM, R&B
const medleyPlaylist = [
  // Oldies
  { id: 1, title: "I Want to Hold Your Hand", artist: "The Beatles", tag: "60s" },
  { id: 2, title: "Dancing Queen", artist: "ABBA", tag: "70s" },
  { id: 3, title: "Billie Jean", artist: "Michael Jackson", tag: "80s" },
  { id: 4, title: "Wannabe", artist: "Spice Girls", tag: "90s" },
  { id: 5, title: "Sweet Caroline", artist: "Neil Diamond", tag: "60s" },
  { id: 6, title: "Stayin' Alive", artist: "Bee Gees", tag: "70s" },
  { id: 7, title: "Take On Me", artist: "a-ha", tag: "80s" },
  { id: 8, title: "No Scrubs", artist: "TLC", tag: "90s" },
  { id: 9, title: "Respect", artist: "Aretha Franklin", tag: "60s" },
  { id: 10, title: "Superstition", artist: "Stevie Wonder", tag: "70s" },

  // Anime
  { id: 11, title: "Voltes V no Uta (Theme Song)", artist: "Mitsuko Horie & Columbia Yurikago-kai", tag: "Anime" },
  { id: 12, title: "Voltes V Ending - Chichi wo Motomete", artist: "Kumiko Osugi", tag: "Anime" },
  { id: 13, title: "Moonlight Densetsu", artist: "DALI (Sailor Moon)", tag: "Anime" },
  { id: 14, title: "Hohoemi no Bakudan (Yu Yu Hakusho OP)", artist: "Matsuko Mawatari", tag: "Anime" },
  { id: 15, title: "Unbalance na Kiss wo Shite (Yu Yu Hakusho ED)", artist: "Hiro Takahashi", tag: "Anime" },
  { id: 16, title: "Kimi ga Suki da to Sakebitai (Slam Dunk OP)", artist: "BAAD", tag: "Anime" },
  { id: 17, title: "Zettai ni Daremo (Slam Dunk OP 2)", artist: "ZYYG", tag: "Anime" },
  { id: 18, title: "Sekai ga Owaru made wa (Slam Dunk ED)", artist: "WANDS", tag: "Anime" },
  { id: 19, title: "Anata Dake Mitsumeteru (Slam Dunk ED 1)", artist: "Maki Ohguro", tag: "Anime" },

  // Ballad
  { id: 21, title: "All My Life", artist: "America", tag: "Ballad" },
  { id: 22, title: "Breathe Again", artist: "Toni Braxton", tag: "Ballad / R&B" },

  // OPM
  { id: 31, title: "Hanggang", artist: "Wency Cornejo", tag: "OPM Ballad" },
  { id: 32, title: "Kahit Maputi Na Ang Buhok Ko", artist: "Rey Valera", tag: "OPM Classic" },
  { id: 33, title: "Tadhana", artist: "Up Dharma Down", tag: "OPM" },
  { id: 34, title: "214", artist: "Rivermaya", tag: "OPM" },

  // R&B
  { id: 41, title: "Always Be My Baby", artist: "Mariah Carey", tag: "R&B" },
  { id: 42, title: "Water Runs Dry", artist: "Boyz II Men", tag: "R&B" },
  { id: 43, title: "Weak", artist: "SWV", tag: "R&B" },
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
        🎵 Music Room — The Ultimate Medley
      </h2>
      <p className="mb-4" style={{ color: "var(--secondary-text)" }}>
        Oldies, Anime, Ballad, OPM, R&amp;B — all the YESSSS!
        <span className="italic"> Powered by Genesis EI AI OS™</span>
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
            <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-100 text-amber-700">{song.tag}</span>
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