
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MinigameContainer from '../MinigameContainer';
import MudFlingArena from './MudFlingArena';
import MudFlingControls from './MudFlingControls';
import MudFlingFountain from './MudFlingFountain';
import { useMudFlingGame } from '@/hooks/useMudFlingGame';
import { Character, MudBall } from '@/hooks/useMudFlingGame';
import { soundManager } from '@/utils/soundEffects';

interface MudFlingGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MudFlingGame: React.FC<MudFlingGameProps> = ({ onComplete, onExit }) => {
  const {
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
  } = useMudFlingGame(onComplete, onExit);

  // Initialize the game when component mounts
  useEffect(() => {
    // Initialize game characters (could be based on player's relationship with characters)
    initializeCharacters();
    
    // Play background music
    soundManager.playMusic('game-background', 0.3, true);
    
    return () => {
      // Cleanup on unmount
      soundManager.stopMusic('game-background');
    };
  }, [initializeCharacters]);

  // Convert Character objects to CharacterPosition objects for MudFlingArena
  const characterPositions = characters.map(char => ({
    id: char.id,
    x: char.position.x,
    y: char.position.y,
    width: 60,
    height: 90,
    isMuddy: char.isHit
  }));

  // Configure player character for MudFlingArena
  const playerCharacter = {
    id: 'maven',
    x: characters.find(c => c.id === 'maven')?.position.x || 250,
    y: characters.find(c => c.id === 'maven')?.position.y || 300,
    width: 60,
    height: 90,
    speed: 0,
    energy: 100,
    isMuddy: characters.find(c => c.id === 'maven')?.isHit || false,
    isAtFountain: false
  };

  // Handle key presses for game controls
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Space to throw selected mud ball
    if (event.key === ' ' && selectedMudBall) {
      const mavenChar = characters.find(c => c.id === 'maven');
      if (mavenChar) {
        const target = {
          x: mavenChar.position.x + 100, // Throw in front of maven
          y: mavenChar.position.y - 100  // Throw upward
        };
        handleGameAreaClick(target.x, target.y);
      }
    }
  };

  return (
    <MinigameContainer
      title="Mud Fling Challenge"
      instructions="Click mud balls to select them, then click on the game area to throw! Hit your opponents while avoiding their throws."
      onComplete={() => onComplete(team1Score > team2Score)}
      onExit={handleExit}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <MudFlingControls 
            timeRemaining={timeRemaining}
            team1Score={team1Score}
            team2Score={team2Score}
            selectedBall={selectedMudBall}
          />
        </div>
        
        <div className="flex-grow relative overflow-hidden">
          <MudFlingArena 
            onAreaClick={handleGameAreaClick} 
            onKeyDown={handleKeyDown} 
            characters={characterPositions}
            mudBalls={mudBalls}
            playerCharacter={playerCharacter}
          />
          
          <MudFlingFountain 
            fountainIntensity={fountainIntensity} 
          />
        </div>
      </div>
    </MinigameContainer>
  );
};

export default MudFlingGame;
