
import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import DialogueBox from '../DialogueBox';
import ChoiceMenu from '../ChoiceMenu';
import BackgroundScene from '../BackgroundScene';
import CharacterPortrait from '../CharacterPortrait';
import DialogHistory from '../DialogHistory';
import { Loader2 } from 'lucide-react';
import ExpandableMenu from '../ExpandableMenu';
import { allScenes } from '@/data/scenes';
import { toast } from 'sonner';

const StandardGameView: React.FC = () => {
  // Access game context with our new handlers
  const { 
    gameState, 
    handleDialogueClick, 
    handleChoiceClick, 
    handleSceneTransition, 
    handleNewGame, 
    handleAbout, 
    replayCurrentScene 
  } = useGame();
  
  const [showHistory, setShowHistory] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeView, setActiveView] = useState<'game' | 'tester'>('game');
  const viewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

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
      <div className="flex items-center justify-center h-screen w-full bg-black">
        <div className="text-center text-white">
          <Loader2 className="h-16 w-16 mx-auto animate-spin text-[#9b87f5] mb-4" />
          <p>{error || `Scene not found or loading: ${sceneId}`}</p>
          <button 
            onClick={() => handleSceneTransition('start')} 
            className="mt-4 px-4 py-2 bg-[#9b87f5] rounded-md hover:bg-[#8B5CF6] transition-colors"
          >
            Return to Main Menu
          </button>
        </div>
      </div>
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
  // Get the character ID from current dialogue
  const characterId = currentDialogue?.character;

  return (
    <div ref={viewRef} className="relative h-screen w-full overflow-hidden">
      {/* Background - clickable to advance dialogue */}
      <div onClick={handleBackgroundClick} className="h-full w-full">
        <BackgroundScene backgroundId={scene.background} />
      </div>
      
      {/* Character Portrait */}
      {currentDialogue && characterId && characterId !== 'narrator' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="character-portrait-container">
            <CharacterPortrait 
              characterId={characterId}
              mood={characterMood}
              animate={true}
            />
          </div>
        </div>
      )}
      
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
      
      {/* Dialog Box or Choice Menu */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {showChoices && displayedChoices.length > 0 ? (
          <ChoiceMenu 
            choices={displayedChoices} 
            onChoiceSelected={handleChoiceClick}
            isActive={true}
          />
        ) : (
          <DialogueBox
            dialogueLine={currentDialogue}
            onAdvance={handleDialogueClick}
            isActive={loaded && Boolean(currentDialogue)}
          />
        )}
      </div>
    </div>
  );
};

export default StandardGameView;
