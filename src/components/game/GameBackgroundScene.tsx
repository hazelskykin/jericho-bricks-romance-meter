
import React, { useEffect } from 'react';
import BackgroundScene from '../BackgroundScene';
import { playBackgroundMusicForScene } from '@/utils/sound';

interface GameBackgroundSceneProps {
  backgroundId: string;
  onBackgroundClick?: () => void;
}

const GameBackgroundScene: React.FC<GameBackgroundSceneProps> = ({
  backgroundId,
  onBackgroundClick,
}) => {
  // Play background music when background changes
  useEffect(() => {
    if (backgroundId) {
      playBackgroundMusicForScene(backgroundId);
    }
  }, [backgroundId]);
  
  return (
    <div 
      className="absolute inset-0 z-0" 
      onClick={onBackgroundClick}
      data-testid="game-background"
    >
      <BackgroundScene 
        backgroundId={backgroundId} 
        priority={true}
      />
    </div>
  );
};

export default GameBackgroundScene;
