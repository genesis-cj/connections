import React, { useState, useEffect } from 'react';
import { Activity, Brain, Zap, Heart, Gauge, TrendingUp, AlertTriangle } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

const NeuralMonitor: React.FC = () => {
  const { currentEmotion, emotionalIntensity } = useEmotionalContext();
  const [heartRate, setHeartRate] = useState(72);
  const [brainActivity, setBrainActivity] = useState(85);
  const [stressLevel, setStressLevel] = useState(23);
  const [energyLevel, setEnergyLevel] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => prev + (Math.random() - 0.5) * 4);
      setBrainActivity(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setStressLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      setEnergyLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 6)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const vitalSigns = [
    { label: 'Heart Rate', value: Math.round(heartRate), unit: 'BPM', icon: Heart, color: 'from-red-500 to-pink-500', normal: [60, 100] },
    { label: 'Brain Activity', value: Math.round(brainActivity), unit: '%', icon: Brain, color: 'from-purple-500 to-indigo-500', normal: [70, 90] },
    { label: 'Stress Level', value: Math.round(stressLevel), unit: '%', icon: AlertTriangle, color: 'from-orange-500 to-red-500', normal: [0, 30] },
    { label: 'Energy Level', value: Math.round(energyLevel), unit: '%', icon: Zap, color: 'from-green-500 to-teal-500', normal: [60, 90] },
  ];

  const isInNormalRange = (value: number, range: [number, number]) => {
    return value >= range[0] && value <= range[1];
  };

  const getStatusColor = (value: number, range: [number, number]) => {
    if (isInNormalRange(value, range)) return 'text-green-400';
    return 'text-yellow-400';
  };

  // Generate sample neural wave data
  const generateWaveData = (frequency: number, amplitude: number) => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const x = (i / 100) * 400;
      const y = Math.sin((i / 100) * Math.PI * 2 * frequency) * amplitude + 60;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Neural Monitor</h2>
        <p className="text-gray-400">Real-time monitoring of your neurological and emotional states</p>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {vitalSigns.map((vital) => (
          <div key={vital.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <vital.icon className={`w-6 h-6 bg-gradient-to-r ${vital.color} bg-clip-text text-transparent`} />
              <span className={`text-xs px-2 py-1 rounded ${
                isInNormalRange(vital.value, vital.normal) 
                  ? 'bg-green-400/20 text-green-400' 
                  : 'bg-yellow-400/20 text-yellow-400'
              }`}>
                {isInNormalRange(vital.value, vital.normal) ? 'Normal' : 'Monitor'}
              </span>
            </div>
            <div className="mb-1">
              <span className={`text-2xl font-bold ${getStatusColor(vital.value, vital.normal)}`}>
                {vital.value}
              </span>
              <span className="text-gray-400 text-sm ml-1">{vital.unit}</span>
            </div>
            <div className="text-gray-500 text-xs">{vital.label}</div>
            <div className="mt-2">
              <div className="w-full bg-white/10 rounded-full h-1">
                <div 
                  className={`h-1 bg-gradient-to-r ${vital.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, (vital.value / (vital.normal[1] * 1.2)) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neural Wave Patterns */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white text-lg font-semibold mb-4">Neural Wave Patterns</h3>
          <div className="space-y-4">
            {[
              { name: 'Alpha Waves', frequency: 2, amplitude: 20, color: '#3B82F6' },
              { name: 'Beta Waves', frequency: 4, amplitude: 15, color: '#8B5CF6' },
              { name: 'Gamma Waves', frequency: 8, amplitude: 10, color: '#10B981' },
              { name: 'Theta Waves', frequency: 1, amplitude: 25, color: '#F59E0B' },
            ].map((wave) => (
              <div key={wave.name} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{wave.name}</span>
                  <span className="text-gray-400 text-xs">{(8 + Math.random() * 4).toFixed(1)} Hz</span>
                </div>
                <svg width="100%" height="40" className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={wave.color}
                    strokeWidth="2"
                    points={generateWaveData(wave.frequency, wave.amplitude)}
                    className="animate-pulse"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional State Analysis */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white text-lg font-semibold mb-4">Emotional State Analysis</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Current Emotion</span>
              <span className="text-white capitalize font-medium">{currentEmotion}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${emotionalIntensity}%` }}
              />
            </div>
            <div className="text-right text-gray-400 text-sm mt-1">{emotionalIntensity}% intensity</div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Emotional Stability</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Variance over 24h</span>
                <span className="text-green-400 font-medium">±12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Recovery time</span>
                <span className="text-blue-400 font-medium">8.5 min</span>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Neural Coherence</h4>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full" style={{ width: '78%' }} />
                </div>
                <span className="text-white font-medium">78%</span>
              </div>
              <div className="text-gray-400 text-xs mt-1">Heart-brain synchronization</div>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Recommendations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Consider 5-minute breathing exercise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Optimal time for creative work</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Monitor stress levels this evening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralMonitor;