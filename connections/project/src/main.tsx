import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { EmotionalProvider } from './context/EmotionalContext';
import { VaultProvider } from './context/VaultContext';
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EmotionalProvider>
      <VaultProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </VaultProvider>
    </EmotionalProvider>
  </React.StrictMode>
);