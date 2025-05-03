
import React from 'react';
import { CharacterId } from '@/types/game';
import MudCharacter from './MudCharacter';
import { Position, MudBall, Character } from './types';

// Update the props interface to include the ref property
export interface MudFlingArenaProps {
  mudBalls: MudBall[];
  characters: Character[];
  selectedMudBall: string | null;
  fountainIntensity: 'low' | 'medium' | 'high';
  characterColors: Record<string, any>;
  onMudBallClick: (ballId: string) => void;
  onGameAreaClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Create a forwardRef component
const MudFlingArena = React.forwardRef<HTMLDivElement, MudFlingArenaProps>(
  ({
    mudBalls,
    characters,
    selectedMudBall,
    fountainIntensity,
    characterColors,
    onMudBallClick,
    onGameAreaClick
  }, ref) => {
    return (
      <div 
        ref={ref} 
        onClick={onGameAreaClick}
        className="relative w-[600px] h-[400px] bg-cover border-2 border-dashed border-amber-800 mx-auto my-5 overflow-hidden"
        style={{ backgroundImage: "url('/img/mud-arena-background.png')" }}
      >
        <div className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-20 h-20 rounded-full border-2 border-[saddlebrown] 
          flex items-center justify-center text-white font-bold text-shadow
          ${fountainIntensity === 'low' ? 'bg-[rgba(101,67,33,0.5)]' : 
            fountainIntensity === 'medium' ? 'bg-[rgba(101,67,33,0.7)]' : 
            'bg-[rgba(101,67,33,0.9)]'}
        `}>
          <div className={`
            absolute inset-0 rounded-full overflow-hidden
            ${fountainIntensity === 'low' ? 'animate-pulse' : 
              fountainIntensity === 'medium' ? 'animate-pulse' : 
              'animate-bounce'}
          `}>
            <div className="h-full w-full bg-brown-400/30"></div>
          </div>
          <span className="z-10">Fountain</span>
        </div>
        
        {mudBalls.map(ball => (
          <img
            key={ball.id}
            src="/img/mudball.png"
            alt="Mud Ball"
            style={{ 
              left: ball.position.x, 
              top: ball.position.y,
              transform: 'translate(-50%, -50%)'
            }}
            className={`absolute w-[30px] h-[30px] cursor-pointer transition-transform hover:scale-110 ${
              selectedMudBall === ball.id ? 'ring-2 ring-yellow-400' : ''
            } ${ball.isFlying ? 'animate-none' : 'animate-bounce'}`}
            onClick={(e) => {
              e.stopPropagation();
              onMudBallClick(ball.id);
            }}
          />
        ))}
        
        {characters.map(character => (
          <MudCharacter
            key={character.id}
            id={character.id}
            position={character.position}
            isHit={character.isHit}
            team={character.team}
            borderColor={characterColors[character.id]?.color || 'white'}
          />
        ))}
      </div>
    );
  }
);

MudFlingArena.displayName = 'MudFlingArena';

export default MudFlingArena;
