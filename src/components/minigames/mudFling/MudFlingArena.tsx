
import React from 'react';
import { Character, MudBall } from './types';
import MudCharacter from './MudCharacter';
import MudFlingFountain from './MudFlingFountain';

interface MudFlingArenaProps {
  mudBalls: MudBall[];
  characters: Character[];
  selectedMudBall: string | null;
  fountainIntensity: 'low' | 'medium' | 'high';
  characterColors: Record<string, { color: string }>;
  onMudBallClick: (id: string) => void;
  onGameAreaClick: (x: number, y: number) => void;
}

const MudFlingArena: React.FC<MudFlingArenaProps> = ({
  mudBalls,
  characters,
  selectedMudBall,
  fountainIntensity,
  characterColors,
  onMudBallClick,
  onGameAreaClick
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onGameAreaClick(x, y);
  };

  return (
    <div 
      className="relative w-full h-[400px] border-2 border-amber-600/30 rounded-lg overflow-hidden"
      onClick={handleClick}
      style={{
        backgroundImage: 'url(/assets/backgrounds/summer-transition.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: selectedMudBall ? 'crosshair' : 'default'
      }}
    >
      {/* Central mud fountain */}
      <MudFlingFountain 
        position={{ x: 300, y: 200 }} 
        intensity={fountainIntensity} 
      />
      
      {/* Display characters */}
      {characters.map((character) => (
        <MudCharacter
          key={character.id}
          character={character}
          characterColors={characterColors}
        />
      ))}
      
      {/* Display mud balls */}
      {mudBalls.map((mudBall) => (
        <div
          key={mudBall.id}
          className={`absolute w-6 h-6 rounded-full bg-amber-800 border border-amber-600 shadow-md ${
            selectedMudBall === mudBall.id ? 'ring-2 ring-yellow-400 scale-125' : ''
          }`}
          style={{
            left: `${mudBall.position.x - 12}px`,
            top: `${mudBall.position.y - 12}px`,
            cursor: 'pointer',
            zIndex: selectedMudBall === mudBall.id ? 10 : 5,
            transform: `scale(${mudBall.size / 20})`,
            opacity: mudBall.flying ? 0.8 : 1
          }}
          onClick={(e) => {
            e.stopPropagation();
            onMudBallClick(mudBall.id);
          }}
        />
      ))}
      
      {/* Extra mud puddles for decoration */}
      <div className="absolute bottom-10 right-20 w-16 h-6 bg-amber-900/70 rounded-full"></div>
      <div className="absolute bottom-20 left-30 w-12 h-4 bg-amber-900/70 rounded-full"></div>
      <div className="absolute top-40 left-10 w-14 h-5 bg-amber-900/70 rounded-full"></div>
    </div>
  );
};

export default MudFlingArena;
