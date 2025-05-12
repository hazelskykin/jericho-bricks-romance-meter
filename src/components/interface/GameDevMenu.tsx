
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface JumpTarget {
  id: string;
  label: string;
  season?: string;
}

interface DevMenuProps {
  jumpTargets: JumpTarget[];
  onJumpToScene: (sceneId: string) => void;
  isDev?: boolean;
}

const GameDevMenu: React.FC<DevMenuProps> = ({ 
  jumpTargets, 
  onJumpToScene, 
  isDev = process.env.NODE_ENV === 'development' 
}) => {
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [filter, setFilter] = useState('');
  
  // Filter the targets based on search
  const filteredTargets = filter.length > 0
    ? jumpTargets.filter(target => 
        target.label.toLowerCase().includes(filter.toLowerCase()) ||
        target.id.toLowerCase().includes(filter.toLowerCase())
      )
    : jumpTargets;

  // Group jump targets by category or season
  const groupedTargets: Record<string, JumpTarget[]> = {};
  
  // Group targets by their season
  filteredTargets.forEach(target => {
    const group = target.season || 'Other';
    if (!groupedTargets[group]) {
      groupedTargets[group] = [];
    }
    groupedTargets[group].push(target);
  });
  
  // Handle jump with feedback
  const handleJump = (sceneId: string) => {
    onJumpToScene(sceneId);
    toast.success(`Jumping to: ${sceneId}`);
    setShowDevMenu(false);
  };
  
  if (!isDev) return null;
  
  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        onClick={() => setShowDevMenu(!showDevMenu)}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 text-sm rounded shadow"
      >
        {showDevMenu ? 'Hide Dev Menu' : 'Show Dev Menu'}
      </Button>
      
      {showDevMenu && (
        <Card className="mt-2 bg-black/90 p-4 rounded shadow w-72 border-yellow-600 overflow-hidden">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Search scenes..."
              className="w-full p-2 bg-gray-800 text-white rounded text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-1">
            {Object.entries(groupedTargets).map(([group, targets]) => (
              <div key={group} className="mb-2">
                <h3 className="text-white text-sm font-bold border-b border-yellow-600/50 pb-1 mb-1">
                  {group}
                </h3>
                <div className="flex flex-col space-y-1">
                  {targets.map(({ id, label }) => (
                    <Button 
                      key={id} 
                      onClick={() => handleJump(id)} 
                      className="text-xs justify-start bg-gray-800 hover:bg-gray-700"
                      title={`Jump to scene: ${id}`}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredTargets.length === 0 && (
              <p className="text-gray-400 text-center py-2">No matching scenes found</p>
            )}
          </div>
          
          <div className="mt-2 pt-2 border-t border-yellow-600/50 text-xs text-gray-400">
            <p>Click on a scene to jump there</p>
            <p className="mt-1">Season will be automatically updated</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GameDevMenu;
