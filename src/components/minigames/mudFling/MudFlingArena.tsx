
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { MudBall, Character } from './MudFlingGame';
import MudFlingFountain from './MudFlingFountain';
import { CharacterData } from '@/types/game';

interface MudFlingArenaProps {
  mudBalls: MudBall[];
  characters: Character[];
  selectedMudBall: string | null;
  fountainIntensity: 'low' | 'medium' | 'high';
  characterColors: Record<string, CharacterData>;
  onMudBallClick: (ballId: string) => void;
  onGameAreaClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const MudFlingArena = forwardRef<HTMLDivElement, MudFlingArenaProps>(({
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
      className="relative w-full h-[400px] bg-gradient-to-b from-[#335533] to-[#553311] rounded-lg overflow-hidden border-2 border-gray-700"
      onClick={onGameAreaClick}
    >
      {/* Fountain in center */}
      <MudFlingFountain intensity={fountainIntensity} />
      
      {/* Mud balls */}
      {mudBalls.map(ball => (
        <motion.div
          key={ball.id}
          className={`absolute w-6 h-6 rounded-full bg-[#8B4513] border-2 ${
            ball.id === selectedMudBall ? 'border-yellow-300' : 'border-[#5A3A1A]'
          } cursor-pointer`}
          style={{
            left: ball.position.x - 12,
            top: ball.position.y - 12
          }}
          animate={{
            scale: ball.id === selectedMudBall ? [1, 1.2, 1] : 1
          }}
          onClick={(e) => {
            e.stopPropagation();
            onMudBallClick(ball.id);
          }}
        />
      ))}
      
      {/* Characters */}
      {characters.map(char => (
        <motion.div
          key={char.id}
          className={`absolute w-10 h-10 rounded-full ${
            char.isHit ? 'opacity-50' : 'opacity-100'
          }`}
          style={{
            left: char.position.x - 20,
            top: char.position.y - 20,
            backgroundColor: characterColors[char.id].color
          }}
          animate={{
            scale: char.isHit ? [1, 0.8, 1] : 1
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {char.id.charAt(0).toUpperCase()}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

MudFlingArena.displayName = 'MudFlingArena';

export default MudFlingArena;
