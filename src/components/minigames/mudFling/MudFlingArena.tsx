
import React from 'react';
import { CharacterId } from '@/types/game';
import MudFlingFountain from './MudFlingFountain';

interface Opponent {
  id: number;
  characterId: CharacterId; 
  position: { x: number; y: number };
  isHit: boolean;
  team: 'friendly' | 'opposing';
}

interface MudFlingArenaProps {
  opponents: Opponent[];
  onOpponentClick: (opponent: Opponent) => void;
  isThrowing: boolean;
}

const MudFlingArena: React.FC<MudFlingArenaProps> = ({
  opponents,
  onOpponentClick,
  isThrowing
}) => {
  return (
    <div className="relative bg-amber-800/30 rounded-xl h-64 w-full overflow-hidden mb-4">
      {/* Garden background with plants */}
      <div className="absolute inset-0">
        {/* Garden details */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-amber-950/60"></div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-4 h-6 bg-green-700"
            style={{
              bottom: '8px',
              left: `${Math.random() * 90 + 5}%`,
              transformOrigin: 'bottom center',
              transform: `rotate(${Math.random() * 20 - 10}deg)`
            }}
          ></div>
        ))}
      </div>
      
      {/* Fountain in the center */}
      <MudFlingFountain />
      
      {/* Opponents */}
      {opponents.map((opponent) => (
        <div
          key={opponent.id}
          onClick={() => !isThrowing && onOpponentClick(opponent)}
          className={`absolute w-10 h-12 transition-all ${
            opponent.isHit 
              ? 'bg-amber-700' 
              : opponent.team === 'friendly' 
                ? 'bg-blue-600 hover:bg-blue-500' 
                : 'bg-red-600 hover:bg-red-500 cursor-pointer'
          } rounded-full`}
          style={{
            left: `${opponent.position.x}%`,
            top: `${opponent.position.y}%`,
            opacity: opponent.isHit ? 0.7 : 1,
            transform: opponent.isHit ? 'scale(0.9)' : 'scale(1)',
            cursor: isThrowing ? 'default' : 'pointer',
          }}
        >
          <div className="absolute -bottom-1 left-0 right-0 h-6 rounded-full bg-inherit opacity-70 transform scale-x-70"></div>
        </div>
      ))}
      
      {/* Muddy overlay */}
      <div className="absolute inset-0 bg-amber-800/10 pointer-events-none"></div>
    </div>
  );
};

export default MudFlingArena;
