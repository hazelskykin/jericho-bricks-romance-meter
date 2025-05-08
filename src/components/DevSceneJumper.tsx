
import React, { useState, useEffect } from 'react';
import { allScenes } from '../data/scenes';

interface DevSceneJumperProps {
  onSceneSelect: (sceneId: string) => void;
  currentSceneId: string;
}

const DevSceneJumper: React.FC<DevSceneJumperProps> = ({ onSceneSelect, currentSceneId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<string | null>(null);
  
  // Group scenes by season
  const groupedScenes = Object.keys(allScenes).reduce((acc, sceneId) => {
    let season = 'other';
    
    if (sceneId.startsWith('spring')) {
      season = 'spring';
    } else if (sceneId.startsWith('summer')) {
      season = 'summer';
    } else if (sceneId.startsWith('autumn')) {
      season = 'autumn';
    } else if (sceneId.startsWith('winter')) {
      season = 'winter';
    } else if (sceneId.startsWith('prologue')) {
      season = 'prologue';
    } else if (sceneId.includes('epilogue')) {
      season = 'epilogue';
    }
    
    if (!acc[season]) {
      acc[season] = [];
    }
    
    acc[season].push(sceneId);
    return acc;
  }, {} as Record<string, string[]>);
  
  // Filter scenes based on search and season
  const filteredScenes = Object.entries(groupedScenes)
    .filter(([season]) => !seasonFilter || season === seasonFilter)
    .flatMap(([_, scenes]) => 
      scenes.filter(scene => 
        !filter || scene.toLowerCase().includes(filter.toLowerCase())
      )
    );
  
  // Listen for keyboard shortcut to toggle menu (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full z-50 opacity-30 hover:opacity-100 transition-opacity"
        onClick={() => setIsOpen(true)}
        title="Open Dev Scene Jumper (Ctrl+Shift+D)"
      >
        DEV
      </button>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-dark-purple p-6 rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">Dev Scene Jumper</h2>
          <button 
            className="text-white hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Filter scenes..."
            className="flex-1 p-2 bg-gray-800 text-white rounded border border-gray-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          
          <select
            className="p-2 bg-gray-800 text-white rounded border border-gray-700"
            value={seasonFilter || ''}
            onChange={(e) => setSeasonFilter(e.target.value || null)}
          >
            <option value="">All Seasons</option>
            <option value="prologue">Prologue</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
            <option value="epilogue">Epilogue</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="overflow-y-auto flex-1 pr-2">
          <div className="grid grid-cols-1 gap-2">
            {filteredScenes.map((sceneId) => (
              <button
                key={sceneId}
                className={`p-2 rounded text-left transition-colors ${
                  sceneId === currentSceneId
                    ? 'bg-primary-purple text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => {
                  onSceneSelect(sceneId);
                  setIsOpen(false);
                }}
              >
                {sceneId}
              </button>
            ))}
          </div>
          
          {filteredScenes.length === 0 && (
            <div className="text-gray-400 text-center p-4">
              No scenes match your search
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-400 border-t border-gray-700 pt-2">
          <p>Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-gray-700 rounded">Shift</kbd>+<kbd className="px-1 py-0.5 bg-gray-700 rounded">D</kbd> to toggle this menu</p>
          <p className="mt-1">Current Scene: <span className="text-primary-purple">{currentSceneId}</span></p>
        </div>
      </div>
    </div>
  );
};

export default DevSceneJumper;
