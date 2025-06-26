import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Users, Zap, Heart, Send, RotateCcw } from 'lucide-react';

const PulseLink: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [translationMode, setTranslationMode] = useState<'menspace-carlo' | 'carlo-menspace' | 'general'>('general');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const translationModes = [
    {
      id: 'general' as const,
      name: 'General Translation',
      description: 'Universal emotional translation',
      icon: Heart,
      color: 'from-blue-500 to-teal-500'
    },
    {
      id: 'menspace-carlo' as const,
      name: 'MenSpace → Carlo',
      description: 'Adult men to teenage boys',
      icon: Users,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'carlo-menspace' as const,
      name: 'Carlo → MenSpace',
      description: 'Teenage boys to adult men',
      icon: Users,
      color: 'from-purple-500 to-blue-500'
    }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate translation processing
    setTimeout(() => {
      let translation = '';
      
      switch (translationMode) {
        case 'menspace-carlo':
          translation = translateMenSpaceToCarlo(inputText);
          break;
        case 'carlo-menspace':
          translation = translateCarloToMenSpace(inputText);
          break;
        default:
          translation = translateGeneral(inputText);
      }
      
      setTranslatedText(translation);
      setIsTranslating(false);
    }, 1500);
  };

  const translateMenSpaceToCarlo = (text: string): string => {
    // Simplified translation logic - in real app would use AI
    const patterns = [
      { from: /I'm feeling overwhelmed/gi, to: "Dude, everything's just... a lot right now" },
      { from: /I need support/gi, to: "Could really use someone to talk to" },
      { from: /I'm struggling with/gi, to: "This thing is really messing with me" },
      { from: /anxiety/gi, to: "that worried feeling" },
      { from: /depression/gi, to: "feeling really down" },
      { from: /emotional/gi, to: "feeling stuff" }
    ];
    
    let result = text;
    patterns.forEach(pattern => {
      result = result.replace(pattern.from, pattern.to);
    });
    
    return result || "Hey, what you're going through sounds really tough. Want to talk about it?";
  };

  const translateCarloToMenSpace = (text: string): string => {
    const patterns = [
      { from: /everything sucks/gi, to: "I'm experiencing significant emotional distress" },
      { from: /I hate/gi, to: "I'm struggling with feelings about" },
      { from: /whatever/gi, to: "I'm having difficulty expressing my needs" },
      { from: /fine/gi, to: "I may need support but find it difficult to ask" },
      { from: /stupid/gi, to: "challenging" }
    ];
    
    let result = text;
    patterns.forEach(pattern => {
      result = result.replace(pattern.from, pattern.to);
    });
    
    return result || "It sounds like you're dealing with some complex emotions. Your feelings are valid and it's okay to need support.";
  };

  const translateGeneral = (text: string): string => {
    // General emotional clarification
    const emotionalClarifications = [
      { from: /I'm fine/gi, to: "I may be struggling but find it hard to express my needs" },
      { from: /I don't care/gi, to: "I care deeply but feel overwhelmed or hurt" },
      { from: /it's nothing/gi, to: "this feels significant to me but I'm minimizing it" },
      { from: /I'm okay/gi, to: "I'm managing but could use understanding" }
    ];
    
    let result = text;
    emotionalClarifications.forEach(pattern => {
      result = result.replace(pattern.from, pattern.to);
    });
    
    return result || "Here's what I'm hearing beneath the surface: " + text;
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-green-400 to-teal-500 bg-clip-text text-transparent">
            PulseLink™ Emotional Bridge
          </h1>
          <p className="text-gray-300">Translate emotions across different development levels</p>
        </div>
      </div>

      {/* Translation Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {translationModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setTranslationMode(mode.id)}
            className={`p-4 rounded-xl border transition-all ${
              translationMode === mode.id
                ? 'bg-white/10 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
              <mode.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{mode.name}</h3>
            <p className="text-gray-400 text-xs">{mode.description}</p>
          </button>
        ))}
      </div>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h3 className="text-white font-semibold">Original Message</h3>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter the emotional message you want to translate..."
            className="w-full h-40 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-gray-400 text-sm">
              {inputText.length} characters
            </div>
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all"
            >
              {isTranslating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Translate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-6 h-6 text-teal-400" />
            <h3 className="text-white font-semibold">Emotional Translation</h3>
          </div>
          
          <div className="h-40 px-4 py-3 bg-white/10 border border-white/20 rounded-xl">
            {translatedText ? (
              <p className="text-gray-300 leading-relaxed">{translatedText}</p>
            ) : (
              <p className="text-gray-500 italic">Translation will appear here...</p>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-gray-400 text-sm">
              {translatedText.length} characters
            </div>
            {translatedText && (
              <button
                onClick={() => navigator.clipboard.writeText(translatedText)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Copy</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Translation Examples */}
      <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-semibold mb-4">Translation Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-teal-400 font-medium mb-2">MenSpace → Carlo</h4>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-gray-400 text-sm mb-1">Original:</p>
                <p className="text-white text-sm">"I'm experiencing anxiety about work performance"</p>
                <p className="text-gray-400 text-sm mt-2 mb-1">Translation:</p>
                <p className="text-teal-300 text-sm">"Work stuff is really stressing me out"</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Carlo → MenSpace</h4>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-gray-400 text-sm mb-1">Original:</p>
                <p className="text-white text-sm">"Everything sucks and I don't care"</p>
                <p className="text-gray-400 text-sm mt-2 mb-1">Translation:</p>
                <p className="text-purple-300 text-sm">"I'm experiencing significant emotional distress and may be using detachment as a coping mechanism"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
        <h3 className="text-white font-semibold mb-4">🌉 How PulseLink™ Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Emotional Detection</h4>
            <p className="text-gray-300 text-sm">Identifies underlying emotions and needs in communication</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-teal-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Context Translation</h4>
            <p className="text-gray-300 text-sm">Adapts language for different emotional development levels</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Bridge Building</h4>
            <p className="text-gray-300 text-sm">Creates understanding across communication gaps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseLink;