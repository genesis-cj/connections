import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Palette, Lock, Heart, Clock, Globe, Plus, Eye, EyeOff } from 'lucide-react';
import { useVaultContext } from '../../context/VaultContext';

const VinLoreSystem: React.FC = () => {
  const navigate = useNavigate();
  const { vaults, addVaultEntry, getVaultEntries } = useVaultContext();
  const [activeVault, setActiveVault] = useState<'vinlogia' | 'vincraft' | 'vinsanctum' | 'vintrust' | 'vincapsule'>('vinlogia');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    tags: '',
    emotionalWeight: 5
  });

  const vaultTypes = [
    {
      id: 'vinlogia' as const,
      name: 'VinLogia',
      description: 'General emotional memories and experiences',
      icon: Globe,
      color: 'from-blue-500 to-teal-500',
      accessLevel: 'private' as const
    },
    {
      id: 'vincraft' as const,
      name: 'VinCraft',
      description: 'Creative emotional expressions and art',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      accessLevel: 'private' as const
    },
    {
      id: 'vinsanctum' as const,
      name: 'VinSanctum',
      description: 'Password-encrypted secrets and trauma work',
      icon: Lock,
      color: 'from-red-500 to-orange-500',
      accessLevel: 'encrypted' as const
    },
    {
      id: 'vintrust' as const,
      name: 'VinTrust',
      description: 'Final trust vault (death-locked)',
      icon: Heart,
      color: 'from-gray-500 to-slate-600',
      accessLevel: 'death-locked' as const
    },
    {
      id: 'vincapsule' as const,
      name: 'VinCapsule',
      description: 'Time capsules for future delivery',
      icon: Clock,
      color: 'from-green-500 to-teal-500',
      accessLevel: 'private' as const
    }
  ];

  const currentVault = vaultTypes.find(v => v.id === activeVault)!;
  const entries = getVaultEntries(activeVault);

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      addVaultEntry({
        title: newEntry.title,
        content: newEntry.content,
        vaultType: activeVault,
        isEncrypted: currentVault.accessLevel === 'encrypted',
        accessLevel: currentVault.accessLevel,
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        emotionalWeight: newEntry.emotionalWeight
      });
      
      setNewEntry({ title: '', content: '', tags: '', emotionalWeight: 5 });
      setShowAddForm(false);
    }
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            VinLore AI™ Memory Vaults
          </h1>
          <p className="text-gray-300">Secure emotional memory storage and processing system</p>
        </div>
      </div>

      {/* Vault Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {vaultTypes.map((vault) => (
          <button
            key={vault.id}
            onClick={() => setActiveVault(vault.id)}
            className={`p-4 rounded-xl border transition-all ${
              activeVault === vault.id
                ? 'bg-white/10 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${vault.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
              <vault.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{vault.name}</h3>
            <p className="text-gray-400 text-xs leading-tight">{vault.description}</p>
            <div className="mt-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                vault.accessLevel === 'encrypted' ? 'bg-red-500/20 text-red-400' :
                vault.accessLevel === 'death-locked' ? 'bg-gray-500/20 text-gray-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {vault.accessLevel === 'death-locked' ? '🔒 Death-Locked' :
                 vault.accessLevel === 'encrypted' ? '🔐 Encrypted' :
                 '🔓 Private'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Current Vault Content */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
        {/* Vault Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentVault.color} rounded-xl flex items-center justify-center`}>
                <currentVault.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentVault.name}</h2>
                <p className="text-gray-400">{currentVault.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="text-gray-300">{entries.length} entries</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    currentVault.accessLevel === 'encrypted' ? 'bg-red-500/20 text-red-400' :
                    currentVault.accessLevel === 'death-locked' ? 'bg-gray-500/20 text-gray-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {currentVault.accessLevel}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </button>
          </div>
        </div>

        {/* Vault Entries */}
        <div className="p-6">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentVault.color} rounded-xl flex items-center justify-center mx-auto mb-4 opacity-50`}>
                <currentVault.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-400 font-medium mb-2">No entries yet</h3>
              <p className="text-gray-500 text-sm">Start building your emotional memory vault</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map((entry) => (
                <div key={entry.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold">{entry.title}</h4>
                    {entry.isEncrypted && <Lock className="w-4 h-4 text-red-400" />}
                  </div>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">{entry.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {entry.tags.length > 2 && (
                        <span className="text-gray-400 text-xs">+{entry.tags.length - 2}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < entry.emotionalWeight ? 'bg-yellow-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    {entry.timestamp.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Add to {currentVault.name}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Title</label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entry title..."
                />
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Content</label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Your emotional memory or expression..."
                />
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="healing, growth, memory..."
                />
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Emotional Weight: {newEntry.emotionalWeight}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newEntry.emotionalWeight}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, emotionalWeight: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-lg transition-all"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VinLoreSystem;