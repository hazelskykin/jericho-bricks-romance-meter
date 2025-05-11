
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DevMenuProps {
  jumpTargets: { id: string; label: string }[];
  onJumpToScene: (sceneId: string) => void;
  isDev?: boolean;
}

const GameDevMenu: React.FC<DevMenuProps> = ({ jumpTargets, onJumpToScene, isDev = process.env.NODE_ENV === 'development' }) => {
  const [showDevMenu, setShowDevMenu] = useState(false);
  
  if (!isDev) return null;
  
  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        onClick={() => setShowDevMenu(!showDevMenu)}
        className="bg-yellow-600 text-white px-4 py-2 text-sm rounded shadow"
      >
        {showDevMenu ? 'Hide Test Menu' : 'Show Test Menu'}
      </Button>
      {showDevMenu && (
        <div className="mt-2 bg-black/80 p-4 rounded shadow max-w-xs space-y-2">
          <p className="text-white text-sm font-semibold">Jump to Scene:</p>
          <div className="flex flex-col space-y-1 max-h-64 overflow-y-auto pr-1">
            {jumpTargets.map(({ id, label }) => (
              <Button key={id} onClick={() => onJumpToScene(id)} className="text-xs whitespace-nowrap">
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDevMenu;
