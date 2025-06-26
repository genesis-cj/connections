import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MemoryStick, Brain, Heart, Zap, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';

const EmotionalMemoryLayer: React.FC = () => {
  const navigate = useNavigate();
  const { 
    emotionalHistory, 
    addEmotionalEntry, 
    startECCProtocol, 
    completeECCStage,
    disambiguateEmotion,
    checkConnectionGap,
    checkCompassionateLoad
  } = useEmotionalContext();

  const [newEntry, setNewEntry] = useState({
    emotion: '',
    intensity: 50,
    context: '',
    note: ''
  });
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [showECCProtocol, setShowECCProtocol] = useState(false);

  const eccStages = [
    { id: 'recognize', name: 'Recognize', description: 'Identify and name the emotion', icon: Brain },
    { id: 'classify', name: 'Classify', description: 'Understand the type and nuance', icon: MemoryStick },
    { id: 'regulate', name: 'Regulate', description: 'Ground and stabilize your system', icon: Heart },
    { id: 'process', name: 'Process', description: 'Explore underlying needs and beliefs', icon: Zap },
    { id: 'release', name: 'Release', description: 'Let go and integrate the learning', icon: CheckCircle }
  ];

  const handleAddEntry = () => {
    if (newEntry.emotion && newEntry.context) {
      addEmotionalEntry(newEntry.emotion, newEntry.intensity, newEntry.context, newEntry.note);
      setNewEntry({ emotion: '', intensity: 50, context: '', note: '' });
    }
  };

  const handleStartECC = (entryId: string) => {
    startECCProtocol(entryId);
    setSelectedEntry(entryId);
    setShowECCProtocol(true);
  };

  const selectedEntryData = emotionalHistory.find(entry => entry.id === selectedEntry);

  const getStageColor = (stage: string) => {
    const colors = {
      recognize: 'from-blue-500 to-cyan-500',
      classify: 'from-purple-500 to-blue-500',
      regulate: 'from-green-500 to-teal-500',
      process: 'from-orange-500 to-red-500',
      release: 'from-pink-500 to-purple-500'
    };
    return colors[stage as keyof typeof colors] || 'from-gray-500 to-slate-500';
  };

  const connectionGap = checkConnectionGap();
  const compassionateLoad = checkCompassionateLoad();

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
            Emotional Memory Layer
          </h1>
          <p className="text-gray-300">Process and integrate emotional memories using E.C.C. Protocol</p>
        </div>
      </div>

      {/* Diagnostic Alerts */}
      {(connectionGap || compassionateLoad) && (
        <div className="mb-8 space-y-4">
          {connectionGap && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h4 className="text-blue-400 font-semibold mb-2">🔗 Connection Gap Detected</h4>
              <p className="text-gray-300 text-sm">{connectionGap}</p>
            </div>
          )}
          {compassionateLoad && (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <h4 className="text-orange-400 font-semibold mb-2">💝 Compassionate Load Alert</h4>
              <p className="text-gray-300 text-sm">{compassionateLoad}</p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Memory */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">📝 Log Emotional Memory</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Emotion</label>
              <input
                type="text"
                value={newEntry.emotion}
                onChange={(e) => setNewEntry(prev => ({ ...prev, emotion: e.target.value }))}
                placeholder="What emotion are you experiencing?"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {newEntry.emotion && (
                <div className="mt-2 text-sm text-gray-400">
                  <strong>Possible nuances:</strong> {disambiguateEmotion(newEntry.emotion).join(', ')}
                </div>
              )}
            </div>
            
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Intensity: {newEntry.intensity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={newEntry.intensity}
                onChange={(e) => setNewEntry(prev => ({ ...prev, intensity: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Context</label>
              <input
                type="text"
                value={newEntry.context}
                onChange={(e) => setNewEntry(prev => ({ ...prev, context: e.target.value }))}
                placeholder="What triggered this emotion?"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Note (optional)</label>
              <textarea
                value={newEntry.note}
                onChange={(e) => setNewEntry(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Additional thoughts or observations..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows={3}
              />
            </div>
            
            <button
              onClick={handleAddEntry}
              disabled={!newEntry.emotion || !newEntry.context}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all"
            >
              Log Memory
            </button>
          </div>
        </div>

        {/* Memory History */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">🧠 Memory History</h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {emotionalHistory.length === 0 ? (
              <div className="text-center py-8">
                <MemoryStick className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No emotional memories logged yet</p>
              </div>
            ) : (
              emotionalHistory.slice().reverse().map((entry) => (
                <div key={entry.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold capitalize">{entry.emotion}</h4>
                      <p className="text-gray-400 text-sm">{entry.context}</p>
                      {entry.note && (
                        <p className="text-gray-300 text-sm mt-1 italic">"{entry.note}"</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{entry.intensity}%</div>
                      <div className="text-gray-500 text-xs">
                        {entry.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      entry.processed 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {entry.processed ? 'Processed' : `ECC: ${entry.eccStage}`}
                    </div>
                    
                    {!entry.processed && (
                      <button
                        onClick={() => handleStartECC(entry.id)}
                        className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors text-sm"
                      >
                        <Play className="w-3 h-3" />
                        <span>Process</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* E.C.C. Protocol Modal */}
      {showECCProtocol && selectedEntryData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl border border-white/10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">E.C.C. Protocol</h3>
              <button
                onClick={() => setShowECCProtocol(false)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6 bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-2">Processing Memory:</h4>
              <p className="text-gray-300 capitalize">
                <strong>{selectedEntryData.emotion}</strong> ({selectedEntryData.intensity}%) - {selectedEntryData.context}
              </p>
            </div>
            
            <div className="space-y-4">
              {eccStages.map((stage, index) => {
                const isActive = selectedEntryData.eccStage === stage.id;
                const isCompleted = eccStages.findIndex(s => s.id === selectedEntryData.eccStage) > index;
                
                return (
                  <div key={stage.id} className={`border rounded-xl p-4 transition-all ${
                    isActive ? 'border-orange-500/50 bg-orange-500/10' :
                    isCompleted ? 'border-green-500/50 bg-green-500/10' :
                    'border-white/10 bg-white/5'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500/20' :
                        isActive ? 'bg-orange-500/20' :
                        'bg-white/10'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <stage.icon className={`w-6 h-6 ${
                            isActive ? 'text-orange-400' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h5 className={`font-semibold ${
                          isActive ? 'text-orange-400' :
                          isCompleted ? 'text-green-400' :
                          'text-gray-400'
                        }`}>
                          {stage.name}
                        </h5>
                        <p className="text-gray-300 text-sm">{stage.description}</p>
                      </div>
                      
                      {isActive && (
                        <button
                          onClick={() => {
                            const nextStageIndex = eccStages.findIndex(s => s.id === stage.id) + 1;
                            const nextStage = nextStageIndex < eccStages.length 
                              ? eccStages[nextStageIndex].id 
                              : 'complete';
                            completeECCStage(selectedEntryData.id, nextStage as any);
                          }}
                          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <span>Complete</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* E.C.C. Protocol Info */}
      <div className="mt-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
        <h3 className="text-white font-semibold mb-4">🔄 E.C.C. Protocol (Emotional Cycle Completion)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {eccStages.map((stage) => (
            <div key={stage.id} className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${getStageColor(stage.id)} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stage.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-medium mb-1">{stage.name}</h4>
              <p className="text-gray-300 text-xs">{stage.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-300 text-sm">
            The E.C.C. Protocol helps you process emotions completely, preventing them from becoming stuck patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionalMemoryLayer;