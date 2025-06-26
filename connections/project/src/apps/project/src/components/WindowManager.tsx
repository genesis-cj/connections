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