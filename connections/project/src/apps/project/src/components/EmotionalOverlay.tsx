import React from 'react';
import { useEmotionalContext } from '../context/EmotionalContext';

const EmotionalOverlay: React.FC = () => {
  const { currentEmotion, emotionalIntensity } = useEmotionalContext();

  const getEmotionConfig = () => {
    const configs = {
      joy: { color: 'from-yellow-400/20 to-orange-400/20', particles: '🌟' },
      calm: { color: 'from-blue-400/20 to-cyan-400/20', particles: '💧' },
      focus: { color: 'from-purple-400/20 to-indigo-400/20', particles: '⚡' },
      energy: { color: 'from-green-400/20 to-teal-400/20', particles: '✨' },
      stress: { color: 'from-red-400/20 to-pink-400/20', particles: '🔥' },
    };
    return configs[currentEmotion as keyof typeof configs] || configs.calm;
  };

  const config = getEmotionConfig();

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Emotional Color Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${config.color} transition-all duration-1000`}
        style={{ opacity: emotionalIntensity / 200 }}
      />
      
      {/* Floating Particles */}
      {Array.from({ length: Math.floor(emotionalIntensity / 20) }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {config.particles}
        </div>
      ))}
    </div>
  );
};

export default EmotionalOverlay;