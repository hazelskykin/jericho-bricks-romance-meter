
import React from 'react';
import GameDevMenu from './GameDevMenu';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useGame } from '@/context/GameContext';

interface DevJumpTargetsProps {
  onJumpToScene: (sceneId: string) => void;
}

const DevJumpTargets: React.FC<DevJumpTargetsProps> = ({ onJumpToScene }) => {
  const { gameState, setGameState } = useGame();
  
  // Enhanced dev menu jump targets with season transitions
  const devJumpTargets = [
    // Season start points
    { id: 'prologue-intro', label: 'Prologue Intro', season: 'prologue' },
    { id: 'spring-intro', label: 'Spring Intro', season: 'spring' },
    { id: 'summer-intro', label: 'Summer Intro', season: 'summer' },
    { id: 'autumn-intro', label: 'Autumn Intro', season: 'autumn' },
    { id: 'winter-intro', label: 'Winter Intro', season: 'winter' },
    { id: 'epilogue-route', label: 'Epilogue', season: 'epilogue' },
    
    // Key character selection points
    { id: 'spring-character-selection', label: 'Spring Character Select', season: 'spring' },
    { id: 'summer-character-selection', label: 'Summer Character Select', season: 'summer' },
    { id: 'autumn-character-path', label: 'Autumn Romance Path', season: 'autumn' },
    { id: 'winter-planning-character', label: 'Winter Romance Path', season: 'winter' },
    
    // Festival points
    { id: 'spring-festival-planning', label: 'Spring Festival Planning', season: 'spring' },
    { id: 'spring-festival-activities', label: 'Spring Festival Activities', season: 'spring' },
    { id: 'summer-planning', label: 'Summer Festival Planning', season: 'summer' },
    { id: 'summer-festival-activities', label: 'Summer Festival Activities', season: 'summer' },
    { id: 'autumn-festival-introduction', label: 'Autumn Festival', season: 'autumn' },
    { id: 'winter-planning', label: 'Winter Festival Planning', season: 'winter' },
    { id: 'winter-festival-intro', label: 'Winter Festival', season: 'winter' },
    { id: 'winter-festival-activities', label: 'Winter Festival Activities', season: 'winter' }
  ];

  // Enhanced jump function that also updates the season
  const handleJumpWithSeason = (sceneId: string, season: string) => {
    console.log(`Dev Jump: Transitioning to scene ${sceneId} with season ${season}`);
    
    // First update the season in the game state
    setGameState(prev => ({
      ...prev,
      currentSeason: season as any // TypeScript might need a cast here
    }));
    
    // Then jump to the scene
    onJumpToScene(sceneId);
    
    // Show a toast or some indication that the jump was successful
    console.log(`Dev Jump completed to: ${sceneId}`);
  };

  return (
    <GameDevMenu 
      jumpTargets={devJumpTargets} 
      onJumpToScene={(sceneId) => {
        // Find the season for this scene
        const target = devJumpTargets.find(target => target.id === sceneId);
        if (target && target.season) {
          handleJumpWithSeason(sceneId, target.season);
        } else {
          // Fallback to just scene transition if no season is defined
          onJumpToScene(sceneId);
        }
      }} 
    />
  );
};

export default DevJumpTargets;
