import React, { useState, useEffect, useRef, useCallback } from 'react';
import MinigameContainer from '../MinigameContainer';
import MudFlingArena from './MudFlingArena';
import MudFlingControls from './MudFlingControls';
import MudFlingFountain from './MudFlingFountain';
import { useMudBalls } from './useMudBalls';
import { useCharacterAI } from './useCharacterAI';
import { CharacterPosition, MudBall, Player } from './types';
import { soundManager } from '@/utils/soundEffects';

interface MudFlingGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds game
  const [characters, setCharacters] = useState<CharacterPosition[]>([]);
  const [fountainPosition, setFountainPosition] = useState({ x: 400, y: 300 });
  const [playerCharacter, setPlayerCharacter] = useState<Player>({
    id: 'player',
    x: 400,
    y: 500,
    width: 50,
    height: 80,
    speed: 5,
    energy: 100,
    isMuddy: false,
    isAtFountain: false
  });
  
  // Constants
  const maxEnergy = 100;
  const energyRecoveryRate = 2;
  const energyThrowCost = 10;
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Custom hooks for mud balls and AI
  const { mudBalls, addMudBall, updateMudBalls, checkCollisions } = useMudBalls();
  const { updateAICharacters } = useCharacterAI(addMudBall);
  
  // Initialize game
  useEffect(() => {
    if (!gameStarted) {
      // Initialize characters
      const initialCharacters: CharacterPosition[] = [
        { id: 'ai1', x: 200, y: 100, width: 50, height: 80, isMuddy: false },
        { id: 'ai2', x: 600, y: 100, width: 50, height: 80, isMuddy: false },
        { id: 'ai3', x: 400, y: 200, width: 50, height: 80, isMuddy: false },
      ];
      
      setCharacters(initialCharacters);
      setGameStarted(true);
      
      // Play background music
      soundManager.playMusic('game-background', 0.5, true);
    }
    
    return () => {
      // Clean up
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
      soundManager.stopMusic('game-background');
    };
  }, [gameStarted]);
  
  // Game timer
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Game over
            clearInterval(gameTimerRef.current!);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, [gameStarted, gameOver]);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameLoop = setInterval(() => {
      // Update mud balls and check collisions
      updateMudBalls();
      
      // Check for collisions between mud balls and characters
      const collisionResults = checkCollisions([...characters, playerCharacter]);
      
      // Update characters based on collisions
      if (collisionResults.length > 0) {
        // Handle player getting hit
        const playerHit = collisionResults.find(result => result.characterId === 'player');
        if (playerHit) {
          setPlayerCharacter(prev => ({
            ...prev,
            isMuddy: true
          }));
          
          // Play hit sound
          soundManager.playSFX('mud-hit');
          
          // Decrease player score
          setPlayerScore(prev => Math.max(0, prev - 1));
          
          // Clear muddy state after a delay
          setTimeout(() => {
            setPlayerCharacter(prev => ({
              ...prev,
              isMuddy: false
            }));
          }, 2000);
        }
        
        // Handle AI characters getting hit
        const aiHits = collisionResults.filter(result => result.characterId !== 'player');
        if (aiHits.length > 0) {
          setCharacters(prev => 
            prev.map(char => {
              const hit = aiHits.find(result => result.characterId === char.id);
              if (hit) {
                // Play hit sound
                soundManager.playSFX('mud-hit');
                
                // Increase player score
                setPlayerScore(prev => prev + 1);
                
                return { ...char, isMuddy: true };
              }
              return char;
            })
          );
          
          // Clear muddy state after a delay
          setTimeout(() => {
            setCharacters(prev => 
              prev.map(char => {
                const hit = aiHits.find(result => result.characterId === char.id);
                if (hit) {
                  return { ...char, isMuddy: false };
                }
                return char;
              })
            );
          }, 2000);
        }
      }
      
      // Update AI characters
      const updatedAICharacters = updateAICharacters(characters, playerCharacter);
      setCharacters(updatedAICharacters);
      
      // Check if player is at the fountain
      const isAtFountain = 
        Math.abs(playerCharacter.x - fountainPosition.x) < 50 && 
        Math.abs(playerCharacter.y - fountainPosition.y) < 50;
      
      // Update player energy and fountain status
      setPlayerCharacter(prev => {
        let newEnergy = prev.energy;
        
        // Recover energy faster at fountain
        if (isAtFountain) {
          newEnergy = Math.min(maxEnergy, prev.energy + energyRecoveryRate * 2);
        } else {
          newEnergy = Math.min(maxEnergy, prev.energy + energyRecoveryRate / 2);
        }
        
        return {
          ...prev,
          energy: newEnergy,
          isAtFountain
        };
      });
      
    }, 1000 / 30); // 30 FPS
    
    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, characters, playerCharacter, updateMudBalls, checkCollisions, updateAICharacters]);
  
  // Handle game over
  useEffect(() => {
    if (gameOver) {
      // Determine if player won
      const success = playerScore >= 10;
      
      // Show game over message
      setTimeout(() => {
        onComplete(success);
      }, 2000);
    }
  }, [gameOver, playerScore, onComplete]);
  
  // Handle player movement
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (gameOver) return;
    
    const { key } = event;
    const moveDistance = playerCharacter.speed;
    
    setPlayerCharacter(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      // Move based on arrow keys
      if (key === 'ArrowUp' || key === 'w') {
        newY = Math.max(0, prev.y - moveDistance);
      } else if (key === 'ArrowDown' || key === 's') {
        newY = Math.min(600 - prev.height, prev.y + moveDistance);
      } else if (key === 'ArrowLeft' || key === 'a') {
        newX = Math.max(0, prev.x - moveDistance);
      } else if (key === 'ArrowRight' || key === 'd') {
        newX = Math.min(800 - prev.width, prev.x + moveDistance);
      }
      
      return { ...prev, x: newX, y: newY };
    });
  };
  
  // Handle player throw
  const handlePlayerThrow = useCallback((targetX: number, targetY: number) => {
    if (gameOver || playerCharacter.energy < energyThrowCost) return;
    
    // Calculate direction vector
    const dirX = targetX - playerCharacter.x;
    const dirY = targetY - playerCharacter.y;
    
    // Normalize direction
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    const normalizedDirX = dirX / length;
    const normalizedDirY = dirY / length;
    
    // Create mud ball
    addMudBall({
      x: playerCharacter.x,
      y: playerCharacter.y,
      velocityX: normalizedDirX * 10,
      velocityY: normalizedDirY * 10,
      thrownBy: 'player'
    });
    
    // Decrease energy
    setPlayerCharacter(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - energyThrowCost)
    }));
    
    // Play throw sound
    soundManager.playSFX('mud-throw');
  }, [playerCharacter, gameOver, addMudBall]);
  
  // Handle player throw from arena click
  const handleArenaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Get click position within the arena
    const arenaRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - arenaRect.left;
    const y = event.clientY - arenaRect.top;
    
    // Pass the coordinates to the throw handler
    handlePlayerThrow(x, y);
  };
  
  // Handle game completion
  const handleComplete = (success: boolean) => {
    // Clean up
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    // Call parent completion handler
    onComplete(success);
  };
  
  // Render the game
  return (
    <MinigameContainer
      title="Mud Fling Challenge"
      instructions="Click to throw mud at the other characters! Dodge incoming mud by moving your character with the arrow keys."
      onComplete={handleComplete}
      onExit={onExit}
    >
      <div className="flex flex-col h-full">
        <MudFlingControls 
          score={playerScore}
          timeLeft={timeLeft}
          energy={playerCharacter.energy} 
          maxEnergy={maxEnergy}
        />
        
        <div className="flex-grow relative overflow-hidden">
          <MudFlingArena 
            onAreaClick={handleArenaClick} 
            onKeyDown={handleKeyDown} 
            characters={characters}
            mudBalls={mudBalls}
            playerCharacter={playerCharacter}
          />
          
          <MudFlingFountain 
            isActive={playerCharacter.isAtFountain} 
            position={fountainPosition} 
          />
        </div>
      </div>
    </MinigameContainer>
  );
};

export default MudFlingGame;
