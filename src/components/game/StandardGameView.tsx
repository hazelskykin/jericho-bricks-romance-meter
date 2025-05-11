
import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Loader2 } from 'lucide-react';
import { allScenes } from '@/data/scenes';
import { toast } from 'sonner';
import ExpandableMenu from '../ExpandableMenu';
import DialogHistory from '../DialogHistory';
import GameBackgroundScene from './GameBackgroundScene';
import GameDialogueSystem from './GameDialogueSystem';
import GameLoadingState from './GameLoadingState';
import { CharacterId } from '@/types/game';
import CharacterPortraitDisplay from './CharacterPortraitDisplay';
import AffectionMeter from '@/components/AffectionMeter';

const StandardGameView: React.FC = () => {
  // Access game context with our new handlers
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
  
  // Determine if we should show the full character portrait - only for character IDs that aren't narrator
  const shouldShowFullPortrait = characterId && characterId !== 'narrator';

  return (
    <div ref={viewRef} className="relative h-screen w-full overflow-hidden">
      {/* Background - clickable to advance dialogue */}
      <GameBackgroundScene 
        backgroundId={scene.background} 
        onBackgroundClick={handleBackgroundClick} 
      />
      
      {/* Character portrait - we keep this component but it now returns null */}
      <CharacterPortraitDisplay
        characterId={characterId as CharacterId | undefined}
        characterMood={characterMood}
        shouldShow={shouldShowFullPortrait}
      />
      
      {/* Dialog History Button */}
      <ExpandableMenu 
        onGameClick={handleGameClick}
        onTesterClick={handleTesterClick}
        activeView={activeView}
      />
      
      {/* Dialog History Overlay */}
      {showHistory && (
        <DialogHistory
          dialogHistory={dialogHistory}
          onClose={() => setShowHistory(false)}
          onOpenChange={() => setShowHistory(false)}
          open={showHistory}
          onReplayScene={replayCurrentScene}
        />
      )}
      
      {/* Affection meter */}
      <div className="absolute top-4 right-4 z-30">
        <button 
          onClick={toggleAffectionMeter} 
          className="bg-[#9b87f5] hover:bg-[#8B5CF6] p-2 rounded-full mb-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
        
        {Object.entries(gameState.characters)
          .filter(([id]) => id !== 'maven')
          .map(([id, character]) => (
            <div key={id} className="mb-2">
              <AffectionMeter 
                character={character} 
                isOpen={showAffection}
              />
            </div>
          ))}
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
