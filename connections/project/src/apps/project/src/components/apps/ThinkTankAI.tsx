import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Users, MessageCircle, Plus, Play, Pause } from 'lucide-react';

interface Perspective {
  id: string;
  name: string;
  role: string;
  color: string;
  avatar: string;
}

interface DebateMessage {
  id: string;
  perspectiveId: string;
  message: string;
  timestamp: Date;
}

const ThinkTankAI: React.FC = () => {
  const navigate = useNavigate();
  const [activeDebate, setActiveDebate] = useState<string | null>(null);
  const [isDebateActive, setIsDebateActive] = useState(false);
  const [debateMessages, setDebateMessages] = useState<DebateMessage[]>([]);
  const [debateTopic, setDebateTopic] = useState('');

  const perspectives: Perspective[] = [
    {
      id: 'rational',
      name: 'The Rational Mind',
      role: 'Logic and analysis',
      color: 'from-blue-500 to-cyan-500',
      avatar: '🧠'
    },
    {
      id: 'emotional',
      name: 'The Emotional Heart',
      role: 'Feelings and intuition',
      color: 'from-pink-500 to-red-500',
      avatar: '❤️'
    },
    {
      id: 'creative',
      name: 'The Creative Spirit',
      role: 'Innovation and possibilities',
      color: 'from-purple-500 to-pink-500',
      avatar: '✨'
    },
    {
      id: 'practical',
      name: 'The Practical Guide',
      role: 'Real-world application',
      color: 'from-green-500 to-teal-500',
      avatar: '⚙️'
    }
  ];

  const sampleDebates = [
    {
      id: 'career-change',
      title: 'Should I change careers?',
      description: 'Exploring a major life transition',
      status: 'active'
    },
    {
      id: 'relationship-conflict',
      title: 'How to handle relationship conflict',
      description: 'Processing interpersonal challenges',
      status: 'completed'
    },
    {
      id: 'life-purpose',
      title: 'Finding my life purpose',
      description: 'Deep existential exploration',
      status: 'draft'
    }
  ];

  const startDebate = (topic: string) => {
    setActiveDebate(topic);
    setIsDebateActive(true);
    setDebateMessages([]);
    
    // Simulate initial responses from each perspective
    setTimeout(() => {
      const initialMessages: DebateMessage[] = [
        {
          id: '1',
          perspectiveId: 'rational',
          message: `Let's analyze this systematically. What are the key factors we need to consider regarding "${topic}"?`,
          timestamp: new Date()
        },
        {
          id: '2',
          perspectiveId: 'emotional',
          message: `How does this make you feel? What does your gut instinct tell you about this situation?`,
          timestamp: new Date(Date.now() + 1000)
        },
        {
          id: '3',
          perspectiveId: 'creative',
          message: `What if we looked at this from a completely different angle? What possibilities haven't we considered?`,
          timestamp: new Date(Date.now() + 2000)
        },
        {
          id: '4',
          perspectiveId: 'practical',
          message: `What concrete steps can we take? What are the practical implications of each option?`,
          timestamp: new Date(Date.now() + 3000)
        }
      ];
      
      setDebateMessages(initialMessages);
    }, 1000);
  };

  const getPerspective = (id: string) => perspectives.find(p => p.id === id)!;

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            ThinkTank AI™ Inner Debate Room
          </h1>
          <p className="text-gray-300">Safe space for internal dialogue and cognitive processing</p>
        </div>
      </div>

      {!activeDebate ? (
        <>
          {/* New Debate Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Start New Inner Debate</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={debateTopic}
                onChange={(e) => setDebateTopic(e.target.value)}
                placeholder="What would you like to explore? (e.g., 'Should I move to a new city?')"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => debateTopic.trim() && startDebate(debateTopic)}
                disabled={!debateTopic.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Start Debate</span>
              </button>
            </div>
          </div>

          {/* Cognitive Quartet */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Your Cognitive Quartet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {perspectives.map((perspective) => (
                <div key={perspective.id} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${perspective.color} rounded-xl flex items-center justify-center mb-3 mx-auto text-2xl`}>
                    {perspective.avatar}
                  </div>
                  <h3 className="text-white font-semibold text-center mb-1">{perspective.name}</h3>
                  <p className="text-gray-400 text-sm text-center">{perspective.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Debates */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Previous Debates</h2>
            <div className="space-y-3">
              {sampleDebates.map((debate) => (
                <div key={debate.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{debate.title}</h3>
                      <p className="text-gray-400 text-sm">{debate.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        debate.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        debate.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {debate.status}
                      </span>
                      <button
                        onClick={() => startDebate(debate.title)}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Active Debate Interface */
        <div className="space-y-6">
          {/* Debate Header */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{activeDebate}</h2>
                <p className="text-gray-400">Your inner perspectives are discussing this topic</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsDebateActive(!isDebateActive)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isDebateActive 
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {isDebateActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isDebateActive ? 'Pause' : 'Resume'}</span>
                </button>
                <button
                  onClick={() => setActiveDebate(null)}
                  className="px-4 py-2 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-lg transition-colors"
                >
                  End Debate
                </button>
              </div>
            </div>
          </div>

          {/* Debate Messages */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 h-96 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Inner Dialogue</h3>
            </div>
            <div className="p-4 h-full overflow-y-auto space-y-4">
              {debateMessages.map((message) => {
                const perspective = getPerspective(message.perspectiveId);
                return (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${perspective.color} rounded-full flex items-center justify-center text-lg flex-shrink-0`}>
                      {perspective.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">{perspective.name}</span>
                        <span className="text-gray-500 text-xs">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Perspective Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {perspectives.map((perspective) => (
              <div key={perspective.id} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                <div className={`w-12 h-12 bg-gradient-to-br ${perspective.color} rounded-xl flex items-center justify-center mb-3 text-xl`}>
                  {perspective.avatar}
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{perspective.name}</h4>
                <p className="text-gray-400 text-xs mb-3">{perspective.role}</p>
                <div className="text-gray-300 text-xs">
                  {perspective.id === 'rational' && 'Analyzing pros and cons systematically...'}
                  {perspective.id === 'emotional' && 'Processing feelings and intuitive responses...'}
                  {perspective.id === 'creative' && 'Exploring innovative possibilities...'}
                  {perspective.id === 'practical' && 'Considering real-world implications...'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-white font-semibold mb-4">🧠 How ThinkTank AI™ Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Cognitive Quartet</h4>
            <p className="text-gray-300 text-sm">Four distinct perspectives represent different aspects of your thinking</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Safe Dialogue</h4>
            <p className="text-gray-300 text-sm">Explore internal conflicts in a structured, supportive environment</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-teal-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Integration</h4>
            <p className="text-gray-300 text-sm">Synthesize different viewpoints into coherent understanding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkTankAI;