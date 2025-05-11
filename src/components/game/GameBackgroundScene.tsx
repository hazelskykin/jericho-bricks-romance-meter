
import React from 'react';
import BackgroundScene from '../BackgroundScene';

interface GameBackgroundSceneProps {
  backgroundId: string;
  onBackgroundClick: () => void;
}

const GameBackgroundScene: React.FC<GameBackgroundSceneProps> = ({ 
  backgroundId, 
  onBackgroundClick 
}) => {
  return (
    <div onClick={onBackgroundClick} className="h-full w-full">
      <BackgroundScene backgroundId={backgroundId} />
    </div>
  );
};

export default GameBackgroundScene;
