import React, { useState } from 'react';
import Taskbar from './Taskbar';
import AppLauncher from './AppLauncher';
import WindowManager from './WindowManager';
import EmotionalOverlay from './EmotionalOverlay';
import DesktopWidget from './DesktopWidget';

const Desktop: React.FC = () => {
  const [showAppLauncher, setShowAppLauncher] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Desktop Widgets */}
      <div className="absolute top-8 right-8 space-y-4">
        <DesktopWidget type="emotional" />
        <DesktopWidget type="memory" />
        <DesktopWidget type="dna" />
      </div>

      {/* Emotional Overlay */}
      <EmotionalOverlay />

      {/* Window Manager */}
      <WindowManager />

      {/* App Launcher */}
      {showAppLauncher && (
        <AppLauncher onClose={() => setShowAppLauncher(false)} />
      )}

      {/* Taskbar */}
      <Taskbar onOpenLauncher={() => setShowAppLauncher(!showAppLauncher)} />
    </div>
  );
};

export default Desktop;