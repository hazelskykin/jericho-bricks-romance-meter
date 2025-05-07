
import { useState, useEffect } from 'react';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';
import type { Character, MudBall, Position } from '@/components/minigames/mudFling/types';
import { useMudBalls } from '@/components/minigames/mudFling/useMudBalls';
import { useCharacterAI } from '@/components/minigames/mudFling/useCharacterAI';
import { soundManager } from '@/utils/soundEffects';

export type { Character, MudBall, Position };

export function useMudFlingGame(onComplete: (success: boolean) => void, onExit: () => void) {
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
  const [initialized, setInitialized] = useState(false);

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
    
    // Play sound
    soundManager.play('score-up');
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
  const initializeCharacters = (gameCharacters: Record<string, any> = {}) => {
    try {
      // Default values if we can't get character data or it's incomplete
      let partnerCharId: CharacterId = 'xavier';
      let opponent1CharId: CharacterId = 'navarre';
      let opponent2CharId: CharacterId = 'senara';
      
      // Check if we have valid character data with affection values
      if (gameCharacters && Object.keys(gameCharacters).length >= 3) {
        // Try to get characters sorted by affection
        const characterAffections = Object.entries(gameCharacters)
          .filter(([id]) => id !== 'maven')
          .sort(([, charA], [, charB]) => (charB.affection || 0) - (charA.affection || 0));
        
        // If we have enough characters in the sorted array
        if (characterAffections.length >= 3) {
          // Partner with highest affection character
          partnerCharId = characterAffections[0][0] as CharacterId;
          
          // Opponents are the next two highest
          opponent1CharId = characterAffections[1][0] as CharacterId;
          opponent2CharId = characterAffections[2][0] as CharacterId;
        }
      }
      
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
      setInitialized(true);
      
      toast.success(`You're partnered with ${partnerCharId}!`);
    } catch (error) {
      console.error("Error initializing characters:", error);
      
      // Fallback initialization with default characters
      const fallbackCharacters: Character[] = [
        {
          id: 'xavier',
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
          id: 'navarre',
          position: { x: 400, y: 100 },
          team: 'team2',
          isHit: false,
          recoveryTime: 0
        },
        {
          id: 'senara',
          position: { x: 500, y: 100 },
          team: 'team2',
          isHit: false,
          recoveryTime: 0
        }
      ];
      
      setCharacters(fallbackCharacters);
      setInitialized(true);
      toast.success(`You're partnered with Xavier!`);
    }
  };

  // Game timer
  useEffect(() => {
    if (!initialized || gameEnded) return;
    
    if (timeRemaining <= 0) {
      endGame();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining, initialized, gameEnded]);
  
  // Fountain cycle
  useEffect(() => {
    if (!initialized) return;
    
    const intensities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    
    const fountainTimer = setInterval(() => {
      const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
      setFountainIntensity(randomIntensity);
      
      // Generate mud balls based on intensity
      generateMudBalls(randomIntensity);
    }, fountainCycleDuration * 1000);
    
    return () => clearInterval(fountainTimer);
  }, [initialized]);
  
  // Character AI logic and mud ball movement
  useEffect(() => {
    if (!initialized) return;
    
    const gameLoop = setInterval(() => {
      // Update mud ball positions
      updateMudBalls();
      
      // Update character states
      updateCharacters();
      
      // AI characters throw mud balls - only if we have characters and mud balls
      if (characters.length > 0 && mudBalls.length > 0) {
        aiCharactersThrow(characters, mudBalls, throwMudBall);
      }
    }, 100);
    
    return () => clearInterval(gameLoop);
  }, [mudBalls, characters, initialized]);
  
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
    
    // Play win/lose sound
    soundManager.play(playerWon ? 'game-win' : 'game-lose');
    
    // Show win/lose message
    if (playerWon) {
      toast.success("Your team wins the mud fling competition!");
    } else {
      toast.error("The other team won this time!");
    }
    
    // Complete the minigame after a delay
    setTimeout(() => {
      onComplete(playerWon);
    }, 3000);
  };
  
  // Handle exit button properly
  const handleExit = () => {
    if (gameEnded) {
      // Game is already complete, so just exit
      onExit();
    } else {
      // Game is not complete, ask for confirmation
      if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
        onExit();
      }
    }
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
    initialized,
    handleMudBallClick,
    handleGameAreaClick,
    initializeCharacters,
    handleExit
  };
}
