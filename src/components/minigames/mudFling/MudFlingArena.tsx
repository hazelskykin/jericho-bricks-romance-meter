
import React, { useRef } from 'react';
import { MudBall } from './useMudBalls';
import MudCharacter from './MudCharacter';
import MudBallSprite from './MudBallSprite';
import MudFlingFountain from './MudFlingFountain';

interface MudFlingArenaProps {
  playerPosition: { x: number, y: number };
  opponentPosition: { x: number, y: number };
  playerMudballs: MudBall[];
  opponentMudballs: MudBall[];
  onPlayerMove: (x: number, y: number) => void;
  onArenaClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ARENA_WIDTH = 600;
const ARENA_HEIGHT = 450;

const MudFlingArena: React.FC<MudFlingArenaProps> = ({
  playerPosition,
  opponentPosition,
  playerMudballs,
  opponentMudballs,
  onPlayerMove,
  onArenaClick
}) => {
  const arenaRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!arenaRef.current) return;
    
    const rect = arenaRef.current.getBoundingClientRect();
    const x = Math.max(50, Math.min(ARENA_WIDTH / 2 - 50, e.clientX - rect.left));
    const y = Math.max(50, Math.min(ARENA_HEIGHT - 50, e.clientY - rect.top));
    
    onPlayerMove(x, y);
  };

  return (
    <div 
      ref={arenaRef}
      className="relative w-[600px] h-[450px] bg-cover bg-center border-4 border-brown-600 overflow-hidden"
      style={{ backgroundImage: "url('/assets/minigames/spring/mudFling/mud-arena.png')" }}
      onMouseMove={handleMouseMove}
      onClick={onArenaClick}
    >
      {/* Fountain in the center */}
      <MudFlingFountain fountainIntensity="medium" />
      
      {/* Player Character */}
      <MudCharacter 
        id="maven"
        x={playerPosition.x}
        y={playerPosition.y}
        width={80}
        height={100}
        isPlayer={true}
        isMuddy={false}
      />
      
      {/* Opponent Character */}
      <MudCharacter 
        id="navarre"
        x={opponentPosition.x}
        y={opponentPosition.y}
        width={80}
        height={100}
        isPlayer={false}
        isMuddy={false}
      />
      
      {/* Player's Mudballs */}
      {playerMudballs.map((ball, index) => (
        <MudBallSprite
          key={`player-ball-${index}`}
          x={ball.x}
          y={ball.y}
          state={ball.state}
          angle={ball.angle || 0}
        />
      ))}
      
      {/* Opponent's Mudballs */}
      {opponentMudballs.map((ball, index) => (
        <MudBallSprite
          key={`opponent-ball-${index}`}
          x={ball.x}
          y={ball.y}
          state={ball.state}
          angle={ball.angle || 0}
        />
      ))}
    </div>
  );
};

export default MudFlingArena;
