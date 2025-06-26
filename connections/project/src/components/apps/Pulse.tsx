import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Waves, Play, Pause, RotateCcw, Activity, Wind, Zap } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  pattern: number[];
  duration: number;
  benefits: string[];
  emotionalStates: string[];
}

const Pulse: React.FC = () => {
  const navigate = useNavigate();
  const { currentEmotion, emotionalIntensity, emotionalLoad } = useEmotionalContext();
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [heartRate, setHeartRate] = useState(72);

  const breathingExercises: BreathingExercise[] = [
    {
      id: 'box-breathing',
      name: 'Box Breathing',
      description: 'Equal counts for inhale, hold, exhale, hold',
      pattern: [4, 4, 4, 4],
      duration: 300,
      benefits: ['Reduces anxiety', 'Improves focus', 'Calms nervous system'],
      emotionalStates: ['anxious', 'stressed', 'overwhelmed']
    },
    {
      id: 'calm-breathing',
      name: 'Calming Breath',
      description: 'Extended exhale for relaxation',
      pattern: [4, 2, 6, 2],
      duration: 240,
      benefits: ['Deep relaxation', 'Stress relief', 'Better sleep'],
      emotionalStates: ['angry', 'frustrated', 'tense']
    },
    {
      id: 'energizing-breath',
      name: 'Energizing Breath',
      description: 'Quick rhythm to boost energy',
      pattern: [3, 1, 3, 1],
      duration: 180,
      benefits: ['Increases alertness', 'Boosts energy', 'Improves mood'],
      emotionalStates: ['tired', 'low', 'sluggish']
    },
    {
      id: 'coherent-breathing',
      name: 'Heart Coherence',
      description: 'Synchronizes heart and breath',
      pattern: [5, 0, 5, 0],
      duration: 360,
      benefits: ['Heart-brain coherence', 'Emotional balance', 'Resilience'],
      emotionalStates: ['confused', 'scattered', 'disconnected']
    },
    {
      id: 'emergency-calm',
      name: 'Emergency Calm',
      description: 'Quick reset for acute stress',
      pattern: [3, 3, 6, 0],
      duration: 120,
      benefits: ['Rapid calming', 'Panic relief', 'Quick reset'],
      emotionalStates: ['panic', 'crisis', 'acute stress']
    }
  ];

  // Auto-suggest exercise based on current emotional state
  useEffect(() => {
    if (!selectedExercise) {
      const suggestedExercise = breathingExercises.find(exercise =>
        exercise.emotionalStates.includes(currentEmotion)
      ) || breathingExercises[0];
      setSelectedExercise(suggestedExercise);
    }
  }, [currentEmotion, selectedExercise]);

  // Breathing cycle logic
  useEffect(() => {
    if (!isBreathing || !selectedExercise) return;

    const [inhale, hold1, exhale, hold2] = selectedExercise.pattern;
    const phases = [
      { name: 'inhale' as const, duration: inhale },
      ...(hold1 > 0 ? [{ name: 'hold' as const, duration: hold1 }] : []),
      { name: 'exhale' as const, duration: exhale },
      ...(hold2 > 0 ? [{ name: 'pause' as const, duration: hold2 }] : [])
    ];

    let phaseIndex = 0;
    let phaseTime = 0;

    const interval = setInterval(() => {
      phaseTime++;
      setSessionTime(prev => prev + 1);

      if (phaseTime >= phases[phaseIndex].duration) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        phaseTime = 0;
        
        if (phaseIndex === 0) {
          setBreathCount(prev => prev + 1);
        }
      }

      setCurrentPhase(phases[phaseIndex].name);

      // Simulate heart rate variability
      if (currentPhase === 'inhale') {
        setHeartRate(prev => Math.min(85, prev + 0.5));
      } else if (currentPhase === 'exhale') {
        setHeartRate(prev => Math.max(60, prev - 0.3));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathing, selectedExercise, currentPhase]);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathCount(0);
    setSessionTime(0);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setCurrentPhase('inhale');
  };

  const resetSession = () => {
    stopBreathing();
    setBreathCount(0);
    setSessionTime(0);
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'from-blue-400 to-cyan-400';
      case 'hold': return 'from-purple-400 to-blue-400';
      case 'exhale': return 'from-green-400 to-teal-400';
      case 'pause': return 'from-gray-400 to-slate-400';
    }
  };

  const getEmotionalGuidance = () => {
    if (emotionalLoad > 80) {
      return "Your system is showing high emotional load. Let's use breathing to create space for relief.";
    }
    if (emotionalIntensity > 70) {
      return "I sense high emotional intensity. Breathing can help regulate your nervous system.";
    }
    return "Your breathing practice supports emotional balance and nervous system health.";
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Pulse™ Somatic Regulation
          </h1>
          <p className="text-gray-300">Breath-based nervous system regulation and emotional balance</p>
        </div>
      </div>

      {/* Emotional Guidance */}
      <div className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex items-center space-x-3 mb-3">
          <Activity className="w-6 h-6 text-cyan-400" />
          <h3 className="text-cyan-400 font-semibold">Nervous System Guidance</h3>
        </div>
        <p className="text-gray-300">{getEmotionalGuidance()}</p>
        <div className="mt-3 flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full emotion-${currentEmotion}`}></div>
            <span className="text-gray-400">Current: {currentEmotion}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-gray-400">HR: {Math.round(heartRate)} BPM</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">Load: {Math.round(emotionalLoad)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Breathing Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedExercise?.name || 'Select Exercise'}
            </h2>
            
            {/* Breathing Circle */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-30 transition-all duration-1000 ${
                isBreathing && currentPhase === 'inhale' ? 'scale-110' :
                isBreathing && currentPhase === 'exhale' ? 'scale-90' :
                'scale-100'
              }`}></div>
              
              <div className={`absolute inset-4 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-50 transition-all duration-1000 ${
                isBreathing && currentPhase === 'inhale' ? 'scale-105' :
                isBreathing && currentPhase === 'exhale' ? 'scale-95' :
                'scale-100'
              }`}></div>
              
              <div className={`absolute inset-8 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center transition-all duration-1000 ${
                isBreathing && currentPhase === 'inhale' ? 'scale-110' :
                isBreathing && currentPhase === 'exhale' ? 'scale-90' :
                'scale-100'
              }`}>
                <div className="text-center">
                  <div className="text-white text-2xl font-bold mb-2">
                    {getPhaseInstruction()}
                  </div>
                  {isBreathing && (
                    <div className="text-white/80 text-sm">
                      Breath {breathCount + 1}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Breathing waves */}
              {isBreathing && (
                <div className="absolute inset-0">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 rounded-full border-2 border-white/20 animate-ping`}
                      style={{ animationDelay: `${i * 0.5}s`, animationDuration: '2s' }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              {!isBreathing ? (
                <button
                  onClick={startBreathing}
                  disabled={!selectedExercise}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Breathing</span>
                </button>
              ) : (
                <button
                  onClick={stopBreathing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
              )}
              
              <button
                onClick={resetSession}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-gray-300 px-4 py-3 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
            
            {/* Session Stats */}
            {(isBreathing || breathCount > 0) && (
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white text-xl font-bold">{breathCount}</div>
                  <div className="text-gray-400 text-sm">Breaths</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white text-xl font-bold">{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</div>
                  <div className="text-gray-400 text-sm">Time</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white text-xl font-bold">{Math.round(heartRate)}</div>
                  <div className="text-gray-400 text-sm">BPM</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Exercise Selection */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">🫁 Breathing Exercises</h3>
            
            <div className="space-y-3">
              {breathingExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedExercise?.id === exercise.id
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <h4 className="text-white font-medium mb-1">{exercise.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{exercise.description}</p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-cyan-400">
                      {exercise.pattern.join('-')} pattern
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">
                      {Math.floor(exercise.duration / 60)}min
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Details */}
          {selectedExercise && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Exercise Benefits</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 text-sm font-medium mb-2">Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {selectedExercise.benefits.map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-green-400 text-sm font-medium mb-2">Best for:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExercise.emotionalStates.map((state) => (
                      <span
                        key={state}
                        className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30"
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-purple-400 text-sm font-medium mb-2">Pattern:</h4>
                  <div className="text-gray-300 text-sm">
                    Inhale {selectedExercise.pattern[0]}s
                    {selectedExercise.pattern[1] > 0 && ` → Hold ${selectedExercise.pattern[1]}s`}
                    → Exhale {selectedExercise.pattern[2]}s
                    {selectedExercise.pattern[3] > 0 && ` → Pause ${selectedExercise.pattern[3]}s`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Emergency Tools */}
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
            <h3 className="text-red-400 font-semibold mb-4">🚨 Emergency Regulation</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedExercise(breathingExercises.find(e => e.id === 'emergency-calm')!);
                  startBreathing();
                }}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-lg transition-colors"
              >
                Quick Panic Relief
              </button>
              
              <button
                onClick={() => {
                  setSelectedExercise(breathingExercises.find(e => e.id === 'box-breathing')!);
                  startBreathing();
                }}
                className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 py-3 rounded-lg transition-colors"
              >
                Anxiety Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How Pulse Works */}
      <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <h3 className="text-white font-semibold mb-4">🌊 How Pulse™ Regulates Your Nervous System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Wind className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Polyvagal Activation</h4>
            <p className="text-gray-300 text-sm">Activates the vagus nerve to shift from fight/flight to rest/digest</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Heart Coherence</h4>
            <p className="text-gray-300 text-sm">Synchronizes heart rhythm with breathing for optimal emotional balance</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Waves className="w-6 h-6 text-teal-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Somatic Awareness</h4>
            <p className="text-gray-300 text-sm">Builds body awareness and emotional regulation through breath</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pulse;