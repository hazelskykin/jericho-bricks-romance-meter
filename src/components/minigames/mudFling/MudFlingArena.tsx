import React, { useRef, useEffect } from 'react';
import MudCharacter from './MudCharacter';
import MudBallSprite from './MudBallSprite';
import { Character, MudBall } from '@/hooks/useMudFlingGame';

interface MudFlingArenaProps {
  onAreaClick: (x: number, y: number) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  characters: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isMuddy: boolean;
  }[];
  mudBalls: MudBall[];
  playerCharacter: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    energy: number;
    isMuddy: boolean;
    isAtFountain: boolean;
  };
}

const MudFlingArena: React.FC<MudFlingArenaProps> = ({
  onAreaClick,
  onKeyDown,
  characters,
  mudBalls,
  playerCharacter
}) => {
  const arenaRef = useRef<HTMLDivElement>(null);

  // Focus the arena on mount
  useEffect(() => {
    if (arenaRef.current) {
      arenaRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={arenaRef}
      className="relative w-full h-full bg-green-800 outline-none"
      tabIndex={0}
      onClick={(e) => onAreaClick(e.clientX, e.clientY)}
      onKeyDown={onKeyDown}
    >
      {/* Mud Characters */}
      {characters.map((character) => (
        <MudCharacter
          key={character.id}
          id={character.id}
          x={character.x}
          y={character.y}
          width={60}
          height={90}
          isPlayer={character.id === playerCharacter.id}
          isMuddy={character.isMuddy}
        />
      ))}
      
      {/* Mud Balls */}
      {mudBalls.map((mudBall) => (
        <MudBallSprite
          key={mudBall.id}
          x={mudBall.position.x}
          y={mudBall.position.y}
          size={15}
          direction={mudBall.direction}
        />
      ))}
    </div>
  );
};

export default MudFlingArena;
