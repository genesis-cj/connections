import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VaultEntry {
  id: string;
  title: string;
  content: string;
  vaultType: 'vinlogia' | 'vincraft' | 'vinsanctum' | 'vintrust' | 'vincapsule';
  timestamp: Date;
  isEncrypted: boolean;
  accessLevel: 'public' | 'private' | 'encrypted' | 'death-locked';
  tags: string[];
  emotionalWeight: number;
}

interface VaultContextType {
  vaults: {
    vinlogia: VaultEntry[];
    vincraft: VaultEntry[];
    vinsanctum: VaultEntry[];
    vintrust: VaultEntry[];
    vincapsule: VaultEntry[];
  };
  addVaultEntry: (entry: Omit<VaultEntry, 'id' | 'timestamp'>) => void;
  getVaultEntries: (vaultType: VaultEntry['vaultType']) => VaultEntry[];
  deleteVaultEntry: (id: string, vaultType: VaultEntry['vaultType']) => void;
  encryptEntry: (id: string, vaultType: VaultEntry['vaultType'], password: string) => void;
  decryptEntry: (id: string, vaultType: VaultEntry['vaultType'], password: string) => boolean;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const useVaultContext = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVaultContext must be used within a VaultProvider');
  }
  return context;
};

export const VaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vaults, setVaults] = useState<VaultContextType['vaults']>({
    vinlogia: [],
    vincraft: [],
    vinsanctum: [],
    vintrust: [],
    vincapsule: []
  });

  const addVaultEntry = (entry: Omit<VaultEntry, 'id' | 'timestamp'>) => {
    const newEntry: VaultEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setVaults(prev => ({
      ...prev,
      [entry.vaultType]: [...prev[entry.vaultType], newEntry]
    }));
  };

  const getVaultEntries = (vaultType: VaultEntry['vaultType']) => {
    return vaults[vaultType];
  };

  const deleteVaultEntry = (id: string, vaultType: VaultEntry['vaultType']) => {
    setVaults(prev => ({
      ...prev,
      [vaultType]: prev[vaultType].filter(entry => entry.id !== id)
    }));
  };

  const encryptEntry = (id: string, vaultType: VaultEntry['vaultType'], password: string) => {
    setVaults(prev => ({
      ...prev,
      [vaultType]: prev[vaultType].map(entry =>
        entry.id === id
          ? { ...entry, isEncrypted: true, accessLevel: 'encrypted' }
          : entry
      )
    }));
  };

  const decryptEntry = (id: string, vaultType: VaultEntry['vaultType'], password: string) => {
    // Simplified decryption - in real app, would verify password
    return password.length > 0;
  };

  return (
    <VaultContext.Provider value={{
      vaults,
      addVaultEntry,
      getVaultEntries,
      deleteVaultEntry,
      encryptEntry,
      decryptEntry
    }}>
      {children}
    </VaultContext.Provider>
  );
};