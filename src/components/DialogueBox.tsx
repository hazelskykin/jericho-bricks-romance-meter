
import React, { useState, useEffect, useRef } from 'react';
import { DialogueLine, CharacterId } from '../types/game';
import { useGlossary } from '../hooks/useGlossary';
import { getSpeakerName } from '../utils/dialogueUtils';

interface DialogueBoxProps {
  dialogueLine: DialogueLine | undefined;
  onAdvance: () => void;
  isActive: boolean;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogueLine,
  onAdvance,
  isActive
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [finished, setFinished] = useState<boolean>(false);
  const dialogueBoxRef = useRef<HTMLDivElement>(null);
  
  const { processGlossaryTerms } = useGlossary();
  
  // Determine speaker name
  const speakerName = dialogueLine?.character ? getSpeakerName(dialogueLine.character as CharacterId | string) : '';
  const characterId = dialogueLine?.character as CharacterId | undefined;
  
  // Display full text immediately when the dialogue line changes
  useEffect(() => {
    if (dialogueLine) {
      const content = dialogueLine.text || '';
      setDisplayedText(content);
      setFinished(true);
    }
  }, [dialogueLine]);
  
  // Handle click to advance
  const handleClick = () => {
    if (!isActive) return;
    
    if (finished) {
      // If finished typing, advance to next dialogue
      onAdvance();
    }
  };
  
  // Process text for glossary terms
  const processedDisplayedText = processGlossaryTerms ? processGlossaryTerms(displayedText) : displayedText;
  
  // If no dialogue or not active, don't render
  if (!dialogueLine || !isActive) {
    return null;
  }

  return (
    <div 
      ref={dialogueBoxRef}
      className="dialog-box p-4 rounded-lg w-full max-w-4xl mx-auto relative"
      onClick={handleClick}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
    >
      {/* Speaker name */}
      {speakerName && (
        <div className="mb-3 pl-4">
          <div 
            className="text-lg font-semibold text-white text-glow-sm"
            style={{ color: characterId ? `var(--character-${characterId}-color, white)` : 'white' }}
          >
            {speakerName}
          </div>
        </div>
      )}
      
      {/* Dialogue text */}
      <div 
        className="text-white text-base leading-relaxed px-4"
        dangerouslySetInnerHTML={{ __html: processedDisplayedText }}
      />
      
      {/* Continue indicator */}
      {finished && (
        <div className="absolute bottom-2 right-4 animate-bounce text-white text-sm">
          ▼
        </div>
      )}
    </div>
  );
};

export default DialogueBox;
