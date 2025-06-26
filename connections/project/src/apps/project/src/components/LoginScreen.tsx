import React, { useState } from 'react';
import { Brain, Shield, Heart, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800"></div>
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {['💙', '🌊', '✨', '🕊️'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Brain className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-3">
            Genesis EI AI OS
          </h1>
          <p className="text-xl text-gray-300 mb-2">Emotional Intelligence Operating System</p>
          <p className="text-sm text-gray-400 mb-4">A safe space for emotional healing and growth</p>
          
          {/* Core Features */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 rounded-full px-3 py-1">
              <span className="text-blue-400 text-xs font-bold">🧠 EI Core Brain</span>
            </div>
            <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 rounded-full px-3 py-1">
              <span className="text-teal-400 text-xs font-bold">🛡️ Safe Space</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-white text-lg font-semibold mb-2">Welcome to Your Emotional Sanctuary</h3>
            <p className="text-gray-400 text-sm">Enter a space designed for healing and emotional growth</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Emotional Identity
              </label>
              <input
                type="text"
                placeholder="Your safe space identifier"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                defaultValue="emotional_explorer"
              />
            </div>
            
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Healing Passphrase
              </label>
              <input
                type="password"
                placeholder="Your personal healing key"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                defaultValue="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isAuthenticating}
              className="w-full py-4 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:via-teal-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Entering Safe Space...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Enter Emotional Sanctuary</span>
                </>
              )}
            </button>
          </div>

          {/* Core Systems */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center mb-4">
              <h4 className="text-white font-semibold mb-2">🌟 Core Brain Systems</h4>
              <p className="text-gray-400 text-sm">Emotional Intelligence Infrastructure</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-xs font-bold">Memory Layer</span>
                </div>
                <div className="text-white text-sm">Active</div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/30 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-teal-400 text-xs font-bold">E.C.C. Protocol</span>
                </div>
                <div className="text-white text-sm">Ready</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-bold">VinLore Vaults</span>
                </div>
                <div className="text-white text-sm">Secure</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 text-xs font-bold">PulseLink</span>
                </div>
                <div className="text-white text-sm">Online</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm">Built for Emotional Safety</span>
              <Heart className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              A home for people who never felt safe in their emotions<br/>
              <span className="text-blue-300">Every interaction designed for healing and growth</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;