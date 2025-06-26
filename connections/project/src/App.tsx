import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmotionalProvider } from './context/EmotionalContext';
import { VaultProvider } from './context/VaultContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import VinLoreSystem from './components/apps/VinLoreSystem';
import PulseLink from './components/apps/PulseLink';
import ThinkTankAI from './components/apps/ThinkTankAI';
import Dumpcake from './components/apps/Dumpcake';
import EmotionalMemoryLayer from './components/apps/EmotionalMemoryLayer';
import Sage from './components/apps/Sage';
import Pulse from './components/apps/Pulse';
import EchoSentinel from './components/apps/EchoSentinel';
import DNAEngine from './components/apps/DNAEngine';
import ContinuumSync from './components/apps/ContinuumSync';
import PrimeVoice from './components/apps/PrimeVoice';
import ModularPersonas from './components/apps/ModularPersonas';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial system loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-400"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-teal-500/30 rounded-full animate-spin border-r-teal-400 animate-reverse"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
            Genesis EI AI OS
          </h1>
          <p className="text-gray-400">Initializing Complete Emotional Intelligence System...</p>
          <p className="text-gray-500 text-sm mt-2">Core Brain + Connection Organs</p>
        </div>
      </div>
    );
  }

  return (
    <EmotionalProvider>
      <VaultProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800">
            {!isAuthenticated ? (
              <LoginScreen onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vinlore" element={<VinLoreSystem />} />
                <Route path="/pulselink" element={<PulseLink />} />
                <Route path="/thinktank" element={<ThinkTankAI />} />
                <Route path="/dumpcake" element={<Dumpcake />} />
                <Route path="/memory-layer" element={<EmotionalMemoryLayer />} />
                <Route path="/sage" element={<Sage />} />
                <Route path="/pulse" element={<Pulse />} />
                <Route path="/echo-sentinel" element={<EchoSentinel />} />
                <Route path="/dna-engine" element={<DNAEngine />} />
                <Route path="/continuum-sync" element={<ContinuumSync />} />
                <Route path="/prime-voice" element={<PrimeVoice />} />
                <Route path="/modular-personas" element={<ModularPersonas />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </div>
        </Router>
      </VaultProvider>
    </EmotionalProvider>
  );
}

export default App;