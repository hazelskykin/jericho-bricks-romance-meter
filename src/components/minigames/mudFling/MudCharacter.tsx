
import React from 'react';
import { CharacterId } from '@/types/game';

interface MudCharacterProps {
  id?: string;
  characterId?: CharacterId;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  isPlayer?: boolean;
  isMuddy?: boolean;
  position?: string;
  onThrow?: () => void;
}

const MudCharacter: React.FC<MudCharacterProps> = ({
  id,
  characterId,
  x,
  y,
  width = 80,
  height = 100,
  isPlayer,
  isMuddy = false,
  position,
  onThrow
}) => {
  // Use either id or characterId, with preference for characterId
  const characterIdValue = characterId || id || 'maven';

  // Map character ID to character-specific styling
  const getCharacterColor = () => {
    switch (characterIdValue) {
      case 'maven':
        return 'border-teal-400';
      case 'xavier':
        return 'border-blue-400';
      case 'navarre':
        return 'border-orange-400';
      case 'etta':
        return 'border-red-400';
      case 'senara':
        return 'border-purple-400';
      default:
        return 'border-gray-400';
    }
  };

  // Get character image path based on id
  const getCharacterImage = () => {
    // Use chibi-neutral versions of characters when not muddy
    // Use regular chibi versions when muddy
    return `/assets/characters/${characterIdValue}-chibi${isMuddy ? '' : '-neutral'}.png`;
  };

  return (
    <div
      className={`absolute ${isPlayer ? 'z-20' : 'z-10'} ${
        isMuddy ? 'mud-splatter' : ''
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className={`relative w-full h-full border-b-4 ${getCharacterColor()}`}
      >
        <img
          src={getCharacterImage()}
          alt={`Character ${characterIdValue}`}
          className="w-full h-full object-contain"
        />
        
        {/* Show mud splatter effect when hit - Fixed path from minigrames to minigames */}
        {isMuddy && (
          <div className="absolute inset-0 bg-[url('/assets/minigames/spring/mudFling/mudball-splash-water.png')] bg-cover opacity-70" />
        )}
        
        {/* Highlight for player character */}
        {isPlayer && (
          <div className="absolute -inset-1 border-2 border-white rounded-full opacity-30" />
        )}
      </div>
    </div>
  );
};

export default MudCharacter;
