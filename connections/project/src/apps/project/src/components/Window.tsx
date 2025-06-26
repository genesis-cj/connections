import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  zIndex: number;
}

const Window: React.FC<WindowProps> = ({ id, title, children, zIndex }) => {
  const { closeWindow, focusWindow, activeWindow } = useAppContext();
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 50 + Math.random() * 100 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const isActive = activeWindow === id;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      focusWindow(id);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: Math.max(0, e.clientY - dragOffset.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 64px)' }
    : { 
        top: position.y, 
        left: position.x, 
        width: size.width, 
        height: size.height,
        transform: isMinimized ? 'scale(0.95) translateY(20px)' : 'scale(1)',
        opacity: isMinimized ? 0.8 : 1,
      };

  return (
    <div
      ref={windowRef}
      className={`fixed bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-200 ${
        isActive ? 'ring-1 ring-purple-400/50' : ''
      } ${isMinimized ? 'pointer-events-none' : ''}`}
      style={{ ...windowStyle, zIndex }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Window Header */}
      <div
        className="window-header flex items-center justify-between p-4 border-b border-white/10 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-white font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMinimize}
            className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-colors"
          >
            <Minus className="w-3 h-3 text-yellow-900" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-6 h-6 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="w-3 h-3 text-green-900" />
            ) : (
              <Maximize2 className="w-3 h-3 text-green-900" />
            )}
          </button>
          <button
            onClick={() => closeWindow(id)}
            className="w-6 h-6 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-red-900" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;