import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Laugh, ThumbsUp } from 'lucide-react';

const sillyEntries = [
  {
    id: 1,
    title: 'Centaur Screenshot',
    content: 'A majestic half-horse, half-screenshot moment from a meme war.',
  },
  {
    id: 2,
    title: 'Drac na Tumae',
    content: 'The legendary vault of unspeakable emotional release. 🔥🐉💩',
  },
  {
    id: 3,
    title: 'Totyang Entry',
    content: 'Dedicated to the unsung nose heroes. Functional, unfabulous, unforgettable.',
  },
];

export default function VinVault() {
  const [likes, setLikes] = useState({});

  const handleReaction = (id, type) => {
    setLikes(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [type]: ((prev[id]?.[type] || 0) + 1),
      }
    }));
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h1 className="text-3xl font-bold text-center col-span-full mb-6 text-fuchsia-700 drop-shadow">S!lly SH!t VinVault™</h1>
      {sillyEntries.map(entry => (
        <Card key={entry.id} className="bg-fuchsia-100 shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-fuchsia-700">{entry.title}</h2>
            <p className="text-gray-700 mt-2 mb-4">{entry.content}</p>
            <div className="flex gap-3">
              <Button onClick={() => handleReaction(entry.id, 'like')} className="flex gap-1 text-red-600">
                <Heart className="w-4 h-4" /> {likes[entry.id]?.like || 0}
              </Button>
              <Button onClick={() => handleReaction(entry.id, 'laugh')} className="flex gap-1 text-yellow-600">
                <Laugh className="w-4 h-4" /> {likes[entry.id]?.laugh || 0}
              </Button>
              <Button onClick={() => handleReaction(entry.id, 'wow')} className="flex gap-1 text-blue-600">
                <ThumbsUp className="w-4 h-4" /> {likes[entry.id]?.wow || 0}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}