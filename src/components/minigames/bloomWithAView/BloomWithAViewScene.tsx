
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
  const [debugMode, setDebugMode] = useState(false);

  // Load assets on component mount
  useEffect(() => {
    console.log("Loading BloomWithAView assets...");
    loadBloomWithAViewAssets((bgPath, isDebugMode) => {
      console.log(`Assets loaded: BG: ${bgPath}, DebugMode: ${isDebugMode}`);
      setBgImagePath(bgPath);
      setDebugMode(isDebugMode);
      setImageLoaded(true);
    });
  }, []);

  // Handle click by converting it to x,y coordinates
  const handleSceneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Call the onClick prop with the click event directly
    onClick(e);
  };

  // Ensure we only render once assets are attempted to load
  return (
    <div className="relative w-full">
      <div 
        className="relative w-full h-[400px] rounded-lg border-2 border-purple-600/50 overflow-hidden cursor-pointer"
        onClick={handleSceneClick}
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
        {imageLoaded && hiddenItems.map((item) => (
          <HiddenObject 
            key={`object-${item.id}`}
            item={item}
            debugMode={debugMode}
          />
        ))}
        
        {/* Flower tiles layer - z-index 20 (top layer) */}
        {imageLoaded && (
          <FlowerTilesLayer 
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
