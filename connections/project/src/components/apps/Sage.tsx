import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lightbulb, TrendingUp, Eye, Calendar, Sparkles, Heart, Brain } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  emotion: string;
  insights: string[];
  patterns: string[];
}

const Sage: React.FC = () => {
  const navigate = useNavigate();
  const { emotionalHistory, addEmotionalEntry } = useEmotionalContext();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [sageInsight, setSageInsight] = useState('');
  const [reflectionPrompts, setReflectionPrompts] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const wisdomPrompts = [
    "What emotion is asking for your attention today?",
    "If this feeling could speak, what would it tell you?",
    "What pattern do you notice emerging in your emotional landscape?",
    "What would you tell a dear friend experiencing this same situation?",
    "What is this emotion trying to protect or teach you?",
    "How has this feeling served you in the past?",
    "What would it feel like to release this emotional burden?",
    "What story are you telling yourself about this experience?",
    "If you could send love to the part of you that's struggling, what would you say?",
    "What would your wisest self advise you right now?"
  ];

  useEffect(() => {
    // Generate personalized reflection prompts based on emotional history
    const recentEmotions = emotionalHistory.slice(-5);
    const emotionPatterns = recentEmotions.map(entry => entry.emotion);
    
    const personalizedPrompts = [
      `I notice you've been experiencing ${emotionPatterns[0]} recently. What's beneath this feeling?`,
      "What themes keep appearing in your emotional journey?",
      "How are you growing through these experiences?"
    ];
    
    setReflectionPrompts([...personalizedPrompts, ...wisdomPrompts.slice(0, 7)]);
  }, [emotionalHistory]);

  const analyzeEntry = async (content: string) => {
    setIsAnalyzing(true);
    
    // Simulate Sage's AI analysis
    setTimeout(() => {
      const insights = generateInsights(content);
      const patterns = detectPatterns(content);
      const emotion = detectEmotion(content);
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content,
        timestamp: new Date(),
        emotion,
        insights,
        patterns
      };
      
      setJournalEntries(prev => [newEntry, ...prev]);
      setSageInsight(generateSageResponse(content, insights, patterns));
      setCurrentEntry('');
      setIsAnalyzing(false);
      
      // Add to emotional context
      addEmotionalEntry(emotion, 60, 'journaling', content.slice(0, 100));
    }, 2000);
  };

  const generateInsights = (content: string): string[] => {
    const insights = [];
    
    if (content.toLowerCase().includes('stress') || content.toLowerCase().includes('overwhelm')) {
      insights.push("Your nervous system may be signaling for rest and restoration");
    }
    if (content.toLowerCase().includes('pattern') || content.toLowerCase().includes('again')) {
      insights.push("You're developing awareness of recurring themes - this is growth");
    }
    if (content.toLowerCase().includes('feel') || content.toLowerCase().includes('emotion')) {
      insights.push("Your emotional intelligence is expanding through this reflection");
    }
    if (content.toLowerCase().includes('relationship') || content.toLowerCase().includes('people')) {
      insights.push("Connection and belonging seem important to your healing journey");
    }
    
    return insights.length > 0 ? insights : ["Your willingness to reflect shows deep self-compassion"];
  };

  const detectPatterns = (content: string): string[] => {
    const patterns = [];
    
    if (content.toLowerCase().includes('always') || content.toLowerCase().includes('never')) {
      patterns.push("All-or-nothing thinking pattern detected");
    }
    if (content.toLowerCase().includes('should') || content.toLowerCase().includes('must')) {
      patterns.push("Self-criticism pattern - consider self-compassion");
    }
    if (content.toLowerCase().includes('why me') || content.toLowerCase().includes('unfair')) {
      patterns.push("Victim mindset emerging - opportunity for empowerment");
    }
    
    return patterns;
  };

  const detectEmotion = (content: string): string => {
    const emotionKeywords = {
      anxious: ['worry', 'stress', 'nervous', 'fear', 'panic'],
      sad: ['sad', 'down', 'depressed', 'lonely', 'empty'],
      angry: ['angry', 'mad', 'frustrated', 'irritated', 'rage'],
      happy: ['happy', 'joy', 'excited', 'grateful', 'content'],
      confused: ['confused', 'lost', 'uncertain', 'unclear', 'mixed']
    };
    
    const lowerContent = content.toLowerCase();
    
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        return emotion;
      }
    }
    
    return 'reflective';
  };

  const generateSageResponse = (content: string, insights: string[], patterns: string[]): string => {
    const responses = [
      `I hear the wisdom in your words. ${insights[0] || 'Your reflection shows deep self-awareness.'}`,
      `Thank you for sharing this with me. What I notice is your courage to look within.`,
      `Your emotional landscape is rich and complex. ${insights[0] || 'This reflection is part of your healing journey.'}`,
      `I'm honored to witness your growth. ${patterns[0] || 'Your self-awareness is expanding beautifully.'}`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const usePrompt = (prompt: string) => {
    setCurrentEntry(prompt + '\n\n');
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Sage™ Emotional Journaling
          </h1>
          <p className="text-gray-300">Your wise companion for reflective emotional exploration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Journal Writing Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Writing Interface */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Sacred Writing Space</h2>
            </div>
            
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="What's stirring in your heart today? Let your thoughts flow freely..."
              className="w-full h-64 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-gray-400 text-sm">
                {currentEntry.length} characters
              </div>
              <button
                onClick={() => analyzeEntry(currentEntry)}
                disabled={!currentEntry.trim() || isAnalyzing}
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sage is reflecting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Share with Sage</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sage's Response */}
          {sageInsight && (
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-amber-400 font-semibold">Sage's Reflection</h3>
                  <p className="text-gray-400 text-sm">Wise insights from your emotional companion</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed italic">"{sageInsight}"</p>
            </div>
          )}

          {/* Journal History */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">📖 Your Emotional Journey</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {journalEntries.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Your journal entries will appear here</p>
                </div>
              ) : (
                journalEntries.map((entry) => (
                  <div key={entry.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full emotion-${entry.emotion}`}></div>
                        <span className="text-white font-medium capitalize">{entry.emotion}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {entry.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">{entry.content}</p>
                    
                    {entry.insights.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-amber-400 text-sm font-medium mb-1">💡 Insights:</h4>
                        <ul className="text-gray-400 text-xs space-y-1">
                          {entry.insights.map((insight, index) => (
                            <li key={index}>• {insight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {entry.patterns.length > 0 && (
                      <div>
                        <h4 className="text-orange-400 text-sm font-medium mb-1">🔍 Patterns:</h4>
                        <ul className="text-gray-400 text-xs space-y-1">
                          {entry.patterns.map((pattern, index) => (
                            <li key={index}>• {pattern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reflection Prompts */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h3 className="text-white font-semibold">Wisdom Prompts</h3>
            </div>
            
            <div className="space-y-3">
              {reflectionPrompts.slice(0, 5).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => usePrompt(prompt)}
                  className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-amber-500/30 transition-all"
                >
                  <p className="text-gray-300 text-sm">{prompt}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Emotional Patterns */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-white font-semibold">Growth Patterns</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-green-400 text-sm font-medium mb-1">Most Frequent Emotion</h4>
                <p className="text-gray-300 text-sm">Reflective (40% of entries)</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-blue-400 text-sm font-medium mb-1">Growth Theme</h4>
                <p className="text-gray-300 text-sm">Self-awareness expansion</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <h4 className="text-purple-400 text-sm font-medium mb-1">Breakthrough Moment</h4>
                <p className="text-gray-300 text-sm">Recognizing emotional patterns</p>
              </div>
            </div>
          </div>

          {/* Sage's Wisdom */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-amber-400 font-semibold">Sage's Daily Wisdom</h3>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed italic mb-4">
              "Your emotions are not problems to be solved, but wisdom to be honored. Each feeling carries a message from your deepest self."
            </p>
            
            <div className="text-center">
              <div className="text-amber-400 text-xs">✨ Remember: You are exactly where you need to be ✨</div>
            </div>
          </div>
        </div>
      </div>

      {/* How Sage Works */}
      <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
        <h3 className="text-white font-semibold mb-4">🌟 How Sage™ Supports Your Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Pattern Recognition</h4>
            <p className="text-gray-300 text-sm">Identifies recurring themes and emotional patterns in your writing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Wise Insights</h4>
            <p className="text-gray-300 text-sm">Offers gentle, therapeutic insights to deepen self-understanding</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-yellow-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Compassionate Guidance</h4>
            <p className="text-gray-300 text-sm">Provides supportive prompts and reflections for emotional growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sage;