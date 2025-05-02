
import React from 'react';
import { CharacterId } from '@/types/game';

// Define types that align with MudFlingGame.tsx
export interface Position {
  x: number;
  y: number;
}

export interface MudBall {
  id: string;
  position: Position;
  owner?: 'player' | CharacterId;
  isFlying?: boolean;
}

export interface Character {
  id: CharacterId;
  position: Position;
  team: 'team1' | 'team2';
  isHit?: boolean;
}

// Update the props interface to include the ref property
export interface MudFlingArenaProps {
  mudBalls: MudBall[];
  characters: Character[];
  selectedMudBall: string | null;
  fountainIntensity: 'low' | 'medium' | 'high';
  characterColors: Record<string, any>; // Changed to accept any type for character colors
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[rgba(101,67,33,0.7)] rounded-full border-2 border-[saddlebrown] flex items-center justify-center text-white font-bold text-shadow">
          Fountain
        </div>
        
        {mudBalls.map(ball => (
          <img
            key={ball.id}
            src="/img/mudball.png"
            alt="Mud Ball"
            style={{ 
              left: ball.position.x, 
              top: ball.position.y 
            }}
            className={`absolute w-[30px] h-[30px] cursor-pointer transition-transform hover:scale-110 ${
              selectedMudBall === ball.id ? 'ring-2 ring-yellow-400' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onMudBallClick(ball.id);
            }}
          />
        ))}
        
        {characters.map(character => (
          <img
            key={character.id}
            src={`/img/character-neutral.png`}
            alt={character.id}
            style={{ 
              left: character.position.x, 
              top: character.position.y,
              borderColor: characterColors[character.id]?.color || 'white'
            }}
            className="absolute w-[50px] h-[50px] rounded-full border-2"
          />
        ))}
      </div>
    );
  }
);

MudFlingArena.displayName = 'MudFlingArena';

export default MudFlingArena;
