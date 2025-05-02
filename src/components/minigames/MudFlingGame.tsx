
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import MinigameContainer from './MinigameContainer';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';

interface Position {
  x: number;
  y: number;
}

interface MudBall {
  id: string;
  position: Position;
  owner: 'player' | CharacterId;
  target?: 'team1' | 'team2';
  isFlying: boolean;
  flightPath?: {
    start: Position;
    end: Position;
    progress: number;
  };
}

interface Character {
  id: CharacterId;
  position: Position;
  team: 'team1' | 'team2';
  isHit: boolean;
  recoveryTime: number;
}

interface MudFlingGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  const { gameState } = useGame();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Game config
  const gameDuration = 60; // seconds
  const fountainCycleDuration = 5; // seconds
  const characterRecoveryTime = 1; // seconds
  
  // Game state
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [fountainIntensity, setFountainIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [mudBalls, setMudBalls] = useState<MudBall[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedMudBall, setSelectedMudBall] = useState<string | null>(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  
  // Select teams based on affection ratings
  useEffect(() => {
    const characterAffections = Object.entries(gameState.characters)
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
        position: { x: 150, y: 400 },
        team: 'team1',
        isHit: false,
        recoveryTime: 0
      },
      {
        id: 'maven',
        position: { x: 250, y: 400 },
        team: 'team1',
        isHit: false,
        recoveryTime: 0
      },
      {
        id: opponent1CharId,
        position: { x: 550, y: 150 },
        team: 'team2',
        isHit: false,
        recoveryTime: 0
      },
      {
        id: opponent2CharId,
        position: { x: 650, y: 150 },
        team: 'team2',
        isHit: false,
        recoveryTime: 0
      }
    ];
    
    setCharacters(newCharacters);
    
    toast.success(`You're partnered with ${gameState.characters[partnerCharId].name}!`);
    
  }, []);
  
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
      aiCharactersThrow();
    }, 100);
    
    return () => clearInterval(gameLoop);
  }, [mudBalls, characters]);
  
  const generateMudBalls = (intensity: 'low' | 'medium' | 'high') => {
    const ballCount = intensity === 'low' ? 1 : intensity === 'medium' ? 2 : 3;
    
    const newBalls: MudBall[] = [];
    
    for (let i = 0; i < ballCount; i++) {
      // Generate balls at random positions on the field
      const x = 200 + Math.random() * 400;
      const y = 150 + Math.random() * 200;
      
      newBalls.push({
        id: `mud-${Date.now()}-${i}`,
        position: { x, y },
        owner: 'player', // Initially no owner
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
              setCharacters(chars => chars.map(char => {
                if (char.id === hitCharacter.id) {
                  return { ...char, isHit: true, recoveryTime: characterRecoveryTime };
                }
                return char;
              }));
              
              // Update score
              if (targetTeam === 'team1') {
                setTeam2Score(prev => prev + 1);
              } else {
                setTeam1Score(prev => prev + 1);
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
  
  const aiCharactersThrow = () => {
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
          
          // Update the ball to be thrown
          setMudBalls(balls => balls.map(b => {
            if (b.id === ball.id) {
              return {
                ...b,
                owner: char.id,
                isFlying: true,
                target: targetTeam,
                flightPath: {
                  start: b.position,
                  end: { x: targetX, y: targetY },
                  progress: 0
                }
              };
            }
            return b;
          }));
        }
      }
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
    if (!selectedMudBall || !gameAreaRef.current) return;
    
    // Calculate relative click position
    const rect = gameAreaRef.current.getBoundingClientRect();
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
  
  const endGame = () => {
    setGameEnded(true);
    const playerWon = team1Score > team2Score;
    
    setTimeout(() => {
      onComplete(playerWon);
    }, 3000);
  };
  
  return (
    <MinigameContainer
      title="Mud-fling"
      instructions="Select a mud ball and then click where you want to throw it. Hit the opposing team to score points!"
      onComplete={onComplete}
      onExit={onExit}
      showExitButton={!gameEnded}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-white">Time Remaining:</span>
            <span className="font-bold text-yellow-300">{timeRemaining}s</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white">Fountain:</span>
            <span className={`font-bold ${
              fountainIntensity === 'low' ? 'text-blue-300' :
              fountainIntensity === 'medium' ? 'text-blue-400' :
              'text-blue-500'
            }`}>
              {fountainIntensity === 'low' ? 'Trickling' :
               fountainIntensity === 'medium' ? 'Flowing' :
               'Gushing'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#4CC2FF]">Your Team: {team1Score}</span>
            <span>vs</span>
            <span className="font-bold text-[#FF5E5B]">Opponents: {team2Score}</span>
          </div>
        </div>
        
        <div 
          ref={gameAreaRef}
          className="relative w-full h-[400px] bg-gradient-to-b from-[#335533] to-[#553311] rounded-lg overflow-hidden border-2 border-gray-700"
          onClick={handleGameAreaClick}
        >
          {/* Fountain in center */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center"
              animate={{
                scale: fountainIntensity === 'low' ? [1, 1.1] :
                       fountainIntensity === 'medium' ? [1, 1.2] : [1, 1.3],
                opacity: [0.7, 0.9]
              }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-300" />
            </motion.div>
            
            {/* Water spray */}
            <motion.div 
              className="absolute left-1/2 top-0 transform -translate-x-1/2 w-40 h-40"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: fountainIntensity === 'low' ? 0.3 :
                         fountainIntensity === 'medium' ? 0.5 : 0.7
              }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-1 h-1 bg-blue-300 rounded-full"
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: [1, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1 + Math.random(),
                    delay: Math.random()
                  }}
                />
              ))}
            </motion.div>
          </div>
          
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
              onClick={() => handleMudBallClick(ball.id)}
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
                backgroundColor: gameState.characters[char.id].color
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
        
        {gameEnded && (
          <div className={`mt-4 p-3 rounded-lg text-white text-center ${
            team1Score > team2Score ? 'bg-green-800/70' : 'bg-red-800/70'
          }`}>
            <h3 className="text-xl font-bold">
              {team1Score > team2Score ? 'You Won!' : 'You Lost!'}
            </h3>
            <p>Final Score: {team1Score} - {team2Score}</p>
          </div>
        )}
      </div>
    </MinigameContainer>
  );
};

export default MudFlingGame;
