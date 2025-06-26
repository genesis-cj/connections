import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ghost, Trash2, Star, Volume2 } from "lucide-react";

const dracEntries = [
  {
    id: 1,
    title: "Centaur Thirst Trap",
    description: "A photo you swore you’d delete, now immortalized for comedy.",
    tag: "🪴 #CentaurCringe",
  },
  {
    id: 2,
    title: "Softrates Foot Meme",
    description: "The meme that ruined both feet and philosophy forever.",
    tag: "🦶 #Softrates",
  },
  {
    id: 3,
    title: "Drac na Tumae Folder",
    description: "Encrypted for your own protection. Do not open while eating.",
    tag: "🐉💩 #DracNaTumae",
  },
  {
    id: 4,
    title: "Xerxes Chat Screenshot",
    description: "Bot ghosted after asking your star sign. Ouch.",
    tag: "👻 #GhostedByCode",
  },
];

export default function DracVault() {
  const [actions, setActions] = useState({});

  const handleAction = (id, action) => {
    setActions((prev) => ({
      ...prev,
      [id]: action,
    }));
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h1 className="text-3xl font-bold text-center col-span-full mb-6 text-amber-700 drop-shadow">
        THE DRAC VAULT™: A Mythological Emotional Sh!tshow
      </h1>
      <p className="text-center col-span-full italic mb-2">{"\"Because sometimes, healing stinks before it shines.\""}</p>
      {dracEntries.map((entry) => (
        <Card key={entry.id} className="bg-orange-50 border-amber-300 rounded-xl shadow-lg">
          <CardContent className="p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-amber-800">{entry.title}</h2>
            <p className="text-gray-700">{entry.description}</p>
            <span className="text-xs text-orange-400">{entry.tag}</span>
            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => handleAction(entry.id, "immortalize")}
                className={`flex items-center gap-1 ${actions[entry.id] === "immortalize" ? "bg-yellow-200" : ""}`}
                variant="outline"
              >
                <Star className="w-4 h-4" /> Immortalize
              </Button>
              <Button
                onClick={() => handleAction(entry.id, "flush")}
                className={`flex items-center gap-1 ${actions[entry.id] === "flush" ? "bg-pink-200" : ""}`}
                variant="outline"
              >
                <Ghost className="w-4 h-4" /> Ghostflush™
              </Button>
              <Button
                onClick={() => handleAction(entry.id, "delete")}
                className={`flex items-center gap-1 ${actions[entry.id] === "delete" ? "bg-red-200" : ""}`}
                variant="outline"
              >
                <Trash2 className="w-4 h-4" /> Sweep.ai™
              </Button>
              <Button
                onClick={() => alert("PrimeVoice: *Narrates your memory shame in epic Greek chorus*")}
                className="flex items-center gap-1"
                variant="outline"
              >
                <Volume2 className="w-4 h-4" /> PrimeVoice™
              </Button>
            </div>
            {actions[entry.id] && (
              <div className="mt-2 text-xs text-amber-700">
                {actions[entry.id] === "immortalize" && "✨ Immortalized for future generations of cringe."}
                {actions[entry.id] === "flush" && "🧻 Ghostflushed! Emotional residue detected: none."}
                {actions[entry.id] === "delete" && "🗑️ Swept away forever. Regret conversion: Drac na Tumae issued."}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <div className="col-span-full mt-8 text-center text-amber-600 font-semibold">
        Voltes V anime theme playing... <span role="img" aria-label="music">🎵</span>
      </div>
    </div>
  );
}