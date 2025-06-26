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
  {
    id: 4,
    title: 'Xerxes Kilay 2000™',
    content: 'An ancient meme-tech fusion believed to power eyebrow-based time travel. 🚀🕰️😆',
  },
];

export default function SillyShitVault() {
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
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-red-600 drop-shadow-lg animate-pulse">
          🎺 VOLTES V VAULT INITIATED 🎺
        </h1>
        <p className="text-lg text-gray-700 italic mt-2">
          "One vault, five entries. Powered by kilay, nose, dragons, and memes."
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sillyEntries.map(entry => (
          <Card key={entry.id} className="bg-pink-100 shadow-md rounded-2xl">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-pink-700">{entry.title}</h2>
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
    </div>
  );
}
