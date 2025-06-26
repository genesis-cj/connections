import React, { useState } from "react";
import RoomCard from "./RoomCard";
import { PlayCircle, Bookmark, Film } from "lucide-react";

const sampleVideos = [
  {
    id: 1,
    title: "Epic Anime Transformation",
    src: "https://www.youtube.com/embed/oq6hUyvqWRQ",
    tag: "Nostalgia"
  },
  {
    id: 2,
    title: "Cute Animal Compilation",
    src: "https://www.youtube.com/embed/6uXQxRZ3Kvw",
    tag: "Mood Booster"
  },
  {
    id: 3,
    title: "Mecha Fails",
    src: "https://www.youtube.com/embed/0e3GPea1Tyg",
    tag: "Laugh Therapy"
  }
];

export default function VideoRoom() {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const toggleBookmark = (id: number) =>
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );

  return (
    <RoomCard>
      <h2 style={{ color: "var(--primary-text)" }} className="text-2xl font-bold mb-3">
        🎬 Video Room
      </h2>
      <p className="mb-4" style={{ color: "var(--secondary-text)" }}>
        Watch, laugh, cry, repeat.  
        <span className="italic">Powered by Genesis EI AI OS™</span>
      </p>
      <div className="grid gap-5">
        {sampleVideos.map(video => (
          <div key={video.id} className="rounded-lg overflow-hidden border border-yellow-200 bg-white p-3 flex flex-col">
            <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={video.src}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0, left: 0, width: "100%", height: "100%", border: "none"
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="font-semibold">{video.title}</span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-amber-700">{video.tag}</span>
              </div>
              <button
                onClick={() => toggleBookmark(video.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: bookmarked.includes(video.id) ? "#fbbf24" : "#bdbdbd",
                  cursor: "pointer"
                }}
                title={bookmarked.includes(video.id) ? "Remove Bookmark" : "Bookmark"}
              >
                <Bookmark fill={bookmarked.includes(video.id) ? "#fbbf24" : "none"} size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs text-gray-600 flex items-center gap-2">
        <Film size={16} />
        Add your favorite videos — coming soon!
      </div>
    </RoomCard>
  );
}