import React from 'react';
import { Brain, Cpu, Shield, MemoryStick, Activity, Settings, Grid3x3, Zap, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useEmotionalContext } from '../context/EmotionalContext';

interface TaskbarProps {
  onOpenLauncher: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onOpenLauncher }) => {
  const { openWindows, activeWindow, openWindow, focusWindow } = useAppContext();
  const { currentEmotion, emotionalIntensity } = useEmotionalContext();

  const quickApps = [
    { id: 'ei-dashboard', icon: Brain, name: 'EI Dashboard', color: 'from-purple-500 to-blue-500' },
    { id: 'dna-engine', icon: Cpu, name: 'DNA Engine', color: 'from-green-500 to-teal-500' },
    { id: 'vinlore-vault', icon: Shield, name: 'VinLore™ Memory Vaults', color: 'from-orange-500 to-red-500' },
    { id: 'memory-layer', icon: MemoryStick, name: 'Memory Layer', color: 'from-cyan-500 to-blue-500' },
    { id: 'neural-monitor', icon: Activity, name: 'Neural Monitor', color: 'from-pink-500 to-purple-500' },
  ];

  const getEmotionColor = () => {
    const colors = {
      joy: 'from-yellow-400 to-orange-400',
      calm: 'from-blue-400 to-cyan-400',
      focus: 'from-purple-400 to-indigo-400',
      energy: 'from-green-400 to-teal-400',
      stress: 'from-red-400 to-pink-400',
    };
    return colors[currentEmotion as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-xl border-t border-white/10 flex items-center px-4 z-50">
      {/* System Button */}
      <button
        onClick={onOpenLauncher}
        className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl hover:scale-110 transition-transform shadow-lg"
      >
        <Grid3x3 className="w-5 h-5 text-white" />
      </button>

      {/* Quick Apps */}
      <div className="flex items-center space-x-2 ml-4">
        {quickApps.map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id, app.name)}
            className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${app.color} rounded-lg hover:scale-110 transition-transform shadow-lg ${
              openWindows.some(w => w.id === app.id) ? 'ring-2 ring-white/50' : ''
            }`}
            title={app.name}
          >
            <app.icon className="w-5 h-5 text-white" />
          </button>
        ))}
      </div>

      {/* Open Windows */}
      <div className="flex items-center space-x-2 ml-6">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            className={`px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all ${
              activeWindow === window.id ? 'bg-white/20 ring-1 ring-purple-400' : ''
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Status */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Built with Bolt.new Badge */}
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-1 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
        >
          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded flex items-center justify-center">
            <Zap className="w-2 h-2 text-white" />
          </div>
          <span className="text-blue-300 text-xs font-medium">Built with Bolt.new</span>
          <ExternalLink className="w-2 h-2 text-blue-300 group-hover:text-blue-200 transition-colors" />
        </a>

        {/* Emotional State */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getEmotionColor()}`} style={{
            opacity: emotionalIntensity / 100
          }}></div>
          <span className="text-gray-300 text-sm capitalize">{currentEmotion}</span>
        </div>

        {/* System Time */}
        <div className="text-gray-300 text-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Settings */}
        <button className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
          <Settings className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Taskbar;