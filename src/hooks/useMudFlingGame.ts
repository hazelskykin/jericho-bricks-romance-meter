
import { useState, useEffect } from 'react';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';
import { Character, MudBall, Position } from '@/components/minigames/mudFling/types';
import { useMudBalls } from '@/components/minigames/mudFling/useMudBalls';
import { useCharacterAI } from '@/components/minigames/mudFling/useCharacterAI';

export { Character, MudBall, Position };

export function useMudFlingGame(onComplete: (success: boolean) => void) {
  // Game config
  const gameDuration = 60; // seconds
  const fountainCycleDuration = 5; // seconds
  const characterRecoveryTime = 1; // seconds
  
  // Game state
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [fountainIntensity, setFountainIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  // Update a single character in the characters array
  const updateCharacter = (updatedCharacter: Character) => {
    setCharacters(chars => chars.map(char => {
      if (char.id === updatedCharacter.id) {
        return updatedCharacter;
      }
      return char;
    }));
  };
  
  // Update team score
  const updateScore = (team: 'team1' | 'team2') => {
    if (team === 'team1') {
      setTeam1Score(prev => prev + 1);
    } else {
      setTeam2Score(prev => prev + 1);
    }
  };
  
  // Initialize mud balls logic
  const {
    mudBalls,
    selectedMudBall,
    generateMudBalls,
    updateMudBalls,
    handleMudBallClick,
    handleGameAreaClick,
    throwMudBall
  } = useMudBalls(characters, updateCharacter, updateScore);
  
  // Initialize AI logic
  const { aiCharactersThrow } = useCharacterAI();

  // Initialize characters based on affection levels
  const initializeCharacters = (gameCharacters: Record<string, any>) => {
    const characterAffections = Object.entries(gameCharacters)
      .filter(([id]) => id !== 'maven')
      .sort(([, charA], [, charB]) => charB.affection - charA.affection);
    
    // Partner with highest affection character
    const partnerCharId = characterAffections[0][0] as CharacterId;
    
    // Opponents are the next two highest
    const opponent1CharId = characterAffections[1][0] as CharacterId;
    const opponent2CharId = characterAffections[2][0] as CharacterId;
    
    // Initialize character positions
    const newCharacters: Character[] = [
      {
        id: partnerCharId,
        position: { x: 150, y: 300 },
        team: 'team1',
        isHit: false,
        recoveryTime: 0
      },
      {
        id: 'maven',
        position: { x: 250, y: 300 },
        team: 'team1',
        isHit: false,
        recoveryTime: 0
      },
      {
        id: opponent1CharId,
        position: { x: 400, y: 100 },
        team: 'team2',
        isHit: false,
        recoveryTime: 0
      },
      {
        id: opponent2CharId,
        position: { x: 500, y: 100 },
        team: 'team2',
        isHit: false,
        recoveryTime: 0
      }
    ];
    
    setCharacters(newCharacters);
    
    toast.success(`You're partnered with ${gameCharacters[partnerCharId].name}!`);
  };

  // Game timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      endGame();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining]);
  
  // Fountain cycle
  useEffect(() => {
    const intensities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    
    const fountainTimer = setInterval(() => {
      const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
      setFountainIntensity(randomIntensity);
      
      // Generate mud balls based on intensity
      generateMudBalls(randomIntensity);
    }, fountainCycleDuration * 1000);
    
    return () => clearInterval(fountainTimer);
  }, []);
  
  // Character AI logic and mud ball movement
  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Update mud ball positions
      updateMudBalls();
      
      // Update character states
      updateCharacters();
      
      // AI characters throw mud balls
      aiCharactersThrow(characters, mudBalls, throwMudBall);
    }, 100);
    
    return () => clearInterval(gameLoop);
  }, [mudBalls, characters]);
  
  const updateCharacters = () => {
    setCharacters(prev => prev.map(char => {
      if (char.isHit) {
        if (char.recoveryTime <= 0) {
          return { ...char, isHit: false };
        } else {
          return { ...char, recoveryTime: char.recoveryTime - 0.1 };
        }
      }
      return char;
    }));
  };
  
  const endGame = () => {
    setGameEnded(true);
    const playerWon = team1Score > team2Score;
    
    setTimeout(() => {
      onComplete(playerWon);
    }, 3000);
  };

  return {
    timeRemaining,
    fountainIntensity,
    mudBalls,
    characters,
    selectedMudBall,
    team1Score,
    team2Score,
    gameEnded,
    handleMudBallClick,
    handleGameAreaClick,
    initializeCharacters
  };
}
