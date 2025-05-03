
import { Character, MudBall } from './types';
import { CharacterId } from '@/types/game';

export function useCharacterAI() {
  const aiCharactersThrow = (
    characters: Character[],
    mudBalls: MudBall[],
    throwMudBall: (
      characterId: CharacterId,
      ballId: string,
      targetTeam: 'team1' | 'team2',
      targetPosition: { x: number, y: number }
    ) => void
  ) => {
    // Each AI character tries to throw a mud ball
    characters.forEach(char => {
      if (char.id === 'maven' || char.isHit) return; // Skip player character and hit characters
      
      // 5% chance to throw per frame
      if (Math.random() > 0.95) {
        const availableBalls = mudBalls.filter(ball => !ball.isFlying && !ball.owner);
        
        if (availableBalls.length > 0) {
          // Pick a random ball
          const ballIndex = Math.floor(Math.random() * availableBalls.length);
          const ball = availableBalls[ballIndex];
          
          // Pick a target team (opposite of character's team)
          const targetTeam = char.team === 'team1' ? 'team2' : 'team1';
          
          // Calculate a target position (average position of target team)
          const targetChars = characters.filter(c => c.team === targetTeam);
          const targetX = targetChars.reduce((sum, c) => sum + c.position.x, 0) / targetChars.length;
          const targetY = targetChars.reduce((sum, c) => sum + c.position.y, 0) / targetChars.length;
          
          // Throw the ball
          throwMudBall(char.id, ball.id, targetTeam, { x: targetX, y: targetY });
        }
      }
    });
  };

  return { aiCharactersThrow };
}
