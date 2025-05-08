
import { useState, useCallback } from 'react';
import { Character, MudBall, Position } from './types';
import { soundManager } from '@/utils/soundEffects';

// Unique ID generator
const generateId = () => Math.random().toString(36).substring(2, 9);

export function useMudBalls(
  characters: Character[],
  updateCharacter: (character: Character) => void,
  updateScore: (team: 'team1' | 'team2') => void
) {
  const [mudBalls, setMudBalls] = useState<MudBall[]>([]);
  const [selectedMudBall, setSelectedMudBall] = useState<string | null>(null);

  // Generate new mud balls based on fountain intensity
  const generateMudBalls = useCallback((intensity: 'low' | 'medium' | 'high') => {
    const newBallCount = intensity === 'low' ? 1 : intensity === 'medium' ? 2 : 3;
    const newBalls: MudBall[] = [];

    for (let i = 0; i < newBallCount; i++) {
      // Random position around the fountain
      const baseX = 300 + (Math.random() - 0.5) * 100;
      const baseY = 200 + (Math.random() - 0.5) * 80;
      
      // Random size between 15 and 30
      const size = 15 + Math.floor(Math.random() * 15);

      newBalls.push({
        id: generateId(),
        position: { x: baseX, y: baseY },
        team: Math.random() > 0.5 ? 'team1' : 'team2',
        isFlying: false,
        flying: false, // Alias for isFlying for backward compatibility
        size  // Add size property
      });
    }

    // Limit total number of mud balls to 10
    setMudBalls(current => {
      const combined = [...current, ...newBalls];
      return combined.slice(-10); // Only keep the 10 most recent
    });
  }, []);

  // Update mud ball positions (for flying mud balls)
  const updateMudBalls = useCallback(() => {
    setMudBalls(current => {
      return current.map(ball => {
        if (!ball.isFlying || !ball.targetPosition || !ball.velocity) {
          return ball;
        }

        const newX = ball.position.x + ball.velocity.x;
        const newY = ball.position.y + ball.velocity.y;
        
        // Check if the ball has reached its target or gone offscreen
        const reachedTarget = 
          Math.abs(newX - ball.targetPosition.x) < 10 && 
          Math.abs(newY - ball.targetPosition.y) < 10;
        
        const isOffscreen = 
          newX < -20 || newX > 620 || newY < -20 || newY > 420;
        
        if (reachedTarget || isOffscreen) {
          // Check if it hit any character
          if (!isOffscreen) {
            checkHits(ball, { x: newX, y: newY });
          }
          
          // Remove the ball
          return null;
        }

        // Continue flying
        return {
          ...ball,
          position: { x: newX, y: newY }
        };
      }).filter(Boolean) as MudBall[];
    });
  }, []);

  // Check if a flying mud ball hits any character
  const checkHits = useCallback((ball: MudBall, position: Position) => {
    characters.forEach(character => {
      // Skip characters on the same team
      if (character.team === ball.team) return;
      
      // Skip characters that are already hit
      if (character.isHit) return;
      
      // Check for collision (simple distance check)
      const distance = Math.sqrt(
        Math.pow(character.position.x - position.x, 2) + 
        Math.pow(character.position.y - position.y, 2)
      );
      
      // If collision detected
      if (distance < 40) {
        // Update character state
        updateCharacter({
          ...character,
          isHit: true,
          recoveryTime: 1 // 1 second recovery time
        });
        
        // Update score
        updateScore(ball.team);
        
        // Play hit sound
        soundManager.play('mud-hit');
      }
    });
  }, [characters, updateCharacter, updateScore]);

  // Handle mud ball click
  const handleMudBallClick = useCallback((id: string) => {
    setSelectedMudBall(prevId => prevId === id ? null : id);
    
    // Play select sound
    soundManager.play('mud-select');
  }, []);

  // Handle game area click (for throwing mud balls)
  const handleGameAreaClick = useCallback((x: number, y: number) => {
    if (!selectedMudBall) return;
    
    // Find the selected mud ball
    const ball = mudBalls.find(b => b.id === selectedMudBall);
    if (!ball || ball.isFlying) return;
    
    // Calculate velocity based on distance
    const dx = x - ball.position.x;
    const dy = y - ball.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize and scale velocity
    const speedFactor = 5;
    const vx = (dx / distance) * speedFactor;
    const vy = (dy / distance) * speedFactor;
    
    throwMudBall(ball.id, { x, y }, { x: vx, y: vy });
  }, [selectedMudBall, mudBalls]);

  // Throw a mud ball
  const throwMudBall = useCallback((
    ballId: string, 
    target: Position, 
    velocity?: { x: number, y: number }
  ) => {
    setMudBalls(current => {
      return current.map(ball => {
        if (ball.id !== ballId) return ball;
        
        // Calculate velocity if not provided
        let ballVelocity = velocity;
        if (!ballVelocity) {
          const dx = target.x - ball.position.x;
          const dy = target.y - ball.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Default speed
          const speedFactor = 5;
          ballVelocity = {
            x: (dx / distance) * speedFactor,
            y: (dy / distance) * speedFactor
          };
        }
        
        // Play throw sound
        soundManager.play('mud-throw');
        
        // Return updated ball
        return {
          ...ball,
          isFlying: true,
          flying: true, // Alias for isFlying for backward compatibility
          targetPosition: target,
          velocity: ballVelocity
        };
      });
    });
    
    // Clear selection after throwing
    setSelectedMudBall(null);
  }, []);

  return {
    mudBalls,
    selectedMudBall,
    generateMudBalls,
    updateMudBalls,
    handleMudBallClick,
    handleGameAreaClick,
    throwMudBall
  };
}
