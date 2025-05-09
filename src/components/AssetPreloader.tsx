import React, { useEffect, useState } from 'react';
import { assetManager } from '../utils/assetManager';
import charactersData from '../data/characters';
import { getCharacterExpressions } from '../data/characterExpressions';
import backgrounds from '../data/backgrounds';
import { minigameAssets } from '../data/minigameAssets';
import { toast } from 'sonner';
import { CharacterExpression } from '@/types/expressions';

interface AssetPreloaderProps {
  onComplete: () => void;
  priorityOnly?: boolean;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ onComplete, priorityOnly = false }) => {
  const [backgroundsLoaded, setBackgroundsLoaded] = useState(false);
  const [charactersLoaded, setCharactersLoaded] = useState(false);
  const [minigameAssetsLoaded, setMinigameAssetsLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  
  const updateProgress = (loaded: number) => {
    setAssetsLoaded(loaded);
  };

  useEffect(() => {
    let total = 0;
    if (!priorityOnly) {
      total += Object.keys(backgrounds).length;
      total += Object.keys(charactersData).length;
      total += minigameAssets.length;
    } else {
      // Count only priority assets
      total = 5; // Example: Adjust based on actual priority assets
    }
    setTotalAssets(total);
  }, [priorityOnly]);

  useEffect(() => {
    const loadCharacterImages = async () => {
      console.log('Loading character images...');
      
      const charactersToLoad = Object.values(charactersData);
      let loaded = 0;
      let errored = 0;
      
      for (const character of charactersToLoad) {
        try {
          // Get all expressions for this character
          const characterExpressions = getCharacterExpressions(character.id);
          
          // Load each expression
          for (const expression of characterExpressions) {
            const expressionSrc = expression.image;
            
            // Type check for string path
            if (typeof expressionSrc === 'string') {
              await assetManager.loadAsset(expressionSrc);
              loaded++;
              updateProgress(loaded + errorCount);
            }
          }
        } catch (err) {
          console.error(`Error loading character ${character.id}:`, err);
          errored++;
          setErrorCount(prev => prev + 1);
        }
      }
      
      console.log(`Loaded ${loaded} character images, ${errored} errors`);
      setCharactersLoaded(true);
    };
    
    const loadBackgroundImages = async () => {
      console.log('Loading background images...');
      
      const backgroundKeys = Object.keys(backgrounds);
      let loaded = 0;
      let errored = 0;
      
      for (const key of backgroundKeys) {
        try {
          await assetManager.loadAsset(backgrounds[key].image);
          loaded++;
          updateProgress(loaded + errorCount);
        } catch (err) {
          console.error(`Error loading background ${key}:`, err);
          errored++;
          setErrorCount(prev => prev + 1);
        }
      }
      
      console.log(`Loaded ${loaded} background images, ${errored} errors`);
      setBackgroundsLoaded(true);
    };
    
    const loadMinigameAssets = async () => {
      console.log('Loading minigame assets...');
      
      let loaded = 0;
      let errored = 0;
      
      for (const asset of minigameAssets) {
        try {
          await assetManager.loadAsset(asset.path);
          loaded++;
          updateProgress(loaded + errorCount);
        } catch (err) {
          console.error(`Error loading minigame asset ${asset.id}:`, err);
          errored++;
          setErrorCount(prev => prev + 1);
        }
      }
      
      console.log(`Loaded ${loaded} minigame assets, ${errored} errors`);
      setMinigameAssetsLoaded(true);
    };

    const loadPriorityAssets = async () => {
      console.log('Loading priority assets...');
      try {
        // Load specific priority assets
        await assetManager.loadAsset('/assets/ui/jericho-logo.png');
        await assetManager.loadAsset('/assets/backgrounds/stonewich-cityscape.png');
        await assetManager.loadAsset('/assets/characters/etta/etta-neutral.png');
        await assetManager.loadAsset('/assets/characters/maven/maven-neutral.png');
        await assetManager.loadAsset('/assets/characters/navarre/navarre-happy.png');
        
        updateProgress(5);
        console.log('Priority assets loaded successfully.');
      } catch (error) {
        console.error('Error loading priority assets:', error);
        setErrorCount(prev => prev + 1);
      }
      
      // Mark priority assets as loaded regardless of outcome
      setBackgroundsLoaded(true);
      setCharactersLoaded(true);
      setMinigameAssetsLoaded(true);
    };
    
    // Load assets based on priority
    if (priorityOnly) {
      loadPriorityAssets();
    } else {
      // Load all assets
      Promise.all([
        loadCharacterImages(),
        loadBackgroundImages(),
        loadMinigameAssets()
      ]).then(() => {
        console.log('All assets loaded.');
      });
    }
  }, [priorityOnly]);

  useEffect(() => {
    // Check if all required assets are loaded
    if (backgroundsLoaded && charactersLoaded && minigameAssetsLoaded) {
      if (errorCount > 0) {
        toast.error(`Assets loaded with ${errorCount} errors. Check console for details.`);
      }
      
      // Delay the onComplete callback to ensure assets are fully ready
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [backgroundsLoaded, charactersLoaded, minigameAssetsLoaded, errorCount, onComplete]);

  const progress = totalAssets > 0 ? (assetsLoaded / totalAssets) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-purple">
      <div className="text-white text-lg mb-4">
        Loading Game Assets...
      </div>
      <div className="w-64 h-4 bg-gray-300 rounded-full">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-white text-sm mt-2">
        {assetsLoaded} / {totalAssets} Assets Loaded ({progress.toFixed(0)}%)
      </div>
      {errorCount > 0 && (
        <div className="text-red-500 text-sm mt-2">
          {errorCount} Errors. See console for details.
        </div>
      )}
    </div>
  );
};

export default AssetPreloader;
