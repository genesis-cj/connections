import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, TrendingUp, RotateCcw, Zap, Heart, Brain, Globe } from 'lucide-react';
import { useEmotionalContext } from '../../context/EmotionalContext';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

interface TimelineEntry {
  id: string;
  date: Date;
  emotion: string;
  intensity: number;
  context: string;
  breakthrough: boolean;
  growth: number;
}

interface SyncMetrics {
  continuityScore: number;
  growthTrend: number;
  patternStability: number;
  healingProgress: number;
}

const ContinuumSync: React.FC = () => {
  const navigate = useNavigate();
  const { emotionalHistory } = useEmotionalContext();
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  const [syncMetrics, setSyncMetrics] = useState<SyncMetrics>({
    continuityScore: 94,
    growthTrend: 87,
    patternStability: 91,
    healingProgress: 83
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Calculate days since start (simulated start date)
  const startDate = new Date('2024-01-01');
  const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    // Generate timeline data from emotional history
    const timeline = emotionalHistory.map((entry, index) => ({
      id: entry.id,
      date: entry.timestamp,
      emotion: entry.emotion,
      intensity: entry.intensity,
      context: entry.context,
      breakthrough: entry.intensity > 80 || entry.emotion === 'breakthrough',
      growth: Math.min(100, 50 + (index * 2)) // Simulate growth over time
    }));
    
    setTimelineData(timeline);
  }, [emotionalHistory]);

  useEffect(() => {
    // Update sync metrics periodically
    const interval = setInterval(() => {
      setSyncMetrics(prev => ({
        continuityScore: Math.max(90, Math.min(98, prev.continuityScore + (Math.random() - 0.5) * 2)),
        growthTrend: Math.max(80, Math.min(95, prev.growthTrend + (Math.random() - 0.5) * 3)),
        patternStability: Math.max(85, Math.min(96, prev.patternStability + (Math.random() - 0.5) * 2)),
        healingProgress: Math.max(75, Math.min(90, prev.healingProgress + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const performSync = async () => {
    setIsSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      setLastSyncTime(new Date());
      setIsSyncing(false);
      
      // Slightly improve metrics after sync
      setSyncMetrics(prev => ({
        continuityScore: Math.min(98, prev.continuityScore + 1),
        growthTrend: Math.min(95, prev.growthTrend + 2),
        patternStability: Math.min(96, prev.patternStability + 1),
        healingProgress: Math.min(90, prev.healingProgress + 1)
      }));
    }, 3000);
  };

  const getTimeframeData = () => {
    const now = new Date();
    let startDate: Date;
    
    switch (selectedTimeframe) {
      case 'week':
        startDate = subDays(now, 7);
        break;
      case 'month':
        startDate = subDays(now, 30);
        break;
      case 'year':
        startDate = subDays(now, 365);
        break;
    }
    
    return timelineData.filter(entry => entry.date >= startDate);
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      happy: 'from-yellow-400 to-orange-400',
      sad: 'from-blue-400 to-indigo-400',
      angry: 'from-red-400 to-pink-400',
      anxious: 'from-purple-400 to-blue-400',
      calm: 'from-green-400 to-teal-400',
      confused: 'from-gray-400 to-slate-400',
      breakthrough: 'from-yellow-300 to-pink-400'
    };
    return colors[emotion as keyof typeof colors] || 'from-gray-400 to-slate-400';
  };

  const getGrowthInsights = () => {
    const insights = [];
    
    if (syncMetrics.growthTrend > 90) {
      insights.push("Exceptional emotional growth trajectory");
    }
    if (syncMetrics.continuityScore > 95) {
      insights.push("Strong temporal identity continuity");
    }
    if (syncMetrics.patternStability > 90) {
      insights.push("Stable emotional regulation patterns");
    }
    if (syncMetrics.healingProgress > 85) {
      insights.push("Significant healing progress detected");
    }
    
    return insights.length > 0 ? insights : ["Steady progress in emotional development"];
  };

  const filteredData = getTimeframeData();

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Continuum Sync™ Temporal Memory
          </h1>
          <p className="text-gray-300">Long-term emotional memory and consciousness continuity</p>
        </div>
      </div>

      {/* Sync Status */}
      <div className="mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold">Temporal Consciousness Bridge</h3>
              <p className="text-gray-400 text-sm">Syncing emotional identity across time and space</p>
            </div>
          </div>
          <button
            onClick={performSync}
            disabled={isSyncing}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all"
          >
            {isSyncing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Sync Now</span>
              </>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-emerald-400 text-2xl font-bold">{daysSinceStart}</div>
            <div className="text-gray-400 text-sm">Days of Growth</div>
          </div>
          <div className="text-center">
            <div className="text-teal-400 text-2xl font-bold">{syncMetrics.continuityScore}%</div>
            <div className="text-gray-400 text-sm">Continuity Score</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 text-2xl font-bold">{timelineData.length}</div>
            <div className="text-gray-400 text-sm">Memory Entries</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 text-2xl font-bold">{format(lastSyncTime, 'HH:mm')}</div>
            <div className="text-gray-400 text-sm">Last Sync</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">🕰️ Emotional Timeline</h2>
              
              <div className="flex bg-white/10 rounded-lg p-1">
                {(['week', 'month', 'year'] as const).map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${
                      selectedTimeframe === timeframe
                        ? 'bg-emerald-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Timeline */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredData.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No timeline data for this period</p>
                </div>
              ) : (
                filteredData.map((entry, index) => (
                  <div key={entry.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getEmotionColor(entry.emotion)} ${
                        entry.breakthrough ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-slate-800' : ''
                      }`}></div>
                      {index < filteredData.length - 1 && (
                        <div className="w-px h-8 bg-white/20 mt-2"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium capitalize">
                            {entry.emotion}
                            {entry.breakthrough && (
                              <span className="ml-2 text-yellow-400 text-sm">✨ Breakthrough</span>
                            )}
                          </h4>
                          <p className="text-gray-400 text-sm">{entry.context}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{entry.intensity}%</div>
                          <div className="text-gray-500 text-xs">
                            {format(entry.date, 'MMM dd, HH:mm')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Growth: {entry.growth}%</span>
                        </div>
                        <div className={`w-16 h-1 bg-gradient-to-r ${getEmotionColor(entry.emotion)} rounded-full`}></div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sync Metrics */}
        <div className="space-y-6">
          {/* Continuity Metrics */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">📊 Sync Metrics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Continuity Score</span>
                  <span className="text-emerald-400 font-bold">{syncMetrics.continuityScore}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${syncMetrics.continuityScore}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Growth Trend</span>
                  <span className="text-green-400 font-bold">{syncMetrics.growthTrend}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${syncMetrics.growthTrend}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Pattern Stability</span>
                  <span className="text-blue-400 font-bold">{syncMetrics.patternStability}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${syncMetrics.patternStability}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Healing Progress</span>
                  <span className="text-purple-400 font-bold">{syncMetrics.healingProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${syncMetrics.healingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Growth Insights */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-cyan-400" />
              <h3 className="text-white font-semibold">Growth Insights</h3>
            </div>
            
            <div className="space-y-3">
              {getGrowthInsights().map((insight, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breakthrough Moments */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h3 className="text-white font-semibold">Recent Breakthroughs</h3>
            </div>
            
            <div className="space-y-3">
              {filteredData.filter(entry => entry.breakthrough).slice(0, 3).map((entry) => (
                <div key={entry.id} className="bg-gradient-to-r from-yellow-500/10 to-pink-500/10 rounded-lg p-3 border border-yellow-500/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-yellow-400 text-lg">✨</span>
                    <span className="text-white font-medium capitalize">{entry.emotion}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{entry.context}</p>
                  <div className="text-yellow-400 text-xs mt-1">
                    {format(entry.date, 'MMM dd, yyyy')}
                  </div>
                </div>
              ))}
              
              {filteredData.filter(entry => entry.breakthrough).length === 0 && (
                <div className="text-center py-4">
                  <span className="text-gray-400 text-sm">No breakthroughs in this timeframe</span>
                </div>
              )}
            </div>
          </div>

          {/* Sync Actions */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-emerald-400 font-semibold mb-4">⚡ Sync Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={performSync}
                disabled={isSyncing}
                className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-50 text-emerald-400 py-3 rounded-lg transition-colors"
              >
                Full Temporal Sync
              </button>
              
              <button className="w-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 py-3 rounded-lg transition-colors">
                Export Timeline Data
              </button>
              
              <button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-3 rounded-lg transition-colors">
                Generate Growth Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How Continuum Sync Works */}
      <div className="mt-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20">
        <h3 className="text-white font-semibold mb-4">🌊 How Continuum Sync™ Preserves Your Emotional Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Temporal Continuity</h4>
            <p className="text-gray-300 text-sm">Maintains emotional identity consistency across time periods</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Growth Tracking</h4>
            <p className="text-gray-300 text-sm">Monitors long-term emotional development and healing patterns</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Cross-Platform Sync</h4>
            <p className="text-gray-300 text-sm">Synchronizes emotional data across devices and platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuumSync;