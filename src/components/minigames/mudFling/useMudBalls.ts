
import { useState } from 'react';
import { MudBall, Character, Position } from './types';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';

export function useMudBalls(
  characters: Character[],
  updateCharacters: (updatedCharacter: Character) => void,
  updateScore: (team: 'team1' | 'team2') => void
) {
  const [mudBalls, setMudBalls] = useState<MudBall[]>([]);
  const [selectedMudBall, setSelectedMudBall] = useState<string | null>(null);
  
  const generateMudBalls = (intensity: 'low' | 'medium' | 'high') => {
    const ballCount = intensity === 'low' ? 1 : intensity === 'medium' ? 2 : 3;
    
    const newBalls: MudBall[] = [];
    
    for (let i = 0; i < ballCount; i++) {
      // Generate balls at random positions on the field
      const x = 200 + Math.random() * 200;
      const y = 150 + Math.random() * 100;
      
      newBalls.push({
        id: `mud-${Date.now()}-${i}`,
        position: { x, y },
        owner: null,
        isFlying: false
      });
    }
    
    setMudBalls(prev => [...prev, ...newBalls]);
  };
  
  const updateMudBalls = () => {
    setMudBalls(prev => {
      return prev.map(ball => {
        if (ball.isFlying && ball.flightPath) {
          const { start, end, progress } = ball.flightPath;
          
          // Update ball position along flight path
          const newProgress = progress + 0.05; // 5% progress per frame
          
          if (newProgress >= 1) {
            // Ball reached destination, check for hits
            const targetTeam = ball.target;
            const targetCharacters = characters.filter(char => char.team === targetTeam && !char.isHit);
            
            if (targetCharacters.length > 0) {
              // Check if ball hit any character
              const hitIndex = Math.floor(Math.random() * targetCharacters.length);
              const hitCharacter = targetCharacters[hitIndex];
              
              // Register hit
              updateCharacters({
                ...hitCharacter,
                isHit: true,
                recoveryTime: 1 // characterRecoveryTime
              });
              
              // Update score
              if (targetTeam === 'team1') {
                updateScore('team2');
              } else {
                updateScore('team1');
              }
            }
            
            // Remove the ball
            return null;
          }
          
          // Calculate new position
          const newX = start.x + (end.x - start.x) * newProgress;
          const newY = start.y + (end.y - start.y) * newProgress;
          
          return {
            ...ball,
            position: { x: newX, y: newY },
            flightPath: {
              ...ball.flightPath,
              progress: newProgress
            }
          };
        }
        
        return ball;
      }).filter(Boolean) as MudBall[];
    });
  };
  
  const handleMudBallClick = (ballId: string) => {
    // Can only select mud balls that aren't flying
    const ball = mudBalls.find(b => b.id === ballId && !b.isFlying);
    
    if (ball) {
      setSelectedMudBall(ballId);
    }
  };
  
  const handleGameAreaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedMudBall) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Throw mud ball at clicked position
    setMudBalls(balls => balls.map(ball => {
      if (ball.id === selectedMudBall) {
        return {
          ...ball,
          owner: 'maven',
          isFlying: true,
          target: 'team2', // Player is always on team1
          flightPath: {
            start: ball.position,
            end: { x, y },
            progress: 0
          }
        };
      }
      return ball;
    }));
    
    setSelectedMudBall(null);
  };
  
  const throwMudBall = (
    characterId: CharacterId,
    ballId: string,
    targetTeam: 'team1' | 'team2',
    targetPosition: Position
  ) => {
    setMudBalls(balls => balls.map(ball => {
      if (ball.id === ballId) {
        return {
          ...ball,
          owner: characterId,
          isFlying: true,
          target: targetTeam,
          flightPath: {
            start: ball.position,
            end: targetPosition,
            progress: 0
          }
        };
      }
      return ball;
    }));
  };

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
