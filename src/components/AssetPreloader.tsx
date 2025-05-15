
import React, { useEffect, useState } from 'react';
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
  skipMinigameAssets = true // Default to true so we DON'T load minigame assets at start
}) => {
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingBackgrounds, setLoadingBackgrounds] = useState(true);
  const [loadingMinigameAssets, setLoadingMinigameAssets] = useState(!skipMinigameAssets);
  
  const [loadedCharacters, setLoadedCharacters] = useState(0);
  const [loadedBackgrounds, setLoadedBackgrounds] = useState(0);
  const [loadedMinigameAssets, setLoadedMinigameAssets] = useState(0);
  
  const [characterErrors, setCharacterErrors] = useState(0);
  const [backgroundErrors, setBackgroundErrors] = useState(0);
  const [minigameErrors, setMinigameErrors] = useState(0);
  
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [totalBackgrounds, setTotalBackgrounds] = useState(0);
  const [totalMinigameAssets, setTotalMinigameAssets] = useState(0);

  // Extract list of character expression image paths
  const characterPaths = Object.values(characterExpressions)
    .flat()
    .filter(expr => !priorityOnly || (expr as CharacterExpression).priority === true)
    .map(expr => (expr as CharacterExpression).image);
  
  // Extract list of background image paths
  const backgroundPaths = Object.values(backgrounds)
    .filter(bg => !priorityOnly || (bg as BackgroundAsset).priority === true)
    .map(bg => (bg as BackgroundAsset).image);
    
  // Extract minigame assets if not skipping - focus on priority assets only
  const minigameAssetPaths = !skipMinigameAssets 
    ? minigameAssets
        .filter(asset => !priorityOnly || asset.priority === true)
        .map(asset => asset.src)
    : [];

  useEffect(() => {
    console.log(`AssetPreloader: Loading assets (${priorityOnly ? 'priority only' : 'all'}, ${skipMinigameAssets ? 'skipping minigames' : 'with minigames'})`);
    
    // Store total counts
    setTotalCharacters(characterPaths.length);
    setTotalBackgrounds(backgroundPaths.length);
    setTotalMinigameAssets(minigameAssetPaths.length);
    
    // Load character expressions
    if (characterPaths.length > 0) {
      assetManager.preloadAssets(characterPaths, (loaded, total) => {
        setLoadedCharacters(loaded);
      }).then(() => {
        const errors = characterPaths.filter(path => assetManager.didAssetFail(path)).length;
        setCharacterErrors(errors);
        console.log(`Loaded ${characterPaths.length - errors} character expressions, ${errors} errors`);
        setLoadingCharacters(false);
      });
    } else {
      setLoadingCharacters(false);
    }
    
    // Load backgrounds
    if (backgroundPaths.length > 0) {
      assetManager.preloadAssets(backgroundPaths, (loaded, total) => {
        setLoadedBackgrounds(loaded);
      }).then(() => {
        const errors = backgroundPaths.filter(path => assetManager.didAssetFail(path)).length;
        setBackgroundErrors(errors);
        console.log(`Loaded ${backgroundPaths.length - errors} background images, ${errors} errors`);
        setLoadingBackgrounds(false);
      });
    } else {
      setLoadingBackgrounds(false);
    }
    
    // Load minigame assets if not skipping
    if (!skipMinigameAssets && minigameAssetPaths.length > 0) {
      console.log(`Loading ${minigameAssetPaths.length} minigame assets...`);
      assetManager.preloadAssets(minigameAssetPaths, (loaded, total) => {
        setLoadedMinigameAssets(loaded);
      }).then(() => {
        const errors = minigameAssetPaths.filter(path => assetManager.didAssetFail(path)).length;
        setMinigameErrors(errors);
        console.log(`Loaded ${minigameAssetPaths.length - errors} minigame assets, ${errors} errors`);
        setLoadingMinigameAssets(false);
      });
    } else {
      setLoadingMinigameAssets(false);
    }
  }, [characterPaths, backgroundPaths, minigameAssetPaths, priorityOnly, skipMinigameAssets]);

  // Check if all assets are loaded
  useEffect(() => {
    if (!loadingCharacters && !loadingBackgrounds && !loadingMinigameAssets) {
      console.log('All required assets loaded.');
      onComplete();
    }
  }, [loadingCharacters, loadingBackgrounds, loadingMinigameAssets, onComplete]);

  // Calculate overall progress
  const totalAssets = totalCharacters + totalBackgrounds + (skipMinigameAssets ? 0 : totalMinigameAssets);
  const loadedAssets = loadedCharacters + loadedBackgrounds + (skipMinigameAssets ? 0 : loadedMinigameAssets);
  const progress = totalAssets > 0 ? Math.min(100, Math.round((loadedAssets / totalAssets) * 100)) : 100;

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
        {loadingCharacters && `Loading character expressions (${loadedCharacters}/${totalCharacters})...`}
        {loadingBackgrounds && `Loading backgrounds (${loadedBackgrounds}/${totalBackgrounds})...`}
        {loadingMinigameAssets && !skipMinigameAssets && `Loading minigame assets (${loadedMinigameAssets}/${totalMinigameAssets})...`}
        {!loadingCharacters && !loadingBackgrounds && !loadingMinigameAssets && 'All assets loaded!'}
      </div>
    </div>
  );
};

export default AssetPreloader;
