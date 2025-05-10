
import React from 'react';

interface MudBallSpriteProps {
  x: number;
  y: number;
  size?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  state: 'flying' | 'splashed';
  angle: number;
  type?: string;
}

const MudBallSprite: React.FC<MudBallSpriteProps> = ({ 
  x, 
  y, 
  size = 15, 
  direction,
  state = 'flying',
  angle = 0,
  type = 'player'
}) => {
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
    width: size,
    height: size,
    transform: `rotate(${angle}deg)`,
  };

  const getClassNames = () => {
    const baseClasses = 'absolute rounded-full shadow-md';
    
    // Different styling based on state
    if (state === 'flying') {
      return `${baseClasses} bg-brown-800`;
    } else if (state === 'splashed') {
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
