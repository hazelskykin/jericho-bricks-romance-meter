
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
  // Only render character portrait for non-narrator characters
  const shouldShowPortrait = characterId && characterId !== 'narrator' as unknown as CharacterId;
  
  return (
    <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
      <div className="max-w-xl w-full px-4">
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
