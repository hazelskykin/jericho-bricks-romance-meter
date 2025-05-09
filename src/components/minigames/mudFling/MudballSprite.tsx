// src/components/MudFling/MudBallSprite.tsx
import React from 'react';

interface MudBallSpriteProps {
  x: number;
  y: number;
  size?: number;
  direction?: 'left' | 'right' | 'up' | 'down'; // Optional
}

const MudBallSprite: React.FC<MudBallSpriteProps> = ({ x, y, size = 15, direction }) => {
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
  };

  return (
    <div
      className={`absolute bg-brown-800 rounded-full shadow-md ${
        direction ? rotationMap[direction] : ''
      }`}
      style={style}
    />
  );
};

export default MudBallSprite;
