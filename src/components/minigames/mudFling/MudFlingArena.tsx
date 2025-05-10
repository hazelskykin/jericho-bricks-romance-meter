
import React, { useEffect, useState, useRef } from 'react';
import MudCharacter from './MudCharacter';
import MudBallSprite from './MudBallSprite';
import { CharacterId } from '@/types/game';
import { assetManager } from '@/utils/assetManager';
import MudFlingFountain from './MudFlingFountain';
import { soundManager } from '@/utils/soundEffects';
import { MudballData, MudCharacterPosition } from './types';

interface MudFlingArenaProps {
  playerCharacter?: CharacterId;
  opponentCharacter?: CharacterId;
  playerPosition?: MudCharacterPosition;
  opponentPosition?: MudCharacterPosition;
  score?: { player: number; opponent: number };
  onThrow?: () => void;
  onHit?: (target: 'player' | 'opponent') => void;
  mudballs?: MudballData[];
  playerMudballs?: MudballData[];
  opponentMudballs?: MudballData[];
  onPlayerMove?: (x: number, y: number) => void;
  onArenaClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MudFlingArena: React.FC<MudFlingArenaProps> = ({
  playerCharacter = 'maven',
  opponentCharacter = 'xavier',
  playerPosition,
  opponentPosition,
  score = { player: 0, opponent: 0 },
  onThrow,
  onHit,
  mudballs = [],
  playerMudballs = [],
  opponentMudballs = [],
  onPlayerMove,
  onArenaClick
}) => {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [arenaSize, setArenaSize] = useState({ width: 800, height: 600 });
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Update arena size on resize
    const updateSize = () => {
      if (arenaRef.current) {
        const { width, height } = arenaRef.current.getBoundingClientRect();
        setArenaSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Preload the arena background
    const img = new Image();
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.error("Failed to load mud-arena.png");
      setBackgroundLoaded(true); // Continue anyway to prevent blocking
    };
    img.src = '/assets/minigames/spring/mudFling/mud-arena.png';

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate score display position
  const playerScore = score.player.toString().padStart(2, '0');
  const opponentScore = score.opponent.toString().padStart(2, '0');

  // Handle arena interactions if needed
  const handleArenaClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onArenaClick) {
      onArenaClick(e);
    }
  };

  return (
    <div 
      ref={arenaRef} 
      className="relative w-full h-full overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundImage: "url('/assets/minigames/spring/mudFling/mud-arena.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: backgroundLoaded ? 1 : 0.5,
        transition: 'opacity 0.5s ease-in-out'
      }}
      onClick={handleArenaClick}
    >
      {/* Score display */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
        <div className="bg-black/70 px-6 py-2 rounded-full flex gap-6 items-center">
          <div className="text-2xl font-bold text-blue-300">{playerScore}</div>
          <div className="text-lg font-medium text-gray-300">vs</div>
          <div className="text-2xl font-bold text-orange-300">{opponentScore}</div>
        </div>
      </div>
      
      {/* Mud fountain in center */}
      <MudFlingFountain />
      
      {/* Characters */}
      <div className="absolute bottom-0 left-[5%]">
        <MudCharacter 
          characterId={playerCharacter} 
          position="left"
          onThrow={onThrow}
          x={playerPosition?.x}
          y={playerPosition?.y}
          isPlayer={true}
        />
      </div>
      <div className="absolute bottom-0 right-[5%]">
        <MudCharacter 
          characterId={opponentCharacter}
          position="right"
          x={opponentPosition?.x}
          y={opponentPosition?.y}
        />
      </div>
      
      {/* Render all mudballs (combined list or separate lists) */}
      {mudballs.length > 0 && mudballs.map(mudball => (
        <MudBallSprite 
          key={mudball.id}
          mudball={mudball}
          arenaSize={arenaSize}
          onHit={(target) => {
            try {
              if (target === 'opponent') {
                soundManager.playSFX('mud-hit');
              } else {
                soundManager.playSFX('mud-hit');
              }
            } catch (e) {
              console.warn('Could not play mud hit sound');
            }
            if (onHit) onHit(target);
          }}
        />
      ))}

      {/* Render player and opponent mudballs if provided separately */}
      {mudballs.length === 0 && playerMudballs.map(mudball => (
        <MudBallSprite 
          key={mudball.id}
          mudball={mudball}
          arenaSize={arenaSize}
          onHit={(target) => {
            try {
              soundManager.playSFX('mud-hit');
            } catch (e) {
              console.warn('Could not play mud hit sound');
            }
            if (onHit) onHit(target);
          }}
        />
      ))}

      {mudballs.length === 0 && opponentMudballs.map(mudball => (
        <MudBallSprite 
          key={mudball.id}
          mudball={mudball}
          arenaSize={arenaSize}
          onHit={(target) => {
            try {
              soundManager.playSFX('mud-hit');
            } catch (e) {
              console.warn('Could not play mud hit sound');
            }
            if (onHit) onHit(target);
          }}
        />
      ))}
    </div>
  );
};

export default MudFlingArena;
