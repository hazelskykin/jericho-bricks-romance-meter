
import React from 'react';
import DialogueBox from '../DialogueBox';
import ChoiceMenu from '../ChoiceMenu';
import { DialogueChoice, DialogueLine } from '@/types/game';

interface GameDialogueSystemProps {
  showChoices: boolean;
  displayedChoices: DialogueChoice[];
  currentDialogue: DialogueLine | undefined;
  loaded: boolean;
  onDialogueClick: () => void;
  onChoiceClick: (index: number) => void;
}

const GameDialogueSystem: React.FC<GameDialogueSystemProps> = ({
  showChoices,
  displayedChoices,
  currentDialogue,
  loaded,
  onDialogueClick,
  onChoiceClick
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
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
  );
};

export default GameDialogueSystem;
