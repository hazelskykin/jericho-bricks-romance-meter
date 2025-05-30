
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MinigameContainer from '../common/MinigameContainer';
import CrafterWorkshop from './CrafterWorkshop';
import useCrafterGame from '@/hooks/useCrafterGame';
import { Character } from '@/types/game';
import { useCrafterAudio } from './useCrafterAudio';

interface CrafterGameProps {
  onComplete: (success: boolean) => void;
  onExit?: () => void;
}

const CrafterGame: React.FC<CrafterGameProps> = ({ onComplete, onExit }) => {
  const {
    gameState,
    selectedBaseMaterial,
    placedAccents,
    gameStage,
    selectBaseMaterial,
    selectAccent,
    placeAccent,
    finishCraft,
    completeGame,
    characterInitials,
  } = useCrafterGame({ onComplete });
  
  const { initializeAudio, playSound, stopAllSounds } = useCrafterAudio();
  
  // Initialize audio when component mounts
  useEffect(() => {
    initializeAudio();
    
    // Clean up sounds when unmounting
    return () => {
      stopAllSounds();
    };
  }, [initializeAudio, stopAllSounds]);
  
  const handleBaseMaterialSelect = (materialType: 'fabric' | 'metal' | 'wood') => {
    selectBaseMaterial(materialType);
    playSound('hit-block');
    toast.info(`Selected ${materialType} as base material`);
  };
  
  const handleAccentSelect = (accentType: string) => {
    selectAccent(accentType);
    toast.info(`Selected ${accentType} accent`);
  };
  
  const handleAccentPlacement = (x: number, y: number) => {
    placeAccent(x, y);
    playSound('decor-add');
  };
  
  const handleFinishCraft = () => {
    finishCraft();
    playSound('finish-initials');
    toast.success("Adding finishing touches to your craft!");
  };
  
  const handleCompleteCraft = () => {
    // Stop all sounds before completing the game
    stopAllSounds();
    
    // Add a short delay before calling completeGame to prevent audio overlap
    setTimeout(() => {
      completeGame();
      playSound('complete-fanfare');
      toast.success("Craft completed successfully!");
    }, 100);
  };
  
  const handleExitWorkshop = () => {
    stopAllSounds(); // Make sure to stop all sounds before exiting
    if (onExit) {
      onExit();
    }
  };

  // When completing the game, ensure music stops
  const wrappedOnComplete = (success: boolean) => {
    stopAllSounds(); // Stop all sounds
    
    // Add a short delay before calling the original callback
    setTimeout(() => {
      onComplete(success);
    }, 200);
  };

  // Make sure to stop sounds if component is unmounted
  useEffect(() => {
    return () => {
      stopAllSounds();
    };
  }, [stopAllSounds]);
  
  return (
    <MinigameContainer
      title="Autumn Crafting Workshop"
      instructions="Create a unique craft by selecting a base material and adding decorative accents. When you're done, add a personal touch with your initials!"
      onComplete={wrappedOnComplete}
      onExit={handleExitWorkshop}
    >
      <CrafterWorkshop
        gameStage={gameStage}
        selectedBaseMaterial={selectedBaseMaterial}
        placedAccents={placedAccents}
        onBaseMaterialSelect={handleBaseMaterialSelect}
        onAccentSelect={handleAccentSelect}
        onAccentPlace={handleAccentPlacement}
        onFinishCraft={handleFinishCraft}
        onCompleteCraft={handleCompleteCraft}
        onExitWorkshop={handleExitWorkshop}
        characterInitials={characterInitials}
      />
    </MinigameContainer>
  );
};

export default CrafterGame;
