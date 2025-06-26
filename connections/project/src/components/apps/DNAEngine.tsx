import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Type, Sliders, Eye, Sparkles, User, Heart, Brain, Zap } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

interface PersonalizationSettings {
  colorTheme: string;
  fontStyle: string;
  interfaceStyle: string;
  emotionalLanguage: string[];
  communicationStyle: string;
  identityAffirmations: string[];
}

const DNAEngine: React.FC = () => {
  const navigate = useNavigate();
  const { emotionalHistory, currentEmotion } = useEmotionalContext();
  const [settings, setSettings] = useState<PersonalizationSettings>({
    colorTheme: 'adaptive',
    fontStyle: 'comfortable',
    interfaceStyle: 'organic',
    emotionalLanguage: ['feeling', 'experiencing', 'sensing'],
    communicationStyle: 'gentle',
    identityAffirmations: []
  });
  const [isLearning, setIsLearning] = useState(false);
  const [adaptationProgress, setAdaptationProgress] = useState(67);
  const [personalityInsights, setPersonalityInsights] = useState<string[]>([]);

  const colorThemes = [
    { id: 'adaptive', name: 'Adaptive', description: 'Changes with your emotional state', colors: ['from-blue-500', 'to-purple-500'] },
    { id: 'warm', name: 'Warm Embrace', description: 'Comforting oranges and reds', colors: ['from-orange-500', 'to-red-500'] },
    { id: 'cool', name: 'Cool Calm', description: 'Soothing blues and teals', colors: ['from-blue-500', 'to-teal-500'] },
    { id: 'nature', name: 'Nature Harmony', description: 'Earthy greens and browns', colors: ['from-green-500', 'to-emerald-500'] },
    { id: 'sunset', name: 'Sunset Glow', description: 'Warm purples and pinks', colors: ['from-purple-500', 'to-pink-500'] },
    { id: 'ocean', name: 'Ocean Depths', description: 'Deep blues and cyans', colors: ['from-cyan-500', 'to-blue-600'] }
  ];

  const fontStyles = [
    { id: 'comfortable', name: 'Comfortable', description: 'Easy on the eyes, gentle curves' },
    { id: 'modern', name: 'Modern', description: 'Clean, contemporary lines' },
    { id: 'warm', name: 'Warm', description: 'Friendly, approachable feel' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' }
  ];

  const interfaceStyles = [
    { id: 'organic', name: 'Organic Flow', description: 'Soft, natural shapes and movements' },
    { id: 'geometric', name: 'Geometric', description: 'Clean lines and structured layouts' },
    { id: 'playful', name: 'Playful', description: 'Fun animations and interactions' },
    { id: 'minimal', name: 'Minimal', description: 'Simple, distraction-free design' }
  ];

  const communicationStyles = [
    { id: 'gentle', name: 'Gentle Guide', description: 'Soft, nurturing communication' },
    { id: 'direct', name: 'Direct Helper', description: 'Clear, straightforward guidance' },
    { id: 'encouraging', name: 'Encouraging Coach', description: 'Motivational and uplifting' },
    { id: 'wise', name: 'Wise Companion', description: 'Thoughtful, reflective responses' }
  ];

  useEffect(() => {
    // Simulate DNA Engine learning from user behavior
    const learningInterval = setInterval(() => {
      if (isLearning) {
        setAdaptationProgress(prev => Math.min(100, prev + 1));
        
        // Generate personality insights based on emotional history
        if (emotionalHistory.length > 0) {
          const insights = generatePersonalityInsights();
          setPersonalityInsights(insights);
        }
      }
    }, 2000);

    return () => clearInterval(learningInterval);
  }, [isLearning, emotionalHistory]);

  const generatePersonalityInsights = (): string[] => {
    const insights = [];
    
    // Analyze emotional patterns
    const emotionCounts = emotionalHistory.reduce((acc, entry) => {
      acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostCommonEmotion = Object.entries(emotionCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];
    
    if (mostCommonEmotion === 'calm') {
      insights.push("You have a naturally centered disposition");
    } else if (mostCommonEmotion === 'anxious') {
      insights.push("You're highly sensitive to environmental changes");
    }
    
    // Analyze intensity patterns
    const avgIntensity = emotionalHistory.reduce((sum, entry) => sum + entry.intensity, 0) / emotionalHistory.length;
    
    if (avgIntensity > 70) {
      insights.push("You experience emotions deeply and intensely");
    } else if (avgIntensity < 40) {
      insights.push("You tend toward emotional stability and balance");
    }
    
    // Analyze context patterns
    const contexts = emotionalHistory.map(entry => entry.context);
    if (contexts.filter(c => c.includes('work')).length > contexts.length * 0.3) {
      insights.push("Work environment significantly impacts your emotional state");
    }
    
    return insights.slice(0, 3);
  };

  const startLearning = () => {
    setIsLearning(true);
    setTimeout(() => setIsLearning(false), 10000); // Learn for 10 seconds
  };

  const updateSetting = <K extends keyof PersonalizationSettings>(
    key: K, 
    value: PersonalizationSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addAffirmation = () => {
    const newAffirmation = prompt("Enter a personal affirmation:");
    if (newAffirmation) {
      setSettings(prev => ({
        ...prev,
        identityAffirmations: [...prev.identityAffirmations, newAffirmation]
      }));
    }
  };

  const getCurrentThemeColors = () => {
    if (settings.colorTheme === 'adaptive') {
      // Adapt colors based on current emotion
      const emotionColors = {
        happy: ['from-yellow-500', 'to-orange-500'],
        sad: ['from-blue-500', 'to-indigo-500'],
        angry: ['from-red-500', 'to-pink-500'],
        anxious: ['from-purple-500', 'to-blue-500'],
        calm: ['from-green-500', 'to-teal-500'],
        confused: ['from-gray-500', 'to-slate-500']
      };
      return emotionColors[currentEmotion as keyof typeof emotionColors] || ['from-blue-500', 'to-purple-500'];
    }
    
    const theme = colorThemes.find(t => t.id === settings.colorTheme);
    return theme?.colors || ['from-blue-500', 'to-purple-500'];
  };

  const currentColors = getCurrentThemeColors();

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
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${currentColors[0]} ${currentColors[1]} bg-clip-text text-transparent`}>
            DNA Engine™ Adaptive Identity
          </h1>
          <p className="text-gray-300">Personalized interface that mirrors your authentic self</p>
        </div>
      </div>

      {/* Adaptation Status */}
      <div className={`mb-8 bg-gradient-to-r ${currentColors[0]}/10 ${currentColors[1]}/10 backdrop-blur-xl rounded-2xl p-6 border border-current/20`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentColors[0]} ${currentColors[1]} rounded-full flex items-center justify-center`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Identity Adaptation Progress</h3>
              <p className="text-gray-400 text-sm">Learning your unique emotional language and preferences</p>
            </div>
          </div>
          <button
            onClick={startLearning}
            disabled={isLearning}
            className={`flex items-center space-x-2 bg-gradient-to-r ${currentColors[0]} ${currentColors[1]} hover:opacity-80 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all`}
          >
            {isLearning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Learning...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Adapt Now</span>
              </>
            )}
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Adaptation Level:</span>
            <span className="text-white font-bold">{adaptationProgress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className={`h-3 bg-gradient-to-r ${currentColors[0]} ${currentColors[1]} rounded-full transition-all duration-500`}
              style={{ width: `${adaptationProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personalization Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Color Theme */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="w-6 h-6 text-purple-400" />
              <h3 className="text-white font-semibold">Color Theme</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => updateSetting('colorTheme', theme.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    settings.colorTheme === theme.id
                      ? 'border-purple-500/50 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-full h-8 bg-gradient-to-r ${theme.colors[0]} ${theme.colors[1]} rounded-lg mb-3`}></div>
                  <h4 className="text-white font-medium text-sm">{theme.name}</h4>
                  <p className="text-gray-400 text-xs">{theme.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Style */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Type className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold">Typography Style</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fontStyles.map((font) => (
                <button
                  key={font.id}
                  onClick={() => updateSetting('fontStyle', font.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    settings.fontStyle === font.id
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <h4 className="text-white font-medium">{font.name}</h4>
                  <p className="text-gray-400 text-sm">{font.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interface Style */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Sliders className="w-6 h-6 text-green-400" />
              <h3 className="text-white font-semibold">Interface Style</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interfaceStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateSetting('interfaceStyle', style.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    settings.interfaceStyle === style.id
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <h4 className="text-white font-medium">{style.name}</h4>
                  <p className="text-gray-400 text-sm">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Communication Style */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h3 className="text-white font-semibold">Communication Style</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {communicationStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateSetting('communicationStyle', style.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    settings.communicationStyle === style.id
                      ? 'border-pink-500/50 bg-pink-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <h4 className="text-white font-medium">{style.name}</h4>
                  <p className="text-gray-400 text-sm">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Personality Insights */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-semibold">Personality Insights</h3>
            </div>
            
            <div className="space-y-3">
              {personalityInsights.length === 0 ? (
                <div className="text-center py-4">
                  <User className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Insights will appear as the DNA Engine learns about you</p>
                </div>
              ) : (
                personalityInsights.map((insight, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{insight}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Identity Affirmations */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h3 className="text-white font-semibold">Identity Affirmations</h3>
              </div>
              <button
                onClick={addAffirmation}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <span className="text-lg">+</span>
              </button>
            </div>
            
            <div className="space-y-2">
              {settings.identityAffirmations.length === 0 ? (
                <div className="text-center py-4">
                  <Heart className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Add personal affirmations to strengthen your identity</p>
                </div>
              ) : (
                settings.identityAffirmations.map((affirmation, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/20">
                    <p className="text-yellow-300 text-sm italic">"{affirmation}"</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Emotional Language */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-white font-semibold">Emotional Language</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-purple-400 text-sm font-medium mb-2">Preferred Words:</h4>
                <div className="flex flex-wrap gap-1">
                  {settings.emotionalLanguage.map((word) => (
                    <span
                      key={word}
                      className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-blue-400 text-sm font-medium mb-1">Communication Tone:</h4>
                <p className="text-gray-300 text-sm capitalize">{settings.communicationStyle}</p>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className={`bg-gradient-to-br ${currentColors[0]}/10 ${currentColors[1]}/10 backdrop-blur-xl rounded-2xl p-6 border border-current/20`}>
            <h3 className="text-white font-semibold mb-4">🎨 Live Preview</h3>
            <div className="space-y-3">
              <div className={`w-full h-4 bg-gradient-to-r ${currentColors[0]} ${currentColors[1]} rounded`}></div>
              <div className="text-white">Sample text in your chosen style</div>
              <div className="text-gray-300 text-sm">This is how your interface will look and feel</div>
            </div>
          </div>
        </div>
      </div>

      {/* How DNA Engine Works */}
      <div className={`mt-8 bg-gradient-to-r ${currentColors[0]}/10 ${currentColors[1]}/10 backdrop-blur-xl rounded-2xl p-6 border border-current/20`}>
        <h3 className="text-white font-semibold mb-4">🧬 How DNA Engine™ Adapts to You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentColors[0]} ${currentColors[1]} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-medium mb-2">Learning Patterns</h4>
            <p className="text-gray-300 text-sm">Analyzes your emotional patterns and communication preferences</p>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentColors[0]} ${currentColors[1]} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-medium mb-2">Visual Adaptation</h4>
            <p className="text-gray-300 text-sm">Adjusts colors, fonts, and layouts to match your identity</p>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentColors[0]} ${currentColors[1]} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-medium mb-2">Identity Affirmation</h4>
            <p className="text-gray-300 text-sm">Reflects your authentic self through personalized interactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNAEngine;