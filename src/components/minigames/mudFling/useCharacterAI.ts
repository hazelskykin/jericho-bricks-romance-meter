import { useState, useCallback } from 'react';
import { Character, MudBall, Position, MudCharacterPosition } from './types';

interface UseCharacterAIProps {
  playerPosition: React.RefObject<MudCharacterPosition>;
  opponentPosition: React.RefObject<MudCharacterPosition>;
  throwMudball: (x: number, y: number) => void;
}

export function useCharacterAI({ 
  playerPosition, 
  opponentPosition, 
  throwMudball 
}: UseCharacterAIProps) {
  const [lastThrowTime, setLastThrowTime] = useState(0);
  const [aiMovementTime, setAiMovementTime] = useState(0);
  const [aiMovementDirection, setAiMovementDirection] = useState({ x: 1, y: 1 });

  // AI decision making - when to throw mud
  const updateOpponent = useCallback(() => {
    // Only move AI opponent every 500ms
    const now = Date.now();
    if (now - aiMovementTime > 500) {
      setAiMovementTime(now);
      
      // Simple AI movement that stays within bounds
      if (!opponentPosition.current) return;
      
      // Random chance to change direction
      if (Math.random() < 0.2) {
        setAiMovementDirection({
          x: Math.random() > 0.5 ? 1 : -1,
          y: Math.random() > 0.5 ? 1 : -1
        });
      }
      
      // Update position with boundary checking
      let newX = opponentPosition.current.x + (aiMovementDirection.x * 10);
      let newY = opponentPosition.current.y + (aiMovementDirection.y * 5);
      
      // Keep within arena bounds (right side of arena)
      newX = Math.max(350, Math.min(550, newX));
      newY = Math.max(50, Math.min(400, newY));
      
      opponentPosition.current.x = newX;
      opponentPosition.current.y = newY;
      
      // Decide whether to throw based on timing
      if (now - lastThrowTime > 2000) { // throw every 2 seconds
        setLastThrowTime(now);
        if (playerPosition.current) {
          // Add some randomness to the throw
          const targetX = playerPosition.current.x + (Math.random() * 40 - 20);
          const targetY = playerPosition.current.y + (Math.random() * 40 - 20);
          throwMudball(targetX, targetY);
        }
      }
    }
  }, [opponentPosition, playerPosition, lastThrowTime, aiMovementTime, aiMovementDirection, throwMudball]);
  
  // Added for compatibility with useMudFlingGame
  const aiCharactersThrow = useCallback((
    characters: Character[],
    mudBalls: MudBall[],
    throwMudBall: (ballId: string, target: Position, velocity?: { x: number, y: number }) => void
  ) => {
    // Find AI characters (team2)
    const aiCharacters = characters.filter(char => char.team === 'team2' && !char.isHit);
    
    // For each AI character, decide if they should throw
    aiCharacters.forEach(character => {
      // Random chance to throw (about 5% per call)
      if (Math.random() < 0.05) {
        // Find a target (preferably a player character)
        const playerCharacters = characters.filter(char => char.team === 'team1' && !char.isHit);
        
        if (playerCharacters.length > 0) {
          // Target a random player character
          const targetChar = playerCharacters[Math.floor(Math.random() * playerCharacters.length)];
          
          // Find an available mud ball
          const availableBalls = mudBalls.filter(ball => 
            !(ball as any).isThrown && !(ball as any).isHeld
          );
          
          if (availableBalls.length > 0) {
            const ballToThrow = availableBalls[Math.floor(Math.random() * availableBalls.length)];
            
            // Add some randomness to the throw
            const targetPosition = {
              x: targetChar.position.x + (Math.random() * 40 - 20),
              y: targetChar.position.y + (Math.random() * 40 - 20)
            };
            
            // Calculate velocity based on distance
            const dx = targetPosition.x - character.position.x;
            const dy = targetPosition.y - character.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Normalize and scale
            const velocity = {
              x: (dx / distance) * 5,
              y: (dy / distance) * 5
            };
            
            // Throw the mud ball
            throwMudBall(ballToThrow.id, targetPosition, velocity);
          }
        }
      }
    });
  }, []);

  return { 
    updateOpponentPosition: updateOpponent,
    updateOpponent, 
    aiCharactersThrow 
  };
}

export default useCharacterAI;
