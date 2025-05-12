
import React, { useState, useEffect } from 'react';
import { HiddenItem } from '@/hooks/bloomWithAView/types';
import { loadBloomWithAViewAssets } from '@/utils/bloomWithAViewUtils';
import HiddenObject from './HiddenObject';
import FlowerTilesLayer from './FlowerTilesLayer';
import FoundItemMarker from './FoundItemMarker';
import ItemHint from './ItemHint';
import ClickFeedback from './ClickFeedback';
import GameProgressIndicator from './GameProgressIndicator';
import DebugModeIndicator from './DebugModeIndicator';

interface BloomWithAViewSceneProps {
  hiddenItems: HiddenItem[];
  clickPosition: { x: number, y: number } | null;
  showHint: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  backgroundImage?: string;
  foundItemCount: number;
  totalItemCount: number;
}

const BloomWithAViewScene: React.FC<BloomWithAViewSceneProps> = ({
  hiddenItems,
  clickPosition,
  showHint,
  onClick,
  backgroundImage = 'spring/bloomWithAView/garden-background',
  foundItemCount,
  totalItemCount
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgImagePath, setBgImagePath] = useState('');
  const [objectsImagePath, setObjectsImagePath] = useState('');
  const [flowerTilesPath, setFlowerTilesPath] = useState('');
  const [debugMode, setDebugMode] = useState(false);

  // Load assets on component mount
  useEffect(() => {
    console.log("Loading BloomWithAView assets...");
    loadBloomWithAViewAssets((bgPath, objectsPath, tilesPath, isDebugMode) => {
      console.log(`Assets loaded: BG: ${bgPath}, Objects: ${objectsPath}, Tiles: ${tilesPath}, DebugMode: ${isDebugMode}`);
      setBgImagePath(bgPath);
      setObjectsImagePath(objectsPath);
      setFlowerTilesPath(tilesPath);
      setDebugMode(isDebugMode);
      setImageLoaded(true);
    });
  }, []);

  // Ensure we only render once assets are attempted to load
  return (
    <div className="relative w-full">
      <div 
        className="relative w-full h-[400px] rounded-lg border-2 border-purple-600/50 overflow-hidden cursor-pointer"
        onClick={onClick}
        style={{
          backgroundImage: `url(/assets/backgrounds/stonewich-cityscape.jpg)`, /* Fallback */
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Main background image - z-index 0 (furthest back) */}
        {imageLoaded && bgImagePath && (
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: `url(${bgImagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        
        {/* Hidden object sprites - z-index 10 (middle layer) */}
        {imageLoaded && objectsImagePath && hiddenItems.map((item) => (
          <HiddenObject 
            key={`object-${item.id}`}
            item={item}
            objectsImagePath={objectsImagePath}
            debugMode={debugMode}
          />
        ))}
        
        {/* Flower tiles layer - z-index 20 (top layer) */}
        {imageLoaded && flowerTilesPath && (
          <FlowerTilesLayer 
            flowerTilesPath={flowerTilesPath}
            imageLoaded={imageLoaded}
          />
        )}

        {/* Game progress indicator */}
        <GameProgressIndicator 
          foundItemCount={foundItemCount} 
          totalItemCount={totalItemCount}
        />

        {/* Debug marker to show if we're in fallback mode */}
        <DebugModeIndicator debugMode={debugMode} />

        {/* Visual markers for hints */}
        {hiddenItems.map((item) => (
          <ItemHint
            key={`hint-${item.id}`}
            item={item}
            showHint={showHint}
          />
        ))}
        
        {/* Display found items markers */}
        {hiddenItems.map((item) => (
          <FoundItemMarker
            key={`found-${item.id}`}
            item={item}
          />
        ))}
        
        {/* Click feedback */}
        <ClickFeedback clickPosition={clickPosition} />
      </div>
    </div>
  );
};

export default BloomWithAViewScene;
