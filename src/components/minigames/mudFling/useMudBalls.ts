
import { useState } from 'react';
import { MudCharacterPosition } from './types';

export interface MudBall {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  state: 'flying' | 'splashed';
  owner: 'player' | 'opponent';
  timeLeft: number;
  angle: number;
}

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
            return { ...ball, timeLeft: ball.timeLeft - 1 };
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
            return { ...ball, state: 'splashed', timeLeft: 10 };
          }
          
          // Ball reached target or close enough
          if (distance < ball.speed) {
            return { ...ball, state: 'splashed', timeLeft: 10 };
          }
          
          // Move the ball
          const ratio = ball.speed / distance;
          const moveX = dx * ratio;
          const moveY = dy * ratio;
          
          return { ...ball, x: ball.x + moveX, y: ball.y + moveY };
        })
        .filter(ball => ball.timeLeft > 0)
    );
    
    // Update opponent mudballs
    setOpponentMudballs(prev => 
      prev
        .map(ball => {
          if (ball.state === 'splashed') {
            return { ...ball, timeLeft: ball.timeLeft - 1 };
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
            return { ...ball, state: 'splashed', timeLeft: 10 };
          }
          
          // Ball reached target or close enough
          if (distance < ball.speed) {
            return { ...ball, state: 'splashed', timeLeft: 10 };
          }
          
          // Move the ball
          const ratio = ball.speed / distance;
          const moveX = dx * ratio;
          const moveY = dy * ratio;
          
          return { ...ball, x: ball.x + moveX, y: ball.y + moveY };
        })
        .filter(ball => ball.timeLeft > 0)
    );
  };

  const resetMudballs = () => {
    setPlayerMudballs([]);
    setOpponentMudballs([]);
  };

  return {
    playerMudballs,
    opponentMudballs,
    throwMudball,
    updateMudballs,
    resetMudballs
  };
};
