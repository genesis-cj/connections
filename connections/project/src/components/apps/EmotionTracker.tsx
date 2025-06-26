import React, { useState } from 'react';
import { Heart, Plus, Calendar, TrendingUp, BarChart3, Clock } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

const EmotionTracker: React.FC = () => {
  const { currentEmotion, emotionalIntensity, addEmotionalEntry } = useEmotionalContext();
  const [selectedEmotion, setSelectedEmotion] = useState(currentEmotion);
  const [intensity, setIntensity] = useState(emotionalIntensity);
  const [note, setNote] = useState('');

  const emotions = [
    { name: 'joy', emoji: '😊', color: 'from-yellow-400 to-orange-400' },
    { name: 'calm', emoji: '😌', color: 'from-blue-400 to-cyan-400' },
    { name: 'focus', emoji: '🎯', color: 'from-purple-400 to-indigo-400' },
    { name: 'energy', emoji: '⚡', color: 'from-green-400 to-teal-400' },
    { name: 'stress', emoji: '😰', color: 'from-red-400 to-pink-400' },
    { name: 'excited', emoji: '🤩', color: 'from-pink-400 to-purple-400' },
    { name: 'peaceful', emoji: '🕊️', color: 'from-cyan-400 to-blue-400' },
    { name: 'motivated', emoji: '💪', color: 'from-orange-400 to-red-400' },
  ];

  const handleSaveEmotion = () => {
    addEmotionalEntry(selectedEmotion, intensity, note);
    setNote('');
  };

  const weeklyData = [
    { day: 'Mon', joy: 65, calm: 78, focus: 82, energy: 71, stress: 23 },
    { day: 'Tue', joy: 72, calm: 85, focus: 76, energy: 68, stress: 31 },
    { day: 'Wed', joy: 81, calm: 72, focus: 89, energy: 85, stress: 18 },
    { day: 'Thu', joy: 58, calm: 91, focus: 67, energy: 72, stress: 45 },
    { day: 'Fri', joy: 89, calm: 68, focus: 78, energy: 92, stress: 12 },
    { day: 'Sat', joy: 95, calm: 88, focus: 45, energy: 78, stress: 8 },
    { day: 'Sun', joy: 76, calm: 94, focus: 52, energy: 65, stress: 15 },
  ];

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Emotion Tracker</h2>
        <p className="text-gray-400">Track and analyze your emotional patterns over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emotion Input */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white text-lg font-semibold mb-4">Log Current Emotion</h3>
          
          {/* Emotion Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`p-4 rounded-xl transition-all ${
                  selectedEmotion === emotion.name
                    ? `bg-gradient-to-br ${emotion.color} bg-opacity-20 ring-2 ring-white/50`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-2xl mb-2">{emotion.emoji}</div>
                <div className="text-white text-sm font-medium capitalize">{emotion.name}</div>
              </button>
            ))}
          </div>

          {/* Intensity Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-sm">Intensity Level</label>
              <span className="text-white font-medium">{intensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Add a note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What triggered this emotion?"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
            />
          </div>

          <button
            onClick={handleSaveEmotion}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Save Emotion</span>
          </button>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-lg font-semibold">Weekly Emotional Patterns</h3>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">This Week</span>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6">
            <div className="flex items-end justify-between h-48 bg-black/20 rounded-lg p-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex flex-col items-center space-y-2">
                  <div className="flex flex-col items-center space-y-1 h-32">
                    {['joy', 'calm', 'focus', 'energy', 'stress'].map((emotion, index) => {
                      const height = (day[emotion as keyof typeof day] as number) / 100 * 120;
                      const emotionData = emotions.find(e => e.name === emotion);
                      return (
                        <div
                          key={emotion}
                          className={`w-6 bg-gradient-to-t ${emotionData?.color} rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                          style={{ height: `${height}px` }}
                          title={`${emotion}: ${day[emotion as keyof typeof day]}%`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-gray-400 text-sm">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">Average Joy</span>
              </div>
              <div className="text-white text-xl font-bold">76%</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Peak Calm</span>
              </div>
              <div className="text-white text-xl font-bold">94%</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Best Focus</span>
              </div>
              <div className="text-white text-xl font-bold">89%</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-gray-400 text-sm">Stress Level</span>
              </div>
              <div className="text-white text-xl font-bold">22%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionTracker;