
import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import DialogueBox from '../DialogueBox';
import ChoiceMenu from '../ChoiceMenu';
import BackgroundScene from '../BackgroundScene';
import CharacterPortrait from '../CharacterPortrait';
import DialogHistory from '../DialogHistory';
import { Loader2 } from 'lucide-react';
import ExpandableMenu from '../ExpandableMenu';

const StandardGameView: React.FC = () => {
  const { gameState, handleDialogueClick, handleChoiceClick, handleSceneTransition, handleNewGame, handleAbout, replayCurrentScene } = useGame();
  const [showHistory, setShowHistory] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeView, setActiveView] = useState<'game' | 'tester'>('game');
  const viewRef = useRef<HTMLDivElement>(null);

  const { currentScene: sceneId, currentDialogueIndex, displayedChoices, dialogHistory, scenes } = gameState;

  // Get the current scene and dialogue
  const scene = scenes[sceneId];
  const currentDialogue = scene?.dialogue[currentDialogueIndex];
  
  // Simplified loading mechanism
  useEffect(() => {
    // Short timeout to allow for transition effects
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [scene]);

  const handleGameClick = () => {
    setActiveView('game');
  };

  const handleTesterClick = () => {
    setActiveView('tester');
  };
  
  // Loading state
  if (!scene || !loaded) {
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
      {/* Background */}
      <BackgroundScene backgroundId={scene.background} />
      
      {/* Character Portrait */}
      {currentDialogue && characterId && characterId !== 'narrator' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="character-portrait-container">
            <CharacterPortrait 
              characterId={characterId}
              mood={characterMood}
              isActive={true}
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
        {displayedChoices.length > 0 ? (
          <ChoiceMenu 
            choices={displayedChoices} 
            onChoiceSelected={handleChoiceClick}
            isActive={true}
          />
        ) : (
          <DialogueBox
            dialogueLine={currentDialogue}
            onAdvance={handleDialogueClick}
          />
        )}
      </div>
    </div>
  );
};

export default StandardGameView;
