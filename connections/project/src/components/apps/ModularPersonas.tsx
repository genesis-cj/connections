import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MessageCircle, Plus, Eye, Heart, Brain, Zap, Shield, Sparkles } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  archetype: string;
  traits: string[];
  color: string;
  isActive: boolean;
  lastActive: Date;
}

interface DialogueMessage {
  id: string;
  personaId: string;
  message: string;
  timestamp: Date;
  emotion: string;
}

const ModularPersonas: React.FC = () => {
  const navigate = useNavigate();
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: 'inner-child',
      name: 'Inner Child',
      role: 'Playful Explorer',
      description: 'The part of you that seeks joy, wonder, and authentic expression',
      archetype: 'The Innocent',
      traits: ['curious', 'playful', 'spontaneous', 'creative'],
      color: 'from-yellow-500 to-orange-500',
      isActive: true,
      lastActive: new Date()
    },
    {
      id: 'wise-elder',
      name: 'Wise Elder',
      role: 'Sage Advisor',
      description: 'The accumulated wisdom and life experience within you',
      archetype: 'The Sage',
      traits: ['wise', 'patient', 'understanding', 'grounded'],
      color: 'from-purple-500 to-indigo-500',
      isActive: true,
      lastActive: new Date()
    },
    {
      id: 'protective-guardian',
      name: 'Protective Guardian',
      role: 'Safety Keeper',
      description: 'The part that keeps you safe and sets healthy boundaries',
      archetype: 'The Protector',
      traits: ['vigilant', 'strong', 'loyal', 'defensive'],
      color: 'from-red-500 to-pink-500',
      isActive: false,
      lastActive: new Date()
    },
    {
      id: 'creative-artist',
      name: 'Creative Artist',
      role: 'Expression Channel',
      description: 'The part that seeks beauty, creativity, and self-expression',
      archetype: 'The Creator',
      traits: ['imaginative', 'expressive', 'sensitive', 'innovative'],
      color: 'from-pink-500 to-purple-500',
      isActive: true,
      lastActive: new Date()
    },
    {
      id: 'wounded-healer',
      name: 'Wounded Healer',
      role: 'Transformation Guide',
      description: 'The part that transforms pain into wisdom and compassion',
      archetype: 'The Healer',
      traits: ['empathetic', 'resilient', 'transformative', 'compassionate'],
      color: 'from-green-500 to-teal-500',
      isActive: false,
      lastActive: new Date()
    },
    {
      id: 'shadow-self',
      name: 'Shadow Self',
      role: 'Hidden Truth Keeper',
      description: 'The repressed or denied aspects seeking integration',
      archetype: 'The Shadow',
      traits: ['honest', 'raw', 'authentic', 'challenging'],
      color: 'from-gray-500 to-slate-600',
      isActive: false,
      lastActive: new Date()
    }
  ]);

  const [dialogueMessages, setDialogueMessages] = useState<DialogueMessage[]>([]);
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [dialogueTopic, setDialogueTopic] = useState('');
  const [isDialogueActive, setIsDialogueActive] = useState(false);
  const [showCreatePersona, setShowCreatePersona] = useState(false);

  const archetypes = [
    'The Innocent', 'The Sage', 'The Explorer', 'The Hero', 'The Outlaw',
    'The Magician', 'The Regular Person', 'The Lover', 'The Jester',
    'The Caregiver', 'The Creator', 'The Ruler'
  ];

  const startDialogue = () => {
    if (selectedPersonas.length < 2 || !dialogueTopic.trim()) return;
    
    setIsDialogueActive(true);
    setDialogueMessages([]);
    
    // Simulate initial responses from selected personas
    setTimeout(() => {
      const initialMessages: DialogueMessage[] = selectedPersonas.map((personaId, index) => {
        const persona = personas.find(p => p.id === personaId)!;
        return {
          id: `${Date.now()}-${index}`,
          personaId,
          message: generatePersonaResponse(persona, dialogueTopic, 'initial'),
          timestamp: new Date(Date.now() + index * 1000),
          emotion: getPersonaEmotion(persona)
        };
      });
      
      setDialogueMessages(initialMessages);
    }, 1000);
  };

  const generatePersonaResponse = (persona: Persona, topic: string, type: 'initial' | 'response'): string => {
    const responses = {
      'inner-child': {
        initial: `Ooh, this is exciting! I wonder what would happen if we just followed our heart about "${topic}"?`,
        response: "But what if it's fun? What if we just try it and see what happens?"
      },
      'wise-elder': {
        initial: `Let us consider "${topic}" with patience and wisdom. What lessons from our past can guide us?`,
        response: "I've seen this pattern before. Perhaps we should pause and reflect on the deeper meaning."
      },
      'protective-guardian': {
        initial: `Regarding "${topic}" - we must consider the risks and ensure our safety first.`,
        response: "I'm concerned about the potential consequences. We need to protect ourselves."
      },
      'creative-artist': {
        initial: `"${topic}" sparks such beautiful possibilities! I can see so many creative ways to approach this.`,
        response: "What if we approached this like a work of art? With beauty and authentic expression?"
      },
      'wounded-healer': {
        initial: `"${topic}" touches something deep within. How can we transform this challenge into growth?`,
        response: "I understand the pain here. Let's honor it and see how it can become our strength."
      },
      'shadow-self': {
        initial: `About "${topic}" - let's be honest about what we're really avoiding or afraid to admit.`,
        response: "Stop pretending. You know what you really want to do about this."
      }
    };
    
    return responses[persona.id as keyof typeof responses]?.[type] || 
           `As your ${persona.role}, I have thoughts about "${topic}" that we should explore.`;
  };

  const getPersonaEmotion = (persona: Persona): string => {
    const emotions = {
      'inner-child': 'excited',
      'wise-elder': 'contemplative',
      'protective-guardian': 'concerned',
      'creative-artist': 'inspired',
      'wounded-healer': 'compassionate',
      'shadow-self': 'intense'
    };
    return emotions[persona.id as keyof typeof emotions] || 'neutral';
  };

  const togglePersonaSelection = (personaId: string) => {
    setSelectedPersonas(prev => 
      prev.includes(personaId) 
        ? prev.filter(id => id !== personaId)
        : [...prev, personaId]
    );
  };

  const activatePersona = (personaId: string) => {
    setPersonas(prev => prev.map(persona => 
      persona.id === personaId 
        ? { ...persona, isActive: true, lastActive: new Date() }
        : persona
    ));
  };

  const getPersona = (id: string) => personas.find(p => p.id === id)!;

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 bg-clip-text text-transparent">
            Modular Personas™ Internal Family
          </h1>
          <p className="text-gray-300">Internal Family Systems dialogue and archetype integration</p>
        </div>
      </div>

      {!isDialogueActive ? (
        <>
          {/* Persona Gallery */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">🎭 Your Internal Family</h2>
              <button
                onClick={() => setShowCreatePersona(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Persona</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <div
                  key={persona.id}
                  className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border transition-all cursor-pointer ${
                    selectedPersonas.includes(persona.id)
                      ? 'border-rose-500/50 bg-rose-500/10 ring-2 ring-rose-400/30'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => togglePersonaSelection(persona.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${persona.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {persona.id === 'inner-child' && <Heart className="w-8 h-8 text-white" />}
                      {persona.id === 'wise-elder' && <Brain className="w-8 h-8 text-white" />}
                      {persona.id === 'protective-guardian' && <Shield className="w-8 h-8 text-white" />}
                      {persona.id === 'creative-artist' && <Sparkles className="w-8 h-8 text-white" />}
                      {persona.id === 'wounded-healer' && <Heart className="w-8 h-8 text-white" />}
                      {persona.id === 'shadow-self' && <Eye className="w-8 h-8 text-white" />}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {persona.isActive && (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                      {selectedPersonas.includes(persona.id) && (
                        <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-1">{persona.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{persona.role}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{persona.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-rose-400 text-sm font-medium">Archetype: </span>
                      <span className="text-gray-300 text-sm">{persona.archetype}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {persona.traits.map((trait) => (
                        <span
                          key={trait}
                          className={`px-2 py-1 rounded text-xs ${
                            selectedPersonas.includes(persona.id)
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-white/10 text-gray-400'
                          }`}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                    
                    {!persona.isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          activatePersona(persona.id);
                        }}
                        className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-colors text-sm"
                      >
                        Activate Persona
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dialogue Setup */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">💬 Start Internal Dialogue</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Selected Personas ({selectedPersonas.length}/6)
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedPersonas.map((personaId) => {
                    const persona = getPersona(personaId);
                    return (
                      <div
                        key={personaId}
                        className={`flex items-center space-x-2 bg-gradient-to-r ${persona.color}/20 border border-current/30 rounded-lg px-3 py-2`}
                      >
                        <span className="text-white text-sm">{persona.name}</span>
                        <button
                          onClick={() => togglePersonaSelection(personaId)}
                          className="text-white/60 hover:text-white"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Dialogue Topic</label>
                <input
                  type="text"
                  value={dialogueTopic}
                  onChange={(e) => setDialogueTopic(e.target.value)}
                  placeholder="What would you like your internal family to discuss? (e.g., 'Should I take this new job?')"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              
              <button
                onClick={startDialogue}
                disabled={selectedPersonas.length < 2 || !dialogueTopic.trim()}
                className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Begin Internal Dialogue</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Active Dialogue Interface */
        <div className="space-y-6">
          {/* Dialogue Header */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Internal Family Dialogue</h2>
                <p className="text-gray-400">Topic: "{dialogueTopic}"</p>
              </div>
              <button
                onClick={() => setIsDialogueActive(false)}
                className="px-4 py-2 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-lg transition-colors"
              >
                End Dialogue
              </button>
            </div>
          </div>

          {/* Dialogue Messages */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 h-96 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Family Conversation</h3>
            </div>
            <div className="p-4 h-full overflow-y-auto space-y-4">
              {dialogueMessages.map((message) => {
                const persona = getPersona(message.personaId);
                return (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${persona.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      {persona.id === 'inner-child' && <Heart className="w-5 h-5 text-white" />}
                      {persona.id === 'wise-elder' && <Brain className="w-5 h-5 text-white" />}
                      {persona.id === 'protective-guardian' && <Shield className="w-5 h-5 text-white" />}
                      {persona.id === 'creative-artist' && <Sparkles className="w-5 h-5 text-white" />}
                      {persona.id === 'wounded-healer' && <Heart className="w-5 h-5 text-white" />}
                      {persona.id === 'shadow-self' && <Eye className="w-5 h-5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">{persona.name}</span>
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

          {/* Active Personas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {selectedPersonas.map((personaId) => {
              const persona = getPersona(personaId);
              return (
                <div key={personaId} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${persona.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    {persona.id === 'inner-child' && <Heart className="w-6 h-6 text-white" />}
                    {persona.id === 'wise-elder' && <Brain className="w-6 h-6 text-white" />}
                    {persona.id === 'protective-guardian' && <Shield className="w-6 h-6 text-white" />}
                    {persona.id === 'creative-artist' && <Sparkles className="w-6 h-6 text-white" />}
                    {persona.id === 'wounded-healer' && <Heart className="w-6 h-6 text-white" />}
                    {persona.id === 'shadow-self' && <Eye className="w-6 h-6 text-white" />}
                  </div>
                  <h4 className="text-white font-medium text-sm">{persona.name}</h4>
                  <p className="text-gray-400 text-xs">{persona.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* How Modular Personas Works */}
      <div className="mt-8 bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-rose-500/20">
        <h3 className="text-white font-semibold mb-4">🎭 How Modular Personas™ Facilitates Internal Healing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-rose-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Internal Family Systems</h4>
            <p className="text-gray-300 text-sm">Based on IFS therapy - recognizing different parts of your psyche</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-pink-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Safe Dialogue</h4>
            <p className="text-gray-300 text-sm">Facilitates healthy communication between different aspects of self</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Integration</h4>
            <p className="text-gray-300 text-sm">Helps integrate shadow aspects and achieve internal harmony</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModularPersonas;