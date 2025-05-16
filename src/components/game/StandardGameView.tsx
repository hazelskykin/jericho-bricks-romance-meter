
import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Loader2 } from 'lucide-react';
import GameBackgroundScene from './GameBackgroundScene';
import GameDialogueSystem from './GameDialogueSystem';
import GameLoadingState from './GameLoadingState';
import AffectionMeterSection from './AffectionMeterSection';
import DialogHistorySection from './DialogHistorySection';
import GameViewHeader from './GameViewHeader';
import { useGameScene } from './useGameScene';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';

const StandardGameView: React.FC = () => {
  // Access game context with handlers
  const { 
    handleDialogueClick, 
    handleChoiceClick, 
    replayCurrentScene,
    isTransitioning
  } = useGame();
  
  const [showHistory, setShowHistory] = useState(false);
  const [showAffection, setShowAffection] = useState(false);
  const [activeView, setActiveView] = useState<'game' | 'tester'>('game');
  const [renderTrigger, setRenderTrigger] = useState(0);
  const viewRef = useRef<HTMLDivElement>(null);
  
  // Use the scene loading hook to handle scene data and errors
  const {
    scene,
    sceneId,
    error,
    loaded,
    currentDialogue,
    dialogHistory,
    displayedChoices,
    showChoices,
    activeCharacter
  } = useGameScene();

  // Force re-render if stuck - increased timeout to ensure images have time to load
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Force re-render triggered to ensure proper display');
      setRenderTrigger(prev => prev + 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [sceneId]);
  
  // Debug the view rendering
  useEffect(() => {
    console.log(`StandardGameView rendering: scene: ${sceneId}, loaded: ${loaded}, background: ${scene?.background}`);
  }, [sceneId, loaded, scene?.background]);
  
  // Handle game view toggles 
  const handleGameClick = () => {
    setActiveView('game');
  };

  const handleTesterClick = () => {
    setActiveView('tester');
  };
  
  // Toggle affection meter visibility
  const toggleAffectionMeter = () => {
    setShowAffection(!showAffection);
  };
  
  // Click handler for the background - advance dialogue
  const handleBackgroundClick = () => {
    if (!showChoices && loaded && scene && !isTransitioning) {
      handleDialogueClick();
    }
  };
  
  // Loading state or scene not found
  if (error || !scene) {
    toast.error(`Failed to load scene: ${error || 'Unknown error'}`);
    return (
      <GameLoadingState 
        error={error} 
        sceneId={sceneId} 
        onReturnToMenu={() => handleDialogueClick()} 
      />
    );
  }
  
  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-900">
        <Loader2 className="h-16 w-16 animate-spin text-[#9b87f5]" />
      </div>
    );
  }

  // Get the character's mood from current dialogue
  const characterMood = currentDialogue?.mood || 'neutral';
  
  // Get the character ID from current dialogue, ensuring it's a valid CharacterId
  const characterId = currentDialogue?.character as CharacterId | undefined;
  
  return (
    <div 
      ref={viewRef} 
      className="relative h-screen w-full overflow-hidden bg-gray-900" 
      key={`view-${sceneId}-${renderTrigger}`}
    >
      {/* Background - clickable to advance dialogue */}
      {scene.background && (
        <GameBackgroundScene 
          backgroundId={scene.background} 
          onBackgroundClick={handleBackgroundClick} 
        />
      )}
      
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
      />
      
      {/* Sound Toggle */}
      <GameViewHeader />
      
      {/* Dialog Box or Choice Menu */}
      <GameDialogueSystem
        showChoices={showChoices}
        displayedChoices={displayedChoices}
        currentDialogue={currentDialogue}
        loaded={loaded}
        onDialogueClick={handleDialogueClick}
        onChoiceClick={handleChoiceClick}
        characterId={characterId}
        characterMood={characterMood}
      />
    </div>
  );
};

export default StandardGameView;
