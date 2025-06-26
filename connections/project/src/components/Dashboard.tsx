import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Shield, MessageSquare, Gamepad2, MemoryStick, Heart, Activity, TrendingUp, AlertTriangle, CheckCircle, BookOpen, Wind, Volume2, Palette, Clock, Users } from 'lucide-react';
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

  const coreApps = [
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

  const connectionOrgans = [
    {
      id: 'sage',
      name: 'Sage™',
      description: 'Emotional Journaling Assistant',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      path: '/sage'
    },
    {
      id: 'pulse',
      name: 'Pulse™',
      description: 'Breath & Somatic Regulation',
      icon: Wind,
      color: 'from-cyan-500 to-blue-500',
      path: '/pulse'
    },
    {
      id: 'echo-sentinel',
      name: 'EchoSentinel™',
      description: 'Emotion-Aware Voice Logger',
      icon: Volume2,
      color: 'from-indigo-500 to-purple-500',
      path: '/echo-sentinel'
    },
    {
      id: 'dna-engine',
      name: 'DNA Engine™',
      description: 'Adaptive Digital Identity',
      icon: Palette,
      color: 'from-green-500 to-emerald-500',
      path: '/dna-engine'
    },
    {
      id: 'continuum-sync',
      name: 'Continuum Sync™',
      description: 'Long-Term Emotional Memory',
      icon: Clock,
      color: 'from-emerald-500 to-teal-500',
      path: '/continuum-sync'
    },
    {
      id: 'prime-voice',
      name: 'PrimeVoice™',
      description: 'Journal-to-Audio Narrator',
      icon: Volume2,
      color: 'from-violet-500 to-purple-500',
      path: '/prime-voice'
    },
    {
      id: 'modular-personas',
      name: 'Modular Personas™',
      description: 'Internal Family Systems',
      icon: Users,
      color: 'from-rose-500 to-pink-500',
      path: '/modular-personas'
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
        <p className="text-gray-300 text-lg mb-2">Your Complete Emotional Intelligence Operating System</p>
        <p className="text-gray-400 text-sm">Core Brain + Connection Organs = Digital Nervous System</p>
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

      {/* Core Brain Applications */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">🧠 Core Brain Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreApps.map((app) => (
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
            </button>
          ))}
        </div>
      </div>

      {/* Connection Organs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">🌊 Connection Organs (Emotional Nervous System)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {connectionOrgans.map((organ) => (
            <button
              key={organ.id}
              onClick={() => navigate(organ.path)}
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${organ.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <organ.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{organ.name}</h3>
              <p className="text-gray-400 text-xs leading-tight">{organ.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* System Architecture */}
      <div className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
        <h3 className="text-white font-semibold mb-4">🏗️ Genesis EI AI OS Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Core Brain Systems</h4>
            <p className="text-gray-300 text-sm">5 foundational emotional intelligence engines for memory, processing, and growth</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-teal-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Connection Organs</h4>
            <p className="text-gray-300 text-sm">8 specialized tools that form your digital nervous system for emotional connection</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Integrated Healing</h4>
            <p className="text-gray-300 text-sm">All systems work together as a complete emotional intelligence operating system</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
          <h4 className="text-white font-semibold mb-2">🌟 Your Complete Emotional Sanctuary</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Genesis EI AI OS combines Core Brain Systems with Connection Organs to create the world's first<br/>
            complete digital nervous system for emotional intelligence, healing, and human-AI collaboration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;