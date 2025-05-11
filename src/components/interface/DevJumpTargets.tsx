
import React from 'react';
import GameDevMenu from './GameDevMenu';

interface DevJumpTargetsProps {
  onJumpToScene: (sceneId: string) => void;
}

const DevJumpTargets: React.FC<DevJumpTargetsProps> = ({ onJumpToScene }) => {
  // Dev menu jump targets
  const devJumpTargets = [
    { id: 'spring-intro', label: 'Spring Intro' },
    { id: 'spring-character-selection', label: 'Spring Character Select' },
    { id: 'spring-festival-planning', label: 'Spring Festival Planning' },
    { id: 'summer-intro', label: 'Summer Intro' },
    { id: 'summer-character-selection', label: 'Summer Character Select' },
    { id: 'summer-planning', label: 'Summer Festival Planning' },
    { id: 'autumn-intro', label: 'Autumn Intro' },
    { id: 'autumn-character-path', label: 'Autumn Romance Path' },
    { id: 'autumn-festival-introduction', label: 'Autumn Festival' },
    { id: 'winter-intro', label: 'Winter Intro' },
    { id: 'winter-planning', label: 'Winter Festival Planning' },
    { id: 'winter-planning-character', label: 'Winter Romance Path' },
    { id: 'winter-festival-intro', label: 'Winter Festival' },
    { id: 'epilogue-route', label: 'Epilogue' }
  ];

  return <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={onJumpToScene} />;
};

export default DevJumpTargets;
