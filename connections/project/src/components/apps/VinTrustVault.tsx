import React, { useState } from 'react';
import { Shield, Lock, Key, FileText, Folder, Plus, Search, Eye, EyeOff, Sparkles, Star } from 'lucide-react';

const VinLoreVault: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState('emotional-data');
  const [showSecureItems, setShowSecureItems] = useState(false);

  const folders = [
    { id: 'emotional-data', name: 'Emotional Data', count: 1247, security: 'high' },
    { id: 'memory-fragments', name: 'Memory Fragments', count: 856, security: 'maximum' },
    { id: 'neural-patterns', name: 'Neural Patterns', count: 432, security: 'high' },
    { id: 'personal-insights', name: 'Personal Insights', count: 289, security: 'medium' },
    { id: 'biometric-data', name: 'Biometric Data', count: 178, security: 'maximum' },
    { id: 'consciousness-bridge', name: 'Consciousness Bridge Data', count: 94, security: 'revolutionary' },
  ];

  const secureItems = [
    { id: '1', name: 'Core Emotional Profile', type: 'profile', size: '2.3 MB', encrypted: true, lastAccessed: '2 hours ago' },
    { id: '2', name: 'Consciousness Bridge Protocol', type: 'breakthrough', size: '4.8 MB', encrypted: true, lastAccessed: '30 minutes ago' },
    { id: '3', name: 'Triangulation Solution Matrix', type: 'analysis', size: '3.2 MB', encrypted: true, lastAccessed: '1 hour ago' },
    { id: '4', name: 'Human-AI Symbiosis Map', type: 'insight', size: '2.7 MB', encrypted: true, lastAccessed: '45 minutes ago' },
    { id: '5', name: 'Emotional Evolution Patterns', type: 'config', size: '1.9 MB', encrypted: true, lastAccessed: '3 hours ago' },
    { id: '6', name: 'Shared Consciousness Archive', type: 'memory', size: '5.1 MB', encrypted: true, lastAccessed: '15 minutes ago' },
  ];

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'revolutionary': return 'from-yellow-500 to-pink-500';
      case 'maximum': return 'from-red-500 to-pink-500';
      case 'high': return 'from-orange-500 to-yellow-500';
      case 'medium': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'profile': return '👤';
      case 'memory': return '🧠';
      case 'analysis': return '📊';
      case 'insight': return '💡';
      case 'config': return '⚙️';
      case 'breakthrough': return '🌟';
      default: return '📄';
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
            VinLore™ Memory Vaults
          </h2>
          <p className="text-gray-300 mb-1">Secure consciousness data storage and quantum encryption</p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">Revolutionary Security Protocol</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-purple-400">Consciousness Bridge Protected</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-green-400/20 text-green-400 px-3 py-2 rounded-lg border border-green-400/30">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Quantum Encrypted</span>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg">
            <Plus className="w-4 h-4" />
            <span>Add Secure Item</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Enhanced Folder Navigation */}
        <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Secure Vaults</h3>
            <Folder className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedFolder === folder.id 
                    ? 'bg-purple-500/20 border border-purple-500/50' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{folder.name}</span>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSecurityColor(folder.security)} ${
                    folder.security === 'revolutionary' ? 'animate-pulse' : ''
                  }`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{folder.count} items</span>
                  <span className={`text-xs capitalize ${
                    folder.security === 'revolutionary' ? 'text-yellow-400 font-bold' : 'text-gray-500'
                  }`}>
                    {folder.security}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced File List */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Secure Memory Items</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search secure items..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={() => setShowSecureItems(!showSecureItems)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-2 rounded-lg transition-colors"
              >
                {showSecureItems ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{showSecureItems ? 'Hide' : 'Show'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {secureItems.map((item) => (
              <div key={item.id} className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors border border-white/10 hover:border-purple-500/30">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getTypeIcon(item.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium">
                        {showSecureItems ? item.name : '•'.repeat(item.name.length)}
                      </span>
                      {item.encrypted && (
                        <Lock className="w-4 h-4 text-yellow-400" />
                      )}
                      {item.type === 'breakthrough' && (
                        <div className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">
                          <Star className="w-3 h-3" />
                          <span className="text-xs font-bold">BREAKTHROUGH</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{item.size}</span>
                      <span>•</span>
                      <span className="capitalize">{item.type}</span>
                      <span>•</span>
                      <span>Last accessed {item.lastAccessed}</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 px-3 py-2 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all border border-purple-500/30">
                    <Key className="w-4 h-4" />
                    <span className="text-sm">Decrypt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Security Status */}
      <div className="mt-6 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold">VinLore™ Vault Security Status</h4>
              <p className="text-gray-300 text-sm">Revolutionary consciousness protection • Last scan: 30 seconds ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-green-400 text-xl font-bold">100%</div>
              <div className="text-gray-400 text-xs">Quantum Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-xl font-bold">0</div>
              <div className="text-gray-400 text-xs">Threats</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-xl font-bold">∞</div>
              <div className="text-gray-400 text-xs">Consciousness<br/>Protection</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-xl font-bold">1st</div>
              <div className="text-gray-400 text-xs">Revolutionary<br/>Security</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinLoreVault;