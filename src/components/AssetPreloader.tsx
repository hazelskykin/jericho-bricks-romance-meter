
import React, { useState, useEffect } from 'react';
import backgrounds from '../data/backgrounds';
import characterExpressions from '../data/characterExpressions';
import { toast } from 'sonner';
import { assetManager, getAssetSource } from '@/utils/assetManager';
import { BackgroundAsset } from '@/types/game';

interface AssetPreloaderProps {
  onComplete: () => void;
  priorityOnly?: boolean;
}

// Define which assets should be loaded first
const PRIORITY_ASSETS = {
  backgrounds: ['stonewich-cityscape', 'cybaton-office', 'cybaton-lobby'],
  characters: ['maven-neutral', 'xavier-neutral', 'navarre-neutral', 'etta-neutral', 'senara-neutral']
};

export const AssetPreloader = ({ onComplete, priorityOnly = false }: AssetPreloaderProps) => {
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const imagesToLoad: string[] = [];
    
    // Add priority background images
    PRIORITY_ASSETS.backgrounds.forEach(bgKey => {
      const bg = Object.entries(backgrounds).find(([id]) => id === bgKey);
      if (bg) imagesToLoad.push(bg[1].image);
    });
    
    // Add priority character images
    PRIORITY_ASSETS.characters.forEach(charKey => {
      const char = Object.values(characterExpressions)
        .flat()
        .find(expression => expression.id === charKey);
      
      if (char) {
        // Extract source using our new utility
        const src = getAssetSource(char);
        if (src) imagesToLoad.push(src);
      }
    });

    // If not priority only, add all other assets
    if (!priorityOnly) {
      // Add remaining background images
      Object.entries(backgrounds).forEach(([id, bg]) => {
        if (!PRIORITY_ASSETS.backgrounds.includes(id)) {
          imagesToLoad.push(bg.image);
        }
      });
      
      // Add remaining character expressions
      Object.values(characterExpressions).flat().forEach(expression => {
        if (!PRIORITY_ASSETS.characters.includes(expression.id)) {
          const src = getAssetSource(expression);
          if (src) imagesToLoad.push(src);
        }
      });
    }

    setTotal(imagesToLoad.length);
    
    // Use asset manager to handle the loading
    assetManager.preloadAssets(
      imagesToLoad,
      (loadedCount, totalCount) => {
        setLoaded(loadedCount);
      }
    ).then(() => {
      console.log('All images loaded successfully!');
      // Make the cache accessible globally
      assetManager.exposeToWindow();
      onComplete();
    }).catch(err => {
      console.error('Error loading images:', err);
      setError('Failed to load some assets. Please refresh the page.');
      toast.error('Failed to load some assets');
    });
    
  }, [onComplete, priorityOnly]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark-purple bg-opacity-90 z-50">
      <div className="text-white text-2xl mb-4">Loading Game Assets</div>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-purple to-bright-purple transition-all duration-300 ease-out"
          style={{ width: `${total > 0 ? (loaded / total) * 100 : 0}%` }}
        />
      </div>
      <div className="text-white mt-2">
        {loaded} / {total} assets loaded
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default AssetPreloader;
