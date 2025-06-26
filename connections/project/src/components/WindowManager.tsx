import React from 'react';
import { useAppContext } from '../context/AppContext';
import Window from './Window';
import EIDashboard from './apps/EIDashboard';
import DNAEngine from './apps/DNAEngine';
import VinLoreVault from './apps/VinTrustVault';
import MemoryLayer from './apps/MemoryLayer';
import NeuralMonitor from './apps/NeuralMonitor';
import EmotionTracker from './apps/EmotionTracker';
import ContinuumMarketplace from './apps/ContinuumMarketplace';
import Sage from './apps/Sage';
import Pulse from './apps/Pulse';
import EchoSentinel from './apps/EchoSentinel';
import ContinuumSync from './apps/ContinuumSync';
import PrimeVoice from './apps/PrimeVoice';
import ModularPersonas from './apps/ModularPersonas';

const WindowManager: React.FC = () => {
  const { openWindows } = useAppContext();

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case 'ei-dashboard':
        return <EIDashboard />;
      case 'dna-engine':
        return <DNAEngine />;
      case 'vinlore-vault':
        return <VinLoreVault />;
      case 'memory-layer':
        return <MemoryLayer />;
      case 'neural-monitor':
        return <NeuralMonitor />;
      case 'emotion-tracker':
        return <EmotionTracker />;
      case 'continuum-marketplace':
        return <ContinuumMarketplace />;
      case 'sage':
        return <Sage />;
      case 'pulse':
        return <Pulse />;
      case 'echo-sentinel':
        return <EchoSentinel />;
      case 'continuum-sync':
        return <ContinuumSync />;
      case 'prime-voice':
        return <PrimeVoice />;
      case 'modular-personas':
        return <ModularPersonas />;
      default:
        return (
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Application Loading</h3>
            <p className="text-gray-500">This neural application is being initialized...</p>
          </div>
        );
    }
  };

  return (
    <>
      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          zIndex={1000 + index}
        >
          {getAppComponent(window.id)}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;