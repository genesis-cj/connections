import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Window {
  id: string;
  title: string;
}

interface AppContextType {
  openWindows: Window[];
  activeWindow: string | null;
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [openWindows, setOpenWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const openWindow = (id: string, title: string) => {
    if (!openWindows.some(window => window.id === id)) {
      setOpenWindows(prev => [...prev, { id, title }]);
    }
    setActiveWindow(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(window => window.id !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter(window => window.id !== id);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const focusWindow = (id: string) => {
    setActiveWindow(id);
  };

  return (
    <AppContext.Provider value={{
      openWindows,
      activeWindow,
      openWindow,
      closeWindow,
      focusWindow,
    }}>
      {children}
    </AppContext.Provider>
  );
};