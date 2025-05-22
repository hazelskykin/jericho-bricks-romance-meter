
import React, { useEffect, useState, useRef } from 'react';
import { assetManager } from '@/utils/assetManager';
import characterExpressions from '@/data/characterExpressions';
import backgrounds from '@/data/backgrounds';
import minigameAssets from '@/data/minigameAssets';
import { BackgroundAsset } from '@/types/assets';
import { CharacterExpression } from '@/types/expressions';

interface AssetPreloaderProps {
  onComplete: () => void;
  priorityOnly?: boolean;
  skipMinigameAssets?: boolean;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ 
  onComplete, 
  priorityOnly = false,
  skipMinigameAssets = true
}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Loading assets...');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log(`AssetPreloader: Loading assets (${priorityOnly ? 'priority only' : 'all'}, ${skipMinigameAssets ? 'skipping minigames' : 'with minigames'})`);
    
    // Extract image paths
    const characterPaths = Object.values(characterExpressions)
      .flat()
      .filter(expr => !priorityOnly || (expr as CharacterExpression).priority === true)
      .map(expr => (expr as CharacterExpression).image)
      .filter(Boolean);
    
    // Background paths
    const backgroundPaths = Object.values(backgrounds)
      .filter(bg => !priorityOnly || (bg as BackgroundAsset).priority === true)
      .map(bg => (bg as BackgroundAsset).image)
      .filter(Boolean);
      
    // Minigame assets paths
    const minigameAssetPaths = !skipMinigameAssets 
      ? minigameAssets
          .filter(asset => !priorityOnly || asset.priority === true)
          .map(asset => asset.src)
          .filter(Boolean)
      : [];
    
    // Calculate total assets
    const totalAssets = characterPaths.length + backgroundPaths.length + minigameAssetPaths.length;
    
    // Move to next step if no assets to load
    if (totalAssets === 0) {
      setProgress(100);
      setLoading(false);
      onComplete();
      return;
    }
    
    // Set timeout to ensure we don't block the UI indefinitely
    timerRef.current = setTimeout(() => {
      console.log('Asset loading timeout reached, continuing anyway');
      setLoading(false);
      onComplete();
    }, 10000); // 10 second timeout
    
    // We'll load assets in priority order
    let loadedCount = 0;
    
    // Progress tracking function
    const updateProgress = (loaded: number, total: number) => {
      loadedCount += loaded;
      const newProgress = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      setProgress(newProgress);
    };

    // Load backgrounds first (they're most visible)
    setStatusMessage('Loading backgrounds...');
    assetManager.preloadAssets(backgroundPaths, (loaded, total) => {
      updateProgress(1, backgroundPaths.length);
    }).then(() => {
      // Then load character expressions
      setStatusMessage('Loading character expressions...');
      return assetManager.preloadAssets(characterPaths, (loaded, total) => {
        updateProgress(1, characterPaths.length);
      });
    }).then(() => {
      // Finally load minigame assets if needed
      if (!skipMinigameAssets && minigameAssetPaths.length > 0) {
        setStatusMessage('Loading minigame assets...');
        return assetManager.preloadAssets(minigameAssetPaths, (loaded, total) => {
          updateProgress(1, minigameAssetPaths.length);
        });
      }
    }).finally(() => {
      // Clear timeout and mark as complete
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Force 100% progress
      setProgress(100);
      
      // Report stats
      const stats = assetManager.getStats();
      console.log(`Loaded ${stats.loaded} assets, ${stats.failed} failed`);
      
      // Mark as complete with a small delay to show 100%
      setTimeout(() => {
        setLoading(false);
        onComplete();
      }, 300);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [onComplete, priorityOnly, skipMinigameAssets]);

  // Don't render anything if not loading
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1A1F2C] z-50 text-white">
      <div className="w-64 mb-8">
        <div className="text-center mb-2 text-lg">Loading Game Assets</div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-300">{progress}%</div>
      </div>
      
      <div className="text-xs text-gray-400 max-w-md text-center px-4">
        {statusMessage}
      </div>
    </div>
  );
};

export default AssetPreloader;
