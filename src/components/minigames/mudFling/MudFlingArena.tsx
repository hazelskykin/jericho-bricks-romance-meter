
import React, { useRef, useEffect } from 'react';
import type { MudBall } from '@/hooks/useMudFlingGame';
import MudCharacter from './MudCharacter';

interface CharacterPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMuddy: boolean;
}

interface Player {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  energy: number;
  isMuddy: boolean;
  isAtFountain: boolean;
}

interface MudFlingArenaProps {
  onAreaClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  characters: CharacterPosition[];
  mudBalls: MudBall[];
  playerCharacter: Player;
}

const MudFlingArena: React.FC<MudFlingArenaProps> = ({
  onAreaClick,
  onKeyDown,
  characters,
  mudBalls,
  playerCharacter
}) => {
  const arenaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (arenaRef.current) {
      arenaRef.current.focus();
    }
  }, []);

  return (
    <div 
      className="w-full h-full bg-[url('/assets/minigrames/spring/mudFling/A_digital_illustration_in_chibi-style_anime_featur.png')] 
                 bg-cover bg-center relative focus:outline-none cursor-crosshair"
      ref={arenaRef}
      onClick={onAreaClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* Render characters */}
      {characters.map((char, index) => (
        <MudCharacter
          key={`character-${index}`}
          id={char.id}
          x={char.x}
          y={char.y}
          width={char.width}
          height={char.height}
          isPlayer={char.id === playerCharacter.id}
          isMuddy={char.isMuddy}
        />
      ))}

      {/* Render mud balls */}
      {mudBalls.map((ball, index) => (
        <div
          key={`mud-ball-${index}`}
          className="absolute w-6 h-6 bg-[url('/assets/minigrames/spring/mudFling/mudball_sprites.png')] bg-cover rounded-full"
          style={{
            left: `${ball.position.x}px`,
            top: `${ball.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

export default MudFlingArena;
