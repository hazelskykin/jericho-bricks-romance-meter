
import { useState } from 'react';
import { MudBall, MudCharacterPosition } from './types';

export const useMudBalls = () => {
  const [playerMudballs, setPlayerMudballs] = useState<MudBall[]>([]);
  const [opponentMudballs, setOpponentMudballs] = useState<MudBall[]>([]);

  const throwMudball = (
    owner: 'player' | 'opponent',
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  ) => {
    const speed = 5;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    const newMudball: MudBall = {
      id: `${owner}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: { x: startX, y: startY },
      team: owner === 'player' ? 'team1' : 'team2',
      isFlying: true,
      flying: true,
      size: 15,
      targetPosition: { x: targetX, y: targetY },
      // Legacy properties
      x: startX,
      y: startY,
      targetX,
      targetY,
      speed,
      state: 'flying',
      owner,
      timeLeft: 30, // Frames until it disappears
      angle: angle
    };

    if (owner === 'player') {
      setPlayerMudballs(prev => [...prev, newMudball]);
    } else {
      setOpponentMudballs(prev => [...prev, newMudball]);
    }
  };

  const updateMudballs = (
    playerPosition: MudCharacterPosition,
    opponentPosition: MudCharacterPosition,
    onHit?: (hitTarget: 'player' | 'opponent') => void
  ) => {
    // Update player mudballs
    setPlayerMudballs(prev => 
      prev
        .map(ball => {
          if (ball.state === 'splashed') {
            return { 
              ...ball, 
              timeLeft: (ball.timeLeft || 0) - 1,
              state: 'splashed' as const
            };
          }

          // Move the ball toward target
          const dx = (ball.targetX || 0) - (ball.x || 0);
          const dy = (ball.targetY || 0) - (ball.y || 0);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if it hits opponent
          const distToOpponent = Math.sqrt(
            Math.pow((ball.x || 0) - opponentPosition.x, 2) + 
            Math.pow((ball.y || 0) - opponentPosition.y, 2)
          );
          
          if (distToOpponent < 30) { // Hit radius
            if (onHit) onHit('opponent');
            return { 
              ...ball, 
              state: 'splashed' as const, 
              timeLeft: 10,
              isFlying: false,
              flying: false 
            };
          }
          
          // Ball reached target or close enough
          if (distance < (ball.speed || 5)) {
            return { 
              ...ball, 
              state: 'splashed' as const, 
              timeLeft: 10,
              isFlying: false,
              flying: false 
            };
          }
          
          // Move the ball
          const ratio = (ball.speed || 5) / distance;
          const moveX = dx * ratio;
          const moveY = dy * ratio;
          
          return { 
            ...ball, 
            x: (ball.x || 0) + moveX, 
            y: (ball.y || 0) + moveY,
            position: {
              x: (ball.x || 0) + moveX,
              y: (ball.y || 0) + moveY
            }
          };
        })
        .filter(ball => (ball.timeLeft || 0) > 0)
    );
    
    // Update opponent mudballs
    setOpponentMudballs(prev => 
      prev
        .map(ball => {
          if (ball.state === 'splashed') {
            return { 
              ...ball, 
              timeLeft: (ball.timeLeft || 0) - 1,
              state: 'splashed' as const
            };
          }

          // Move the ball toward target
          const dx = (ball.targetX || 0) - (ball.x || 0);
          const dy = (ball.targetY || 0) - (ball.y || 0);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if it hits player
          const distToPlayer = Math.sqrt(
            Math.pow((ball.x || 0) - playerPosition.x, 2) + 
            Math.pow((ball.y || 0) - playerPosition.y, 2)
          );
          
          if (distToPlayer < 30) { // Hit radius
            if (onHit) onHit('player');
            return { 
              ...ball, 
              state: 'splashed' as const, 
              timeLeft: 10,
              isFlying: false,
              flying: false 
            };
          }
          
          // Ball reached target or close enough
          if (distance < (ball.speed || 5)) {
            return { 
              ...ball, 
              state: 'splashed' as const, 
              timeLeft: 10,
              isFlying: false, 
              flying: false 
            };
          }
          
          // Move the ball
          const ratio = (ball.speed || 5) / distance;
          const moveX = dx * ratio;
          const moveY = dy * ratio;
          
          return { 
            ...ball, 
            x: (ball.x || 0) + moveX, 
            y: (ball.y || 0) + moveY,
            position: {
              x: (ball.x || 0) + moveX,
              y: (ball.y || 0) + moveY
            }
          };
        })
        .filter(ball => (ball.timeLeft || 0) > 0)
    );
  };

  const resetMudballs = () => {
    setPlayerMudballs([]);
    setOpponentMudballs([]);
  };

  // For compatibility with the new useMudFlingGame hook
  const mudBalls: MudBall[] = [...playerMudballs, ...opponentMudballs];
  const selectedMudBall = null;
  const generateMudBalls = () => {}; 
  const updateMudBalls = () => updateMudballs({ x: 0, y: 0 }, { x: 0, y: 0 });
  const handleMudBallClick = () => {};
  const handleGameAreaClick = () => {};
  const throwMudBall = (ballId: string, target: Position, velocity?: { x: number, y: number }) => {};

  return {
    playerMudballs,
    opponentMudballs,
    throwMudball,
    updateMudballs,
    resetMudballs,
    // New API compatibility
    mudBalls,
    selectedMudBall,
    generateMudBalls,
    updateMudBalls,
    handleMudBallClick,
    handleGameAreaClick,
    throwMudBall
  };
};

// Define Position interface for compatibility
interface Position {
  x: number;
  y: number;
}

export default useMudBalls;
