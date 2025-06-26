import React from 'react';
import { X, Brain, Cpu, Shield, MemoryStick, Activity, Heart, Zap, Target, Compass, Book, Calendar, MessageSquare, Camera, Music, Gamepad2, Calculator, FileText, Globe, Mail, CloudRain, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AppLauncherProps {
  onClose: () => void;
}

const AppLauncher: React.FC<AppLauncherProps> = ({ onClose }) => {
  const { openWindow } = useAppContext();

  const apps = [
    // Core EI System
    { id: 'ei-dashboard', name: 'EI Dashboard', icon: Brain, color: 'from-purple-500 to-blue-500', category: 'Core' },
    { id: 'dna-engine', name: 'DNA Engine', icon: Cpu, color: 'from-green-500 to-teal-500', category: 'Core' },
    { id: 'vinlore-vault', name: 'VinLore™ Memory Vaults', icon: Shield, color: 'from-orange-500 to-red-500', category: 'Core' },
    { id: 'memory-layer', name: 'Memory Layer', icon: MemoryStick, color: 'from-cyan-500 to-blue-500', category: 'Core' },
    { id: 'neural-monitor', name: 'Neural Monitor', icon: Activity, color: 'from-pink-500 to-purple-500', category: 'Core' },
    { id: 'continuum-marketplace', name: 'CONTINUUM SYNC Marketplace', icon: ShoppingCart, color: 'from-yellow-500 to-orange-500', category: 'Core' },
    
    // Wellness Tools
    { id: 'emotion-tracker', name: 'Emotion Tracker', icon: Heart, color: 'from-red-400 to-pink-400', category: 'Wellness' },
    { id: 'energy-optimizer', name: 'Energy Optimizer', icon: Zap, color: 'from-yellow-400 to-orange-400', category: 'Wellness' },
    { id: 'focus-enhancer', name: 'Focus Enhancer', icon: Target, color: 'from-indigo-400 to-purple-400', category: 'Wellness' },
    { id: 'mindfulness-guide', name: 'Mindfulness Guide', icon: Compass, color: 'from-green-400 to-emerald-400', category: 'Wellness' },
    { id: 'mood-journal', name: 'Mood Journal', icon: Book, color: 'from-amber-400 to-yellow-400', category: 'Wellness' },
    
    // Productivity Tools
    { id: 'neural-calendar', name: 'Neural Calendar', icon: Calendar, color: 'from-blue-400 to-cyan-400', category: 'Productivity' },
    { id: 'smart-chat', name: 'Smart Chat', icon: MessageSquare, color: 'from-teal-400 to-green-400', category: 'Productivity' },
    { id: 'memory-capture', name: 'Memory Capture', icon: Camera, color: 'from-purple-400 to-pink-400', category: 'Productivity' },
    { id: 'neural-notes', name: 'Neural Notes', icon: FileText, color: 'from-slate-400 to-gray-400', category: 'Productivity' },
    { id: 'web-portal', name: 'Web Portal', icon: Globe, color: 'from-sky-400 to-blue-400', category: 'Productivity' },
    { id: 'neural-mail', name: 'Neural Mail', icon: Mail, color: 'from-emerald-400 to-teal-400', category: 'Productivity' },
    
    // Entertainment
    { id: 'emotion-music', name: 'Emotion Music', icon: Music, color: 'from-violet-400 to-indigo-400', category: 'Entertainment' },
    { id: 'neural-games', name: 'Neural Games', icon: Gamepad2, color: 'from-rose-400 to-red-400', category: 'Entertainment' },
    { id: 'mood-weather', name: 'Mood Weather', icon: CloudRain, color: 'from-cyan-400 to-teal-400', category: 'Entertainment' },
    
    // Utilities
    { id: 'neural-calc', name: 'Neural Calculator', icon: Calculator, color: 'from-gray-400 to-slate-400', category: 'Utilities' },
  ];

  const categories = ['Core', 'Wellness', 'Productivity', 'Entertainment', 'Utilities'];

  const handleAppClick = (app: typeof apps[0]) => {
    openWindow(app.id, app.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 max-w-6xl w-full mx-8 max-h-[80vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Neural Applications</h2>
            <p className="text-gray-400">Select an application to launch</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Apps Grid */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {apps
                  .filter((app) => app.category === category)
                  .map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app)}
                      className="group flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        <app.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium text-center leading-tight">
                        {app.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;