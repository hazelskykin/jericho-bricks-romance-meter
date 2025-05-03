
import React from 'react';
import { CharacterId } from '@/types/game';
import { Position } from './types';

interface MudCharacterProps {
  id: CharacterId;
  position: Position;
  isHit: boolean;
  team: 'team1' | 'team2';
  borderColor: string;
}

const MudCharacter: React.FC<MudCharacterProps> = ({
  id,
  position,
  isHit,
  team,
  borderColor
}) => {
  return (
    <div 
      className="absolute"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={`relative ${isHit ? 'animate-pulse' : ''}`}>
        <img
          src={`/img/character-${isHit ? 'surprised' : 'neutral'}.png`}
          alt={id}
          style={{ 
            borderColor: borderColor || 'white'
          }}
          className={`
            w-[50px] h-[50px] rounded-full border-2
            ${team === 'team1' ? 'ring-2 ring-blue-400' : 'ring-2 ring-red-400'}
          `}
        />
        {isHit && (
          <div className="absolute inset-0 bg-brown-500/30 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">SPLAT!</span>
          </div>
        )}
      </div>
      <div className="mt-1 text-center text-xs font-bold text-white bg-black/50 rounded px-1">
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </div>
    </div>
  );
};

export default MudCharacter;
