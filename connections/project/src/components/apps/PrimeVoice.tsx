import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Play, Pause, RotateCcw, Mic, FileText, Download } from 'lucide-react';

interface VoicePersona {
  id: string;
  name: string;
  description: string;
  emotionalRange: string[];
  voiceCharacteristics: string;
}

interface AudioNarration {
  id: string;
  title: string;
  content: string;
  persona: string;
  duration: number;
  timestamp: Date;
  audioUrl?: string;
}

const PrimeVoice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona | null>(null);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNarration, setCurrentNarration] = useState<AudioNarration | null>(null);
  const [narrations, setNarrations] = useState<AudioNarration[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const voicePersonas: VoicePersona[] = [
    {
      id: 'gentle-guide',
      name: 'Gentle Guide',
      description: 'Warm, nurturing voice for comfort and healing',
      emotionalRange: ['calm', 'sad', 'anxious', 'overwhelmed'],
      voiceCharacteristics: 'Soft, slow-paced, with gentle inflections'
    },
    {
      id: 'wise-sage',
      name: 'Wise Sage',
      description: 'Deep, thoughtful voice for reflection and insight',
      emotionalRange: ['contemplative', 'confused', 'seeking'],
      voiceCharacteristics: 'Rich, measured tone with thoughtful pauses'
    },
    {
      id: 'encouraging-coach',
      name: 'Encouraging Coach',
      description: 'Uplifting, motivational voice for growth and action',
      emotionalRange: ['motivated', 'excited', 'determined'],
      voiceCharacteristics: 'Energetic, clear, with inspiring emphasis'
    },
    {
      id: 'compassionate-friend',
      name: 'Compassionate Friend',
      description: 'Understanding, empathetic voice for support',
      emotionalRange: ['lonely', 'hurt', 'vulnerable'],
      voiceCharacteristics: 'Warm, intimate, with emotional resonance'
    },
    {
      id: 'inner-child',
      name: 'Inner Child',
      description: 'Playful, innocent voice for joy and wonder',
      emotionalRange: ['happy', 'curious', 'playful'],
      voiceCharacteristics: 'Light, expressive, with natural enthusiasm'
    },
    {
      id: 'shadow-voice',
      name: 'Shadow Voice',
      description: 'Honest, direct voice for difficult truths',
      emotionalRange: ['angry', 'frustrated', 'rebellious'],
      voiceCharacteristics: 'Strong, unfiltered, with raw authenticity'
    }
  ];

  const sampleTexts = [
    "Today I felt a deep sense of peace wash over me during my morning meditation. The world seemed to slow down, and I could finally hear my own thoughts clearly.",
    "I'm struggling with this decision and I don't know which path to take. Part of me wants to play it safe, but another part is calling for adventure.",
    "I realized today that I've been carrying this pain for so long, I forgot what it felt like to be free from it. Maybe it's time to let go.",
    "There's something magical about the way the light hits the trees in the evening. It reminds me that beauty exists even in the ordinary moments.",
    "I'm angry at myself for not speaking up when I had the chance. Why do I always shrink back when I need to be brave?"
  ];

  const generateNarration = async () => {
    if (!inputText.trim() || !selectedPersona) return;
    
    setIsGenerating(true);
    
    // Simulate audio generation
    setTimeout(() => {
      const newNarration: AudioNarration = {
        id: Date.now().toString(),
        title: inputText.slice(0, 50) + (inputText.length > 50 ? '...' : ''),
        content: inputText,
        persona: selectedPersona.name,
        duration: Math.floor(inputText.length / 10) + 30, // Estimate duration
        timestamp: new Date(),
        audioUrl: generateMockAudioUrl()
      };
      
      setNarrations(prev => [newNarration, ...prev]);
      setCurrentNarration(newNarration);
      setIsGenerating(false);
    }, 3000);
  };

  const generateMockAudioUrl = (): string => {
    // In a real implementation, this would return the actual audio file URL
    return `data:audio/wav;base64,${btoa('mock-audio-data')}`;
  };

  const playNarration = (narration: AudioNarration) => {
    setCurrentNarration(narration);
    setIsPlaying(true);
    
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, narration.duration * 1000);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPersonaColor = (personaId: string) => {
    const colors = {
      'gentle-guide': 'from-green-500 to-teal-500',
      'wise-sage': 'from-purple-500 to-indigo-500',
      'encouraging-coach': 'from-orange-500 to-yellow-500',
      'compassionate-friend': 'from-pink-500 to-rose-500',
      'inner-child': 'from-yellow-500 to-orange-500',
      'shadow-voice': 'from-red-500 to-gray-500'
    };
    return colors[personaId as keyof typeof colors] || 'from-blue-500 to-cyan-500';
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-violet-500 bg-clip-text text-transparent">
            PrimeVoice™ Audio Narrator
          </h1>
          <p className="text-gray-300">Transform your journal entries into rich, expressive audio narratives</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voice Generation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Text Input */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold text-white">Create Audio Narrative</h2>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your journal entry, thoughts, or any text you'd like to hear narrated..."
              className="w-full h-48 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">{inputText.length} characters</span>
                <span className="text-gray-400 text-sm">
                  ~{Math.floor(inputText.length / 10) + 30}s duration
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  onChange={(e) => setInputText(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  value=""
                >
                  <option value="">Sample texts...</option>
                  {sampleTexts.map((text, index) => (
                    <option key={index} value={text} className="bg-slate-800">
                      Sample {index + 1}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={generateNarration}
                  disabled={!inputText.trim() || !selectedPersona || isGenerating}
                  className="flex items-center space-x-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-all"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Generate Voice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          {currentNarration && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <Volume2 className="w-6 h-6 text-purple-400" />
                <h3 className="text-white font-semibold">Now Playing</h3>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <h4 className="text-white font-medium mb-2">{currentNarration.title}</h4>
                <p className="text-gray-400 text-sm mb-3">Narrated by {currentNarration.persona}</p>
                
                {/* Audio Waveform Visualization */}
                <div className="flex items-center space-x-1 h-12 mb-4">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-gradient-to-t from-violet-500 to-purple-400 rounded-full transition-all duration-150 ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        height: `${20 + Math.random() * 30}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => isPlaying ? stopPlayback() : playNarration(currentNarration)}
                      className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                    
                    <button
                      onClick={stopPlayback}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-gray-300" />
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Speed:</span>
                      <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="bg-white/10 border border-white/20 rounded text-white text-sm px-2 py-1"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1.0}>1.0x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-sm">
                      {formatDuration(currentNarration.duration)}
                    </span>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Narration History */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">🎙️ Your Audio Library</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {narrations.length === 0 ? (
                <div className="text-center py-8">
                  <Mic className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Your generated narrations will appear here</p>
                </div>
              ) : (
                narrations.map((narration) => (
                  <div key={narration.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{narration.title}</h4>
                        <p className="text-gray-400 text-sm">by {narration.persona}</p>
                      </div>
                      <button
                        onClick={() => playNarration(narration)}
                        className="w-8 h-8 bg-violet-500/20 hover:bg-violet-500/30 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Play className="w-4 h-4 text-violet-400 ml-0.5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {narration.timestamp.toLocaleDateString()}
                      </span>
                      <span className="text-gray-400">
                        {formatDuration(narration.duration)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Voice Personas */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">🎭 Voice Personas</h3>
            
            <div className="space-y-3">
              {voicePersonas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedPersona?.id === persona.id
                      ? `border-violet-500/50 bg-gradient-to-r ${getPersonaColor(persona.id)}/10`
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <h4 className="text-white font-medium mb-1">{persona.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{persona.description}</p>
                  <div className="text-xs text-gray-500">{persona.voiceCharacteristics}</div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {persona.emotionalRange.slice(0, 3).map((emotion) => (
                      <span
                        key={emotion}
                        className={`px-2 py-1 rounded text-xs ${
                          selectedPersona?.id === persona.id
                            ? 'bg-violet-500/20 text-violet-400'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Settings */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">⚙️ Voice Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Speaking Rate</label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  defaultValue="1.0"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Emotional Intensity</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Subtle</span>
                  <span>Expressive</span>
                </div>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Pause Length</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 text-sm">
                  <option value="short">Short pauses</option>
                  <option value="medium">Medium pauses</option>
                  <option value="long">Long pauses</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audio Quality */}
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-violet-500/20">
            <h3 className="text-violet-400 font-semibold mb-4">🎵 Audio Quality</h3>
            
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-white text-sm font-medium mb-1">Format</h4>
                <p className="text-gray-300 text-sm">High-quality WAV (48kHz)</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-white text-sm font-medium mb-1">Processing</h4>
                <p className="text-gray-300 text-sm">AI-enhanced emotional inflection</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-white text-sm font-medium mb-1">Privacy</h4>
                <p className="text-gray-300 text-sm">Local processing, no cloud storage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How PrimeVoice Works */}
      <div className="mt-8 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-violet-500/20">
        <h3 className="text-white font-semibold mb-4">🎤 How PrimeVoice™ Creates Emotional Audio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-violet-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Text Analysis</h4>
            <p className="text-gray-300 text-sm">Analyzes emotional content and context in your writing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Voice Synthesis</h4>
            <p className="text-gray-300 text-sm">Generates natural speech with emotional inflection and personality</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mic className="w-6 h-6 text-pink-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Identity Expression</h4>
            <p className="text-gray-300 text-sm">Reflects your authentic voice through personalized narration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeVoice;