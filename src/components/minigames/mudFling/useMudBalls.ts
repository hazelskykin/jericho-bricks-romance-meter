
import { useState } from 'react';
import { MudballData, MudCharacterPosition, Position } from './types';

export const useMudBalls = () => {
  const [playerMudballs, setPlayerMudballs] = useState<MudballData[]>([]);
  const [opponentMudballs, setOpponentMudballs] = useState<MudballData[]>([]);

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
    
    const newMudball: MudballData = {
      id: `${owner}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: startX,
      y: startY,
      targetX,
      targetY,
      rotation: angle,
      speed,
      shooter: owner,
      state: 'flying',
      position: { x: startX, y: startY },
      targetPosition: { x: targetX, y: targetY },
      owner,
      team: owner === 'player' ? 'team1' : 'team2',
      timeLeft: 30, // Frames until it disappears
      isFlying: true,
      flying: true,
      size: 15,
      angle
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
          if (ball.state === 'splashing' || ball.state === 'completed') {
            return { 
              ...ball, 
              timeLeft: (ball.timeLeft || 0) - 1,
              state: 'splashing' as const
            };
          }

          // Move the ball toward target
          const dx = ball.targetX - ball.x;
          const dy = ball.targetY - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if it hits opponent
          const distToOpponent = Math.sqrt(
            Math.pow(ball.x - opponentPosition.x, 2) + 
            Math.pow(ball.y - opponentPosition.y, 2)
          );
          
          if (distToOpponent < 30) { // Hit radius
            if (onHit) onHit('opponent');
            return { 
              ...ball, 
              state: 'splashing' as const, 
              timeLeft: 10,
              isFlying: false,
              flying: false 
            };
          }
          
          // Ball reached target or close enough
          if (distance < ball.speed) {
            return { 
              ...ball, 
              state: 'splashing' as const, 
              timeLeft: 10,
              isFlying: false,
              flying: false 
            };
          }
          
          // Move the ball
          const ratio = ball.speed / distance;
          const moveX = dx * ratio;
          const moveY = dy * ratio;
          
          return { 
            ...ball, 
            x: ball.x + moveX, 
            y: ball.y + moveY,
            position: {
              x: ball.x + moveX,
              y: ball.y + moveY
            }
          };
        })
        .filter(ball => (ball.timeLeft || 0) > 0)
    );
    
    // Update opponent mudballs
    setOpponentMudballs(prev => 
      prev
        .map(ball => {
          if (ball.state === 'splashing' || ball.state === 'completed') {
            return { 
              ...ball, 
              timeLeft: (ball.timeLeft || 0) - 1,
              state: 'splashing' as const
            };
          }

          // Move the ball toward target
          const dx = ball.targetX - ball.x;
          const dy = ball.targetY - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if it hits player
          const distToPlayer = Math.sqrt(
            Math.pow(ball.x - playerPosition.x, 2) + 
            Math.pow(ball.y - playerPosition.y, 2)
          );
          
          if (distToPlayer < 30) { // Hit radius
            if (onHit) onHit('player');
            return { 
              ...ball, 
              state: 'splashing' as const, 
              timeLeft: 10,
              isFlying: false,
              flying: false 
            };
          }
          
          // Ball reached target or close enough
          if (distance < ball.speed) {
            return { 
              ...ball, 
              state: 'splashing' as const, 
              timeLeft: 10,
              isFlying: false, 
              flying: false 
            };
          }
          
          // Move the ball
          const ratio = ball.speed / distance;
          const moveX = dx * ratio;
          const moveY = dy * ratio;
          
          return { 
            ...ball, 
            x: ball.x + moveX, 
            y: ball.y + moveY,
            position: {
              x: ball.x + moveX,
              y: ball.y + moveY
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

  // For compatibility with the useMudFlingGame hook
  const mudBalls: MudballData[] = [...playerMudballs, ...opponentMudballs];
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

export default useMudBalls;
