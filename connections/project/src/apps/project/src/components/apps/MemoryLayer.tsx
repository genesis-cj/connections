import React, { useState } from 'react';
import { MemoryStick, Calendar, Filter, Search, Clock, Star, Trash2, Archive } from 'lucide-react';

const MemoryLayer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'timeline' | 'emotional' | 'importance'>('timeline');
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  const memories = [
    {
      id: '1',
      title: 'Peak Performance Achievement',
      emotion: 'joy',
      intensity: 95,
      timestamp: new Date('2024-01-15T14:30:00'),
      category: 'achievement',
      description: 'Successfully completed major project milestone with exceptional results',
      tags: ['work', 'success', 'confidence'],
      importance: 9,
    },
    {
      id: '2',
      title: 'Meditation Breakthrough',
      emotion: 'calm',
      intensity: 88,
      timestamp: new Date('2024-01-14T07:15:00'),
      category: 'wellness',
      description: 'Achieved deepest meditative state yet, lasting 45 minutes with perfect focus',
      tags: ['mindfulness', 'growth', 'peace'],
      importance: 8,
    },
    {
      id: '3',
      title: 'Creative Flow State',
      emotion: 'focus',
      intensity: 92,
      timestamp: new Date('2024-01-13T16:45:00'),
      category: 'creativity',
      description: 'Experienced intense creative flow while working on artistic project',
      tags: ['creativity', 'flow', 'inspiration'],
      importance: 8,
    },
    {
      id: '4',
      title: 'Social Connection Moment',
      emotion: 'joy',
      intensity: 78,
      timestamp: new Date('2024-01-12T19:20:00'),
      category: 'social',
      description: 'Deep meaningful conversation with close friend, felt truly understood',
      tags: ['friendship', 'connection', 'empathy'],
      importance: 7,
    },
    {
      id: '5',
      title: 'Stress Response Learning',
      emotion: 'stress',
      intensity: 65,
      timestamp: new Date('2024-01-11T11:30:00'),
      category: 'learning',
      description: 'Recognized stress patterns early and applied coping strategies effectively',
      tags: ['stress-management', 'self-awareness', 'growth'],
      importance: 9,
    },
  ];

  const getEmotionColor = (emotion: string) => {
    const colors = {
      joy: 'from-yellow-400 to-orange-400',
      calm: 'from-blue-400 to-cyan-400',
      focus: 'from-purple-400 to-indigo-400',
      energy: 'from-green-400 to-teal-400',
      stress: 'from-red-400 to-pink-400',
    };
    return colors[emotion as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement': return '🏆';
      case 'wellness': return '🧘';
      case 'creativity': return '🎨';
      case 'social': return '👥';
      case 'learning': return '📚';
      default: return '💭';
    }
  };

  const sortedMemories = [...memories].sort((a, b) => {
    switch (viewMode) {
      case 'timeline':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'emotional':
        return b.intensity - a.intensity;
      case 'importance':
        return b.importance - a.importance;
      default:
        return 0;
    }
  });

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Memory Layer</h2>
          <p className="text-gray-400">Your emotional memory archive and pattern recognition</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-white/10 rounded-lg p-1">
            {[
              { mode: 'timeline', label: 'Timeline', icon: Clock },
              { mode: 'emotional', label: 'Emotional', icon: Star },
              { mode: 'importance', label: 'Important', icon: Filter },
            ].map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                  viewMode === mode
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search memories..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Last 30 days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Memory List */}
        <div className="lg:col-span-2 space-y-4 max-h-96 overflow-y-auto">
          {sortedMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemory(memory.id)}
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all cursor-pointer ${
                selectedMemory === memory.id
                  ? 'border-purple-500/50 bg-purple-500/10'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{getCategoryIcon(memory.category)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold">{memory.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: memory.importance }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{memory.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getEmotionColor(memory.emotion)} bg-opacity-20`}>
                        <span className="text-xs capitalize text-white">{memory.emotion}</span>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {memory.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-full bg-white/10 rounded-full h-1 w-16`}>
                        <div
                          className={`h-1 bg-gradient-to-r ${getEmotionColor(memory.emotion)} rounded-full`}
                          style={{ width: `${memory.intensity}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-xs">{memory.intensity}%</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {memory.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Memory Details */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          {selectedMemory ? (
            <div>
              {(() => {
                const memory = memories.find(m => m.id === selectedMemory);
                if (!memory) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Memory Details</h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Archive className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm">Title</label>
                        <div className="text-white font-medium">{memory.title}</div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">Emotional State</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getEmotionColor(memory.emotion)}`}></div>
                          <span className="text-white capitalize">{memory.emotion}</span>
                          <span className="text-gray-400">({memory.intensity}%)</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">Timestamp</label>
                        <div className="text-white">{memory.timestamp.toLocaleString()}</div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">Category</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg">{getCategoryIcon(memory.category)}</span>
                          <span className="text-white capitalize">{memory.category}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">Description</label>
                        <div className="text-white text-sm leading-relaxed mt-1">{memory.description}</div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">Tags</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {memory.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">Importance Score</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < memory.importance
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white">{memory.importance}/10</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <MemoryStick className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a memory to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryLayer;