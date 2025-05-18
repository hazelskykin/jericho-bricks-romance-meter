
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
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
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

  // Force re-render if stuck, and a direct DOM update for a final fallback
  useEffect(() => {
    // Initial quick render to get things going
    const initialTimer = setTimeout(() => {
      console.log('Force re-render triggered to ensure proper display');
      setRenderTrigger(prev => prev + 1);
      
      // Try to directly force the background to be visible
      const bgElement = document.querySelector('.game-background img');
      if (bgElement instanceof HTMLElement) {
        bgElement.style.opacity = '1';
        bgElement.style.visibility = 'visible';
        bgElement.style.display = 'block';
        bgElement.style.zIndex = '50'; // Higher z-index
      }
      
      setIsFullyLoaded(true);
    }, 1000);
    
    // Set a long timeout as a last resort for loading very slow assets
    const longTimer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(longTimer);
    };
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
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-[#9b87f5] mx-auto mb-4" />
          <p className="text-white text-xl">Loading game scene...</p>
        </div>
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
        <div className="game-background absolute inset-0 z-30">
          <GameBackgroundScene 
            backgroundId={scene.background} 
            onBackgroundClick={handleBackgroundClick} 
          />
        </div>
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
      <div className="absolute inset-x-0 bottom-0 z-40">
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
      
      {/* Loading overlay - disappears after initial loading */}
      {!isFullyLoaded && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-[#9b87f5]" />
            <p className="text-white text-xl">Loading scene assets...</p>
            <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
          </div>
        </div>
      )}
      
      {/* Long timeout message */}
      {loadingTimeout && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-900 bg-opacity-90 p-4 rounded-lg z-50 shadow-lg">
          <p className="text-white">Loading is taking longer than expected. Please refresh if the scene doesn't appear.</p>
        </div>
      )}
    </div>
  );
};

export default StandardGameView;
