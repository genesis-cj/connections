import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EmotionalEntry {
  id: string;
  emotion: string;
  intensity: number;
  context: string;
  timestamp: Date;
  note?: string;
  processed: boolean;
  eccStage: 'recognize' | 'classify' | 'regulate' | 'process' | 'release' | 'complete';
}

interface EmotionalPattern {
  emotion: string;
  contexts: string[];
  frequency: number;
  avgIntensity: number;
  lastOccurrence: Date;
}

interface EmotionalContextType {
  // Current state
  currentEmotion: string;
  emotionalIntensity: number;
  emotionalLoad: number;
  
  // Memory and patterns
  emotionalHistory: EmotionalEntry[];
  emotionalPatterns: EmotionalPattern[];
  
  // Core brain functions
  addEmotionalEntry: (emotion: string, intensity: number, context: string, note?: string) => void;
  processEmotion: (entryId: string, stage: EmotionalEntry['eccStage']) => void;
  detectPatterns: () => EmotionalPattern[];
  checkConnectionGap: () => string | null;
  checkCompassionateLoad: () => string | null;
  disambiguateEmotion: (emotion: string) => string[];
  
  // ECC Protocol
  startECCProtocol: (entryId: string) => void;
  completeECCStage: (entryId: string, stage: EmotionalEntry['eccStage']) => void;
}

const EmotionalContext = createContext<EmotionalContextType | undefined>(undefined);

export const useEmotionalContext = () => {
  const context = useContext(EmotionalContext);
  if (!context) {
    throw new Error('useEmotionalContext must be used within an EmotionalProvider');
  }
  return context;
};

const emotionDisambiguation = {
  happy: ['joyful', 'content', 'excited', 'elated', 'cheerful'],
  sad: ['melancholy', 'grief', 'disappointed', 'heartbroken', 'lonely'],
  angry: ['frustrated', 'irritated', 'furious', 'resentful', 'indignant'],
  anxious: ['worried', 'nervous', 'fearful', 'panicked', 'apprehensive'],
  calm: ['peaceful', 'serene', 'relaxed', 'tranquil', 'centered'],
  confused: ['uncertain', 'perplexed', 'bewildered', 'lost', 'conflicted'],
  overwhelmed: ['stressed', 'burned out', 'exhausted', 'overloaded', 'depleted']
};

export const EmotionalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentEmotion, setCurrentEmotion] = useState('calm');
  const [emotionalIntensity, setEmotionalIntensity] = useState(50);
  const [emotionalLoad, setEmotionalLoad] = useState(30);
  const [emotionalHistory, setEmotionalHistory] = useState<EmotionalEntry[]>([]);
  const [emotionalPatterns, setEmotionalPatterns] = useState<EmotionalPattern[]>([]);

  // Add emotional entry
  const addEmotionalEntry = (emotion: string, intensity: number, context: string, note?: string) => {
    const entry: EmotionalEntry = {
      id: Date.now().toString(),
      emotion,
      intensity,
      context,
      timestamp: new Date(),
      note,
      processed: false,
      eccStage: 'recognize'
    };
    
    setEmotionalHistory(prev => [...prev, entry]);
    setCurrentEmotion(emotion);
    setEmotionalIntensity(intensity);
    
    // Update emotional load
    if (intensity > 70) {
      setEmotionalLoad(prev => Math.min(100, prev + 10));
    }
  };

  // Process emotion through ECC protocol
  const processEmotion = (entryId: string, stage: EmotionalEntry['eccStage']) => {
    setEmotionalHistory(prev => 
      prev.map(entry => 
        entry.id === entryId 
          ? { ...entry, eccStage: stage, processed: stage === 'complete' }
          : entry
      )
    );
  };

  // Detect emotional patterns
  const detectPatterns = (): EmotionalPattern[] => {
    const patterns: { [key: string]: EmotionalPattern } = {};
    
    emotionalHistory.forEach(entry => {
      const key = entry.emotion;
      if (!patterns[key]) {
        patterns[key] = {
          emotion: entry.emotion,
          contexts: [],
          frequency: 0,
          avgIntensity: 0,
          lastOccurrence: entry.timestamp
        };
      }
      
      patterns[key].frequency += 1;
      patterns[key].avgIntensity = (patterns[key].avgIntensity + entry.intensity) / 2;
      patterns[key].lastOccurrence = entry.timestamp > patterns[key].lastOccurrence 
        ? entry.timestamp 
        : patterns[key].lastOccurrence;
      
      if (!patterns[key].contexts.includes(entry.context)) {
        patterns[key].contexts.push(entry.context);
      }
    });
    
    const patternArray = Object.values(patterns);
    setEmotionalPatterns(patternArray);
    return patternArray;
  };

  // Check for connection gap
  const checkConnectionGap = (): string | null => {
    const recentEntries = emotionalHistory.slice(-10);
    const highIntensityUnique = recentEntries.filter(entry => 
      entry.intensity >= 70 && 
      recentEntries.filter(e => e.context === entry.context).length === 1
    );
    
    if (highIntensityUnique.length >= 3) {
      return "You may be experiencing a Connection Gap - your emotional development may exceed your current environment's capacity to meet you where you are. This isn't about being unseen; it's about needing emotionally mature connections.";
    }
    return null;
  };

  // Check compassionate load threshold
  const checkCompassionateLoad = (): string | null => {
    if (emotionalLoad > 80) {
      return "You're approaching your Compassionate Load Threshold. This isn't failure - it's your system signaling for relief. Consider entering Emotional Recovery Mode with gentle restoration rather than pushing through.";
    }
    return null;
  };

  // Disambiguate emotions
  const disambiguateEmotion = (emotion: string): string[] => {
    const lowerEmotion = emotion.toLowerCase();
    return emotionDisambiguation[lowerEmotion as keyof typeof emotionDisambiguation] || [emotion];
  };

  // ECC Protocol functions
  const startECCProtocol = (entryId: string) => {
    processEmotion(entryId, 'recognize');
  };

  const completeECCStage = (entryId: string, stage: EmotionalEntry['eccStage']) => {
    processEmotion(entryId, stage);
  };

  // Auto-detect patterns periodically
  useEffect(() => {
    if (emotionalHistory.length > 0) {
      detectPatterns();
    }
  }, [emotionalHistory]);

  // Simulate natural emotional fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      if (emotionalLoad > 50) {
        setEmotionalLoad(prev => Math.max(0, prev - 2));
      }
    }, 30000); // Reduce load every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <EmotionalContext.Provider value={{
      currentEmotion,
      emotionalIntensity,
      emotionalLoad,
      emotionalHistory,
      emotionalPatterns,
      addEmotionalEntry,
      processEmotion,
      detectPatterns,
      checkConnectionGap,
      checkCompassionateLoad,
      disambiguateEmotion,
      startECCProtocol,
      completeECCStage
    }}>
      {children}
    </EmotionalContext.Provider>
  );
};