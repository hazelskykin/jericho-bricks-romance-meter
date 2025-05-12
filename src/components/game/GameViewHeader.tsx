
import React from 'react';
import SoundToggle from '../minigames/common/SoundToggle';

/**
 * Game view header component with sound controls
 */
const GameViewHeader: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 z-50">
      <SoundToggle />
    </div>
  );
};

export default GameViewHeader;
