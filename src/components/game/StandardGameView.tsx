
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
import { assetManager } from '@/utils/assetManager';

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
    activeCharacter,
    backgroundReady
  } = useGameScene();

  // Mark scene as loaded after initial render
  useEffect(() => {
    // Reset state for new scene
    setIsFullyLoaded(false);
    setLoadingTimeout(false);
    
    // Shorter initial loading delay
    const timer = setTimeout(() => {
      setIsFullyLoaded(true);
    }, 800);
    
    // Set a longer timeout as a fallback
    const longTimer = setTimeout(() => {
      console.log("Loading timeout reached, forcing scene to display");
      setLoadingTimeout(true);
      setIsFullyLoaded(true);
      
      // Force all assets to be loaded
      if (scene?.background) {
        assetManager.forceAssetSuccess(`/assets/backgrounds/${scene.background}.jpg`);
        console.log(`Forced asset success for background: ${scene.background}`);
      }
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(longTimer);
    };
  }, [sceneId, scene]);
  
  // Click handler for the background - advance dialogue
  const handleBackgroundClick = () => {
    if (!showChoices && loaded && scene && !isTransitioning) {
      handleDialogueClick();
    }
  };
  
  // Handle retrying if background fails
  const handleRetryBackground = () => {
    // Reset loading states
    setLoadingTimeout(false);
    setIsFullyLoaded(false);
    
    // Force a quick timeout to show loading again
    setTimeout(() => {
      setIsFullyLoaded(true);
    }, 2000);
  };
  
  // Loading state or scene not found
  if (error || !scene) {
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
  
  // Get the character ID from current dialogue
  const characterId = currentDialogue?.character as CharacterId | undefined;
  
  return (
    <div 
      ref={viewRef} 
      className="relative h-screen w-full overflow-hidden bg-gray-900"
      data-testid="standard-game-view"
    >
      {/* Background layer - must have lower z-index */}
      <div className="absolute inset-0 z-0 bg-gray-900" style={{ visibility: 'visible', display: 'block' }}>
        {scene.background && (
          <GameBackgroundScene 
            backgroundId={scene.background} 
            onBackgroundClick={handleBackgroundClick} 
          />
        )}
      </div>
      
      {/* Dialog History Section */}
      <DialogHistorySection 
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        dialogHistory={dialogHistory}
        activeView={activeView}
        handleGameClick={() => setActiveView('game')}
        handleTesterClick={() => setActiveView('tester')}
        replayCurrentScene={replayCurrentScene}
      />
      
      {/* Affection Meter Section */}
      <AffectionMeterSection 
        showAffection={showAffection}
        toggleAffectionMeter={() => setShowAffection(!showAffection)}
      />
      
      {/* Sound Toggle */}
      <GameViewHeader />
      
      {/* Dialog Box or Choice Menu - must have higher z-index */}
      <div className="absolute inset-x-0 bottom-0 z-50">
        <GameDialogueSystem
          showChoices={showChoices}
          displayedChoices={displayedChoices}
          currentDialogue={currentDialogue}
          loaded={loaded && isFullyLoaded}
          onDialogueClick={handleDialogueClick}
          onChoiceClick={handleChoiceClick}
          characterId={characterId}
          characterMood={characterMood}
        />
      </div>
      
      {/* Loading overlay - disappears after initial loading */}
      {!isFullyLoaded && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-[#9b87f5]" />
            <p className="text-white text-xl">Loading scene assets...</p>
            <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
          </div>
        </div>
      )}
      
      {/* Long timeout message with retry button */}
      {loadingTimeout && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-900 bg-opacity-90 p-4 rounded-lg z-50 shadow-lg">
          <p className="text-white mb-2">Loading is taking longer than expected.</p>
          <button 
            onClick={handleRetryBackground}
            className="bg-red-700 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default StandardGameView;
