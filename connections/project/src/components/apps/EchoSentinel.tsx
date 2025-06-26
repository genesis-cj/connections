import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Play, Pause, AlertTriangle, TrendingUp, Volume2, Brain } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

interface VoiceAnalysis {
  id: string;
  timestamp: Date;
  duration: number;
  emotionalTone: string;
  stressLevel: number;
  energyLevel: number;
  clarity: number;
  insights: string[];
  transcript?: string;
}

const EchoSentinel: React.FC = () => {
  const navigate = useNavigate();
  const { addEmotionalEntry } = useEmotionalContext();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<VoiceAnalysis | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [alertLevel, setAlertLevel] = useState<'normal' | 'concern' | 'alert'>('normal');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for concerning patterns in recent recordings
    const recentRecordings = recordings.slice(-5);
    const highStressCount = recentRecordings.filter(r => r.stressLevel > 70).length;
    const lowEnergyCount = recentRecordings.filter(r => r.energyLevel < 30).length;
    
    if (highStressCount >= 3) {
      setAlertLevel('alert');
    } else if (highStressCount >= 2 || lowEnergyCount >= 3) {
      setAlertLevel('concern');
    } else {
      setAlertLevel('normal');
    }
  }, [recordings]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        analyzeRecording();
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const analyzeRecording = async () => {
    setIsAnalyzing(true);
    
    // Simulate voice analysis processing
    setTimeout(() => {
      const analysis = generateVoiceAnalysis();
      setRecordings(prev => [analysis, ...prev]);
      setCurrentAnalysis(analysis);
      setIsAnalyzing(false);
      
      // Add to emotional context
      addEmotionalEntry(
        analysis.emotionalTone,
        analysis.stressLevel,
        'voice recording',
        `Voice analysis: ${analysis.insights[0]}`
      );
    }, 3000);
  };

  const generateVoiceAnalysis = (): VoiceAnalysis => {
    const emotionalTones = ['calm', 'stressed', 'excited', 'tired', 'anxious', 'happy', 'frustrated'];
    const tone = emotionalTones[Math.floor(Math.random() * emotionalTones.length)];
    
    const stressLevel = Math.floor(Math.random() * 100);
    const energyLevel = Math.floor(Math.random() * 100);
    const clarity = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    const insights = generateInsights(tone, stressLevel, energyLevel, clarity);
    
    return {
      id: Date.now().toString(),
      timestamp: new Date(),
      duration: recordingTime,
      emotionalTone: tone,
      stressLevel,
      energyLevel,
      clarity,
      insights,
      transcript: generateSampleTranscript(tone)
    };
  };

  const generateInsights = (tone: string, stress: number, energy: number, clarity: number): string[] => {
    const insights = [];
    
    if (stress > 70) {
      insights.push("High stress detected in vocal patterns - consider breathing exercises");
    }
    if (energy < 30) {
      insights.push("Low energy levels - you may benefit from rest or gentle movement");
    }
    if (clarity < 70) {
      insights.push("Speech clarity suggests possible fatigue or emotional overwhelm");
    }
    if (tone === 'anxious' && stress > 60) {
      insights.push("Anxiety patterns detected - grounding techniques may help");
    }
    if (tone === 'calm' && stress < 40) {
      insights.push("Balanced emotional state reflected in your voice");
    }
    
    return insights.length > 0 ? insights : ["Voice analysis complete - emotional patterns recorded"];
  };

  const generateSampleTranscript = (tone: string): string => {
    const transcripts = {
      stressed: "I just feel like everything is happening at once and I can't keep up...",
      calm: "I'm feeling pretty centered today, just wanted to check in with myself...",
      excited: "I'm so excited about this new opportunity, I can barely contain myself!",
      tired: "I'm just really exhausted today, everything feels like such an effort...",
      anxious: "I keep worrying about what might happen, my mind won't stop racing...",
      happy: "Things are going really well and I'm feeling grateful for everything...",
      frustrated: "This situation is really getting to me, I don't know what to do..."
    };
    
    return transcripts[tone as keyof typeof transcripts] || "Voice recording captured for analysis...";
  };

  const getAlertColor = () => {
    switch (alertLevel) {
      case 'alert': return 'from-red-500 to-orange-500';
      case 'concern': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-teal-500';
    }
  };

  const getAlertMessage = () => {
    switch (alertLevel) {
      case 'alert': return 'Multiple high-stress recordings detected. Consider reaching out for support.';
      case 'concern': return 'Some concerning patterns in your voice. Take care of yourself.';
      default: return 'Your vocal patterns show healthy emotional regulation.';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            EchoSentinel™ Voice Analysis
          </h1>
          <p className="text-gray-300">Emotion-aware voice logging and distress pattern detection</p>
        </div>
      </div>

      {/* Alert Status */}
      <div className={`mb-8 bg-gradient-to-r ${getAlertColor()}/10 backdrop-blur-xl rounded-2xl p-6 border border-current/20`}>
        <div className="flex items-center space-x-3 mb-3">
          <AlertTriangle className={`w-6 h-6 ${
            alertLevel === 'alert' ? 'text-red-400' :
            alertLevel === 'concern' ? 'text-yellow-400' :
            'text-green-400'
          }`} />
          <h3 className={`font-semibold ${
            alertLevel === 'alert' ? 'text-red-400' :
            alertLevel === 'concern' ? 'text-yellow-400' :
            'text-green-400'
          }`}>
            Emotional Wellness Status: {alertLevel.charAt(0).toUpperCase() + alertLevel.slice(1)}
          </h3>
        </div>
        <p className="text-gray-300">{getAlertMessage()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recording Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Voice Emotional Check-in</h2>
            
            {/* Recording Visualization */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className={`absolute inset-0 rounded-full ${
                isRecording 
                  ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-500'
              } flex items-center justify-center`}>
                {isRecording ? (
                  <MicOff className="w-16 h-16 text-white" />
                ) : (
                  <Mic className="w-16 h-16 text-white" />
                )}
              </div>
              
              {/* Recording waves */}
              {isRecording && (
                <div className="absolute inset-0">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping"
                      style={{ animationDelay: `${i * 0.3}s`, animationDuration: '1.5s' }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Recording Status */}
            <div className="mb-6">
              {isRecording ? (
                <div>
                  <div className="text-red-400 text-xl font-bold mb-2">Recording...</div>
                  <div className="text-white text-lg">{formatTime(recordingTime)}</div>
                </div>
              ) : isAnalyzing ? (
                <div>
                  <div className="text-purple-400 text-xl font-bold mb-2">Analyzing Voice...</div>
                  <div className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto"></div>
                </div>
              ) : (
                <div>
                  <div className="text-gray-400 text-xl font-bold mb-2">Ready to Record</div>
                  <div className="text-gray-500">Tap to start voice analysis</div>
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              {!isRecording && !isAnalyzing ? (
                <button
                  onClick={startRecording}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl transition-all text-lg"
                >
                  <Mic className="w-6 h-6" />
                  <span>Start Recording</span>
                </button>
              ) : isRecording ? (
                <button
                  onClick={stopRecording}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl transition-all text-lg"
                >
                  <MicOff className="w-6 h-6" />
                  <span>Stop Recording</span>
                </button>
              ) : null}
            </div>
            
            {/* Quick Tips */}
            <div className="mt-8 bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2">💡 Recording Tips</h4>
              <ul className="text-gray-400 text-sm space-y-1 text-left">
                <li>• Speak naturally about how you're feeling</li>
                <li>• Record for 30-60 seconds for best analysis</li>
                <li>• Find a quiet space for clearer results</li>
                <li>• Your voice data is processed locally and privately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {/* Current Analysis */}
          {currentAnalysis && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">🎤 Latest Analysis</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white text-lg font-bold">{currentAnalysis.emotionalTone}</div>
                    <div className="text-gray-400 text-xs">Emotional Tone</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white text-lg font-bold">{currentAnalysis.stressLevel}%</div>
                    <div className="text-gray-400 text-xs">Stress Level</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white text-lg font-bold">{currentAnalysis.energyLevel}%</div>
                    <div className="text-gray-400 text-xs">Energy Level</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white text-lg font-bold">{currentAnalysis.clarity}%</div>
                    <div className="text-gray-400 text-xs">Clarity</div>
                  </div>
                </div>
                
                {currentAnalysis.transcript && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-gray-400 text-sm font-medium mb-2">Transcript:</h4>
                    <p className="text-gray-300 text-sm italic">"{currentAnalysis.transcript}"</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-purple-400 text-sm font-medium mb-2">Insights:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {currentAnalysis.insights.map((insight, index) => (
                      <li key={index}>• {insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Voice History */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">📊 Voice History</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recordings.length === 0 ? (
                <div className="text-center py-4">
                  <Volume2 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No recordings yet</p>
                </div>
              ) : (
                recordings.map((recording) => (
                  <div key={recording.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium capitalize">{recording.emotionalTone}</span>
                      <span className="text-gray-500 text-xs">
                        {recording.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className={`text-sm font-bold ${
                          recording.stressLevel > 70 ? 'text-red-400' :
                          recording.stressLevel > 40 ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {recording.stressLevel}%
                        </div>
                        <div className="text-gray-500">Stress</div>
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${
                          recording.energyLevel > 60 ? 'text-green-400' :
                          recording.energyLevel > 30 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {recording.energyLevel}%
                        </div>
                        <div className="text-gray-500">Energy</div>
                      </div>
                      <div>
                        <div className="text-blue-400 text-sm font-bold">{recording.clarity}%</div>
                        <div className="text-gray-500">Clarity</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Emotional Trends */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Vocal Patterns</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-blue-400 text-sm font-medium mb-1">Most Common Tone</h4>
                <p className="text-gray-300 text-sm">Calm (45% of recordings)</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-green-400 text-sm font-medium mb-1">Average Stress</h4>
                <p className="text-gray-300 text-sm">32% (Healthy range)</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-purple-400 text-sm font-medium mb-1">Trend</h4>
                <p className="text-gray-300 text-sm">Improving emotional regulation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How EchoSentinel Works */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/20">
        <h3 className="text-white font-semibold mb-4">🔊 How EchoSentinel™ Protects Your Emotional Wellbeing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Voice Pattern Analysis</h4>
            <p className="text-gray-300 text-sm">Analyzes vocal stress, energy, and emotional tone patterns</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Distress Detection</h4>
            <p className="text-gray-300 text-sm">Identifies concerning patterns and suggests support resources</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-pink-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Emotional Insights</h4>
            <p className="text-gray-300 text-sm">Provides personalized insights for emotional growth and healing</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            🔒 All voice processing happens locally on your device. Your voice data never leaves your computer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EchoSentinel;