import React from 'react';
import { Brain, MemoryStick, Cpu, Activity } from 'lucide-react';
import { useEmotionalContext } from '../context/EmotionalContext';

interface DesktopWidgetProps {
  type: 'emotional' | 'memory' | 'dna';
}

const DesktopWidget: React.FC<DesktopWidgetProps> = ({ type }) => {
  const { currentEmotion, emotionalIntensity, emotionalHistory } = useEmotionalContext();
  const memoryCount = emotionalHistory.length;
  const dnaActivity = 75 + Math.sin(Date.now() / 2000) * 15;

  const widgets = {
    emotional: {
      icon: Brain,
      title: 'Emotional State',
      value: currentEmotion,
      subtitle: `${emotionalIntensity}% intensity`,
      color: 'from-purple-500 to-blue-500',
    },
    memory: {
      icon: MemoryStick,
      title: 'Memory Layer',
      value: memoryCount?.toLocaleString() || '0',
      subtitle: 'memories stored',
      color: 'from-cyan-500 to-blue-500',
    },
    dna: {
      icon: Cpu,
      title: 'DNA Engine',
      value: `${Math.round(dnaActivity)}%`,
      subtitle: 'processing',
      color: 'from-green-500 to-teal-500',
    },
  };

  const widget = widgets[type];

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10 min-w-[200px]">
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-8 h-8 bg-gradient-to-br ${widget.color} rounded-lg flex items-center justify-center`}>
          <widget.icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-sm font-medium">{widget.title}</h3>
          <p className="text-gray-400 text-xs">{widget.subtitle}</p>
        </div>
      </div>
      <div className="text-white text-xl font-bold capitalize">
        {widget.value}
      </div>
      
      {type === 'emotional' && (
        <div className="mt-2">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className={`h-2 bg-gradient-to-r ${widget.color} rounded-full transition-all duration-500`}
              style={{ width: `${emotionalIntensity}%` }}
            />
          </div>
        </div>
      )}
      
      {type === 'dna' && (
        <div className="mt-2 flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-8 bg-gradient-to-t ${widget.color} rounded-full animate-pulse`}
              style={{ 
                animationDelay: `${i * 0.2}s`,
                height: `${20 + (dnaActivity / 5) * Math.random()}px`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopWidget;