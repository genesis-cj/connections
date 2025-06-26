import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Shield, MessageSquare, Gamepad2, MemoryStick, Heart, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEmotionalContext } from '../context/EmotionalContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentEmotion, 
    emotionalIntensity, 
    emotionalLoad, 
    emotionalHistory,
    checkConnectionGap,
    checkCompassionateLoad,
    detectPatterns
  } = useEmotionalContext();

  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const apps = [
    {
      id: 'vinlore',
      name: 'VinLore AI™',
      description: 'Emotional Memory Vaults System',
      icon: Shield,
      color: 'from-blue-500 to-teal-500',
      path: '/vinlore'
    },
    {
      id: 'pulselink',
      name: 'PulseLink™',
      description: 'Emotional Translation Bridge',
      icon: MessageSquare,
      color: 'from-teal-500 to-green-500',
      path: '/pulselink'
    },
    {
      id: 'thinktank',
      name: 'ThinkTank AI™',
      description: 'Inner Debate Room',
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      path: '/thinktank'
    },
    {
      id: 'dumpcake',
      name: 'Dumpcake',
      description: 'Gamified Emotional Release',
      icon: Gamepad2,
      color: 'from-pink-500 to-purple-500',
      path: '/dumpcake'
    },
    {
      id: 'memory-layer',
      name: 'Memory Layer',
      description: 'Emotional Memory Processing',
      icon: MemoryStick,
      color: 'from-orange-500 to-red-500',
      path: '/memory-layer'
    }
  ];

  const connectionGap = checkConnectionGap();
  const compassionateLoad = checkCompassionateLoad();
  const patterns = detectPatterns();

  const getEmotionColor = () => {
    const colors = {
      happy: 'from-yellow-400 to-orange-400',
      sad: 'from-blue-400 to-indigo-400',
      angry: 'from-red-400 to-pink-400',
      anxious: 'from-purple-400 to-blue-400',
      calm: 'from-green-400 to-teal-400',
      confused: 'from-gray-400 to-slate-400',
      overwhelmed: 'from-red-500 to-orange-500'
    };
    return colors[currentEmotion as keyof typeof colors] || 'from-gray-400 to-slate-400';
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Genesis EI AI OS
        </h1>
        <p className="text-gray-300 text-lg">Your Emotional Intelligence Operating System</p>
      </div>

      {/* Emotional Status Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Emotional State */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${getEmotionColor()} rounded-full flex items-center justify-center`}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Current Emotion</h3>
              <p className="text-gray-400 text-sm">Real-time emotional state</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Emotion:</span>
              <span className="text-white font-medium capitalize">{currentEmotion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Intensity:</span>
              <span className="text-white font-medium">{emotionalIntensity}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 bg-gradient-to-r ${getEmotionColor()} rounded-full transition-all duration-500`}
                style={{ width: `${emotionalIntensity}%` }}
              />
            </div>
          </div>
        </div>

        {/* Emotional Load */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${emotionalLoad > 80 ? 'from-red-500 to-orange-500' : 'from-green-500 to-teal-500'} rounded-full flex items-center justify-center`}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Emotional Load</h3>
              <p className="text-gray-400 text-sm">System capacity monitoring</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Load Level:</span>
              <span className={`font-medium ${emotionalLoad > 80 ? 'text-red-400' : 'text-green-400'}`}>
                {emotionalLoad}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  emotionalLoad > 80 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                    : 'bg-gradient-to-r from-green-500 to-teal-500'
                }`}
                style={{ width: `${emotionalLoad}%` }}
              />
            </div>
            {emotionalLoad > 80 && (
              <div className="text-orange-400 text-sm">
                ⚠️ Consider emotional recovery mode
              </div>
            )}
          </div>
        </div>

        {/* Memory Insights */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Memory Insights</h3>
              <p className="text-gray-400 text-sm">Pattern recognition</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total Entries:</span>
              <span className="text-white font-medium">{emotionalHistory.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Patterns Found:</span>
              <span className="text-white font-medium">{patterns.length}</span>
            </div>
            <button
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              className="w-full mt-2 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
            >
              {showDiagnostics ? 'Hide' : 'Show'} Diagnostics
            </button>
          </div>
        </div>
      </div>

      {/* Diagnostic Alerts */}
      {showDiagnostics && (
        <div className="mb-8 space-y-4">
          {connectionGap && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">Connection Gap Detected</h4>
                  <p className="text-gray-300 text-sm">{connectionGap}</p>
                </div>
              </div>
            </div>
          )}
          
          {compassionateLoad && (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <h4 className="text-orange-400 font-semibold mb-1">Compassionate Load Alert</h4>
                  <p className="text-gray-300 text-sm">{compassionateLoad}</p>
                </div>
              </div>
            </div>
          )}

          {!connectionGap && !compassionateLoad && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-green-400 font-semibold mb-1">Emotional Systems Healthy</h4>
                  <p className="text-gray-300 text-sm">All core brain systems operating within normal parameters.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Application Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => navigate(app.path)}
            className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                <app.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold text-lg">{app.name}</h3>
                <p className="text-gray-400 text-sm">{app.description}</p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-gray-300 text-sm leading-relaxed">
                {app.id === 'vinlore' && 'Secure vaults for emotional memories, creative expressions, and deep healing work.'}
                {app.id === 'pulselink' && 'Bridge emotional communication gaps between different development levels.'}
                {app.id === 'thinktank' && 'Safe space for internal dialogue and cognitive processing.'}
                {app.id === 'dumpcake' && 'Transform emotional healing into engaging, sustainable progress.'}
                {app.id === 'memory-layer' && 'Process and integrate emotional memories using the E.C.C. Protocol.'}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
          <h4 className="text-white font-semibold mb-2">🌟 Your Emotional Sanctuary</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Genesis EI AI OS is designed as a safe space for emotional healing and growth.<br/>
            Every tool and interaction is crafted with therapeutic intention and compassionate understanding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;