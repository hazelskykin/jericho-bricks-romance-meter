
import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Loader2 } from 'lucide-react';
import { allScenes } from '@/data/scenes';
import { toast } from 'sonner';
import { CharacterId } from '@/types/game';
import GameBackgroundScene from './GameBackgroundScene';
import GameDialogueSystem from './GameDialogueSystem';
import GameLoadingState from './GameLoadingState';
import AffectionMeterSection from './AffectionMeterSection';
import DialogHistorySection from './DialogHistorySection';
import SoundToggle from '../minigames/common/SoundToggle';

const StandardGameView: React.FC = () => {
  // Access game context with handlers
  const { 
    gameState, 
    handleDialogueClick, 
    handleChoiceClick, 
    handleSceneTransition, 
    replayCurrentScene 
  } = useGame();
  
  const [showHistory, setShowHistory] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeView, setActiveView] = useState<'game' | 'tester'>('game');
  const viewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);
  const [showAffection, setShowAffection] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<CharacterId | null>(null);

  const { currentScene: sceneId, dialogueIndex, showChoices } = gameState;
  
  // Safely get current scene from available scenes with error handling
  const scene = React.useMemo(() => {
    try {
      if (!sceneId) {
        setError('Invalid scene ID: undefined or null');
        return null;
      }
      
      const sceneData = allScenes[sceneId];
      
      if (!sceneData) {
        console.error(`Scene not found: ${sceneId}`);
        setError(`Scene "${sceneId}" not found`);
        
        // Only trigger the fallback once
        if (!fallbackTriggered) {
          setFallbackTriggered(true);
          
          // Try to fallback to intro scene after a delay
          setTimeout(() => {
            handleSceneTransition('intro');
          }, 1000);
        }
        
        return null;
      }
      
      setError(null);
      return sceneData;
    } catch (err) {
      console.error('Error getting scene:', err);
      setError(`Error loading scene: ${err}`);
      return null;
    }
  }, [sceneId, fallbackTriggered, handleSceneTransition]);
  
  // Get current dialogue line
  const currentDialogue = scene?.dialogue?.[dialogueIndex];
  
  // Build dialogue history up to current point
  const dialogHistory = scene?.dialogue?.slice(0, dialogueIndex + 1) || [];
  
  // Get choices if we're showing them
  const displayedChoices = showChoices && scene?.choices ? scene.choices : [];
  
  // Update active character when dialogue changes
  useEffect(() => {
    if (currentDialogue?.character && currentDialogue.character !== 'narrator') {
      setActiveCharacter(currentDialogue.character as CharacterId);
    }
  }, [currentDialogue]);

  // Toggle affection meter visibility
  const toggleAffectionMeter = () => {
    setShowAffection(!showAffection);
  };
  
  // Debug logging
  useEffect(() => {
    console.log(`StandardGameView: Current scene: ${sceneId}, dialogue index: ${dialogueIndex}, showing choices: ${showChoices}`);
    
    if (!scene) {
      console.error(`Scene not found: ${sceneId}`);
      toast.error(`Scene "${sceneId}" not found. Please report this error.`);
    } else if (!currentDialogue && dialogueIndex < (scene.dialogue?.length || 0)) {
      console.error(`Dialogue line not found at index ${dialogueIndex} in scene ${sceneId}`);
    }
  }, [sceneId, dialogueIndex, showChoices, scene, currentDialogue]);
  
  // Simplified loading mechanism
  useEffect(() => {
    if (scene) {
      // Short timeout to allow for transition effects
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [scene]);

  const handleGameClick = () => {
    setActiveView('game');
  };

  const handleTesterClick = () => {
    setActiveView('tester');
  };
  
  // Click handler for the background - advance dialogue
  const handleBackgroundClick = () => {
    if (!showChoices && loaded && scene) {
      handleDialogueClick();
    }
  };
  
  // Loading state or scene not found
  if (error || !scene) {
    return (
      <GameLoadingState 
        error={error} 
        sceneId={sceneId} 
        onReturnToMenu={() => handleSceneTransition('start')} 
      />
    );
  }
  
  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-black">
        <Loader2 className="h-16 w-16 animate-spin text-[#9b87f5]" />
      </div>
    );
  }

  // Get the character's mood from current dialogue
  const characterMood = currentDialogue?.mood || 'neutral';
  
  // Get the character ID from current dialogue, ensuring it's a valid CharacterId
  const characterId = currentDialogue?.character;
  
  return (
    <div ref={viewRef} className="relative h-screen w-full overflow-hidden">
      {/* Background - clickable to advance dialogue */}
      <GameBackgroundScene 
        backgroundId={scene.background} 
        onBackgroundClick={handleBackgroundClick} 
      />
      
      {/* Dialog History Section */}
      <DialogHistorySection 
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        dialogHistory={dialogHistory}
        activeView={activeView}
        handleGameClick={handleGameClick}
        handleTesterClick={handleTesterClick}
        replayCurrentScene={replayCurrentScene}
      />
      
      {/* Affection Meter Section */}
      <AffectionMeterSection 
        showAffection={showAffection}
        toggleAffectionMeter={toggleAffectionMeter}
        characters={gameState.characters}
      />
      
      {/* Sound Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <SoundToggle />
      </div>
      
      {/* Dialog Box or Choice Menu */}
      <GameDialogueSystem
        showChoices={showChoices}
        displayedChoices={displayedChoices}
        currentDialogue={currentDialogue}
        loaded={loaded}
        onDialogueClick={handleDialogueClick}
        onChoiceClick={handleChoiceClick}
        characterId={characterId as CharacterId | undefined}
        characterMood={characterMood}
      />
    </div>
  );
};

export default StandardGameView;
