
import React from 'react';
import { MudballData } from './types';

interface MudBallSpriteProps {
  mudball?: MudballData;
  x?: number;
  y?: number;
  size?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  state?: 'flying' | 'splashed';
  angle?: number;
  type?: string;
  arenaSize?: { width: number; height: number };
  onHit?: (target: 'player' | 'opponent') => void;
}

const MudBallSprite: React.FC<MudBallSpriteProps> = ({ 
  mudball,
  x: propX, 
  y: propY, 
  size = 15, 
  direction,
  state: propState = 'flying',
  angle: propAngle = 0,
  type = 'player',
  onHit
}) => {
  // Use mudball prop if available, otherwise fallback to individual props
  const x = mudball ? mudball.x : propX || 0;
  const y = mudball ? mudball.y : propY || 0;
  const state = mudball ? mudball.state : propState;
  const angle = mudball ? (mudball.rotation || mudball.angle || propAngle) : propAngle;

  // Optional direction-based style tweaks
  const rotationMap = {
    up: 'rotate-0',
    right: 'rotate-90',
    down: 'rotate-180',
    left: 'rotate-[270deg]',
  };

  const style = {
    left: x,
    top: y,
    width: mudball?.size || size,
    height: mudball?.size || size,
    transform: `rotate(${angle}deg)`,
  };

  const getClassNames = () => {
    const baseClasses = 'absolute rounded-full shadow-md';
    
    // Different styling based on state
    if (state === 'flying') {
      return `${baseClasses} bg-brown-800`;
    } else if (state === 'splashed' || state === 'splashing') {
      return `${baseClasses} bg-brown-600 opacity-70`;
    }
    
    return baseClasses;
  };

  return (
    <div
      className={`${getClassNames()} ${
        direction ? rotationMap[direction] : ''
      }`}
      style={style}
    />
  );
};

export default MudBallSprite;
