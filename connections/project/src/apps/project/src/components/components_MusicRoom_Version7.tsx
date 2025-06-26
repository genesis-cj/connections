import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { Play, Pause, Heart, ListMusic } from "lucide-react";

// Ultimate Medley: Oldies, Anime, Ballad, OPM, R&B, Jazz, Carpenters, Bee Gees, Michael Bublé
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

  // Michael Bublé Jazz
  { id: 51, title: "Feeling Good", artist: "Michael Bublé", tag: "Jazz" },
  { id: 52, title: "Haven't Met You Yet", artist: "Michael Bublé", tag: "Jazz Pop" },
  { id: 53, title: "Sway", artist: "Michael Bublé", tag: "Jazz" },
  { id: 54, title: "Home", artist: "Michael Bublé", tag: "Ballad / Jazz" },
  { id: 55, title: "Save The Last Dance For Me", artist: "Michael Bublé", tag: "Jazz" },
  { id: 56, title: "Everything", artist: "Michael Bublé", tag: "Jazz Pop" },
  { id: 57, title: "Crazy Love", artist: "Michael Bublé", tag: "Jazz" },
  { id: 58, title: "It's a Beautiful Day", artist: "Michael Bublé", tag: "Jazz Pop" },
  { id: 59, title: "You'll Never Know", artist: "Michael Bublé", tag: "Jazz" },
  { id: 60, title: "Put Your Head on My Shoulder", artist: "Michael Bublé", tag: "Jazz" },

  // Carpenters
  { id: 61, title: "Close To You", artist: "Carpenters", tag: "Classic" },
  { id: 62, title: "Top of the World", artist: "Carpenters", tag: "Classic" },
  { id: 63, title: "We've Only Just Begun", artist: "Carpenters", tag: "Classic" },
  { id: 64, title: "Rainy Days and Mondays", artist: "Carpenters", tag: "Classic" },

  // Bee Gees
  { id: 65, title: "How Deep Is Your Love", artist: "Bee Gees", tag: "Classic/Disco" },
  { id: 66, title: "Too Much Heaven", artist: "Bee Gees", tag: "Classic/Disco" },
  { id: 67, title: "How Can You Mend a Broken Heart", artist: "Bee Gees", tag: "Classic/Disco" },
  { id: 68, title: "To Love Somebody", artist: "Bee Gees", tag: "Classic" },
  { id: 69, title: "More Than a Woman", artist: "Bee Gees", tag: "Disco" },
  { id: 70, title: "Words", artist: "Bee Gees", tag: "Classic" },
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
        Oldies, Anime, Ballad, OPM, R&amp;B, Jazz, Carpenters, Bee Gees, Michael Bublé — all the YESSSS!
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