
import React from 'react';
import DialogueBox from '../DialogueBox';
import ChoiceMenu from '../ChoiceMenu';
import { DialogueChoice, DialogueLine, CharacterId } from '@/types/game';
import { MoodType } from '@/types/expressions';
import CharacterPortrait from '../CharacterPortrait';

interface GameDialogueSystemProps {
  showChoices: boolean;
  displayedChoices: DialogueChoice[];
  currentDialogue: DialogueLine | undefined;
  loaded: boolean;
  onDialogueClick: () => void;
  onChoiceClick: (index: number) => void;
  characterId?: CharacterId;
  characterMood: MoodType;
}

const GameDialogueSystem: React.FC<GameDialogueSystemProps> = ({
  showChoices,
  displayedChoices,
  currentDialogue,
  loaded,
  onDialogueClick,
  onChoiceClick,
  characterId,
  characterMood
}) => {
  // Only render speaker portrait for non-narrator characters when NOT showing choices
  const shouldShowPortrait = characterId && 
                             characterId !== 'narrator' as unknown as CharacterId && 
                             !showChoices;
  
  return (
    <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-3xl relative">
        {/* Speaker portrait that overlaps the dialog box - only show when not displaying choices */}
        {shouldShowPortrait && (
          <div className="absolute -left-5 -top-16 z-40">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800/80 border-2 border-accent shadow-lg">
              <CharacterPortrait 
                characterId={characterId!} 
                mood={characterMood}
                className="w-full h-full object-cover"
                isInDialog={true}
              />
            </div>
          </div>
        )}
        
        {showChoices && displayedChoices.length > 0 ? (
          <ChoiceMenu 
            choices={displayedChoices} 
            onChoiceSelected={onChoiceClick}
            isActive={true}
          />
        ) : (
          <DialogueBox
            dialogueLine={currentDialogue}
            onAdvance={onDialogueClick}
            isActive={loaded && Boolean(currentDialogue)}
          />
        )}
      </div>
    </div>
  );
};

export default GameDialogueSystem;
