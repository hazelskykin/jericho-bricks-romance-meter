
import { Character, MudBall, Position } from './types';

interface AISettings {
  decisionFrequency: number; // How often AI characters make decisions (0-1)
  aimAccuracy: number; // How accurate AI aiming is (0-1)
}

export function useCharacterAI() {
  // AI settings
  const aiSettings: AISettings = {
    decisionFrequency: 0.03, // 3% chance per frame to make a decision
    aimAccuracy: 0.7 // 70% accuracy
  };

  // AI character throws a mud ball
  const aiCharactersThrow = (
    characters: Character[], 
    mudBalls: MudBall[], 
    throwMudBall: (ballId: string, target: Position, velocity?: { x: number, y: number }) => void
  ) => {
    // Only team2 members are AI controlled
    const aiCharacters = characters.filter(char => char.team === 'team2' && !char.isHit);
    
    // No AI characters available to throw
    if (aiCharacters.length === 0) return;
    
    // Find available mud balls for team2
    const availableBalls = mudBalls.filter(
      ball => ball.team === 'team2' && !ball.isFlying
    );
    
    // No mud balls available to throw
    if (availableBalls.length === 0) return;
    
    // For each AI character, decide whether to throw
    aiCharacters.forEach(aiChar => {
      // Random decision to throw based on frequency
      if (Math.random() > aiSettings.decisionFrequency) return;
      
      // Choose a random mud ball to throw
      const ballToThrow = availableBalls[Math.floor(Math.random() * availableBalls.length)];
      if (!ballToThrow) return;
      
      // Find target characters (player team)
      const targets = characters.filter(char => char.team === 'team1' && !char.isHit);
      if (targets.length === 0) return;
      
      // Choose a random target
      const target = targets[Math.floor(Math.random() * targets.length)];
      
      // Calculate target position with some randomness based on accuracy
      const accuracy = aiSettings.aimAccuracy;
      const randomFactor = 1 - accuracy;
      
      const targetX = target.position.x + (Math.random() * 80 - 40) * randomFactor;
      const targetY = target.position.y + (Math.random() * 80 - 40) * randomFactor;
      
      // Throw the mud ball
      throwMudBall(ballToThrow.id, { x: targetX, y: targetY });
    });
  };

  return {
    aiCharactersThrow
  };
}
