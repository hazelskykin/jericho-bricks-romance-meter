
import React, { useState, useEffect, useRef } from 'react';
import { DialogueLine, CharacterId } from '../types/game';
import CharacterPortrait from './CharacterPortrait';
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
  const [text, setText] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const dialogueBoxRef = useRef<HTMLDivElement>(null);
  
  const { processGlossaryTerms } = useGlossary();
  
  // Determine speaker name
  const speakerName = dialogueLine?.character ? getSpeakerName(dialogueLine.character as CharacterId | string) : '';
  const showPortrait = dialogueLine?.character && dialogueLine.character !== 'narrator';
  const characterId = dialogueLine?.character as CharacterId | undefined;
  const characterMood = dialogueLine?.mood || 'neutral';
  
  // Reset and set up text display when dialogue line changes
  useEffect(() => {
    if (dialogueLine) {
      const content = dialogueLine.text || '';
      setText(content);
      setDisplayedText('');
      setTyping(true);
      setFinished(false);
      
      // Check for fast typewriter effect (removing isGhost property reference)
      const typeDelay = 20; // Default typing speed
      
      // Type effect
      let i = 0;
      const timer = setInterval(() => {
        if (i < content.length) {
          setDisplayedText(prev => prev + content.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          setTyping(false);
          setFinished(true);
        }
      }, typeDelay);
      
      return () => clearInterval(timer);
    }
  }, [dialogueLine]);
  
  // Handle click to advance
  const handleClick = () => {
    if (!isActive) return;
    
    if (typing) {
      // If still typing, complete the text immediately
      setDisplayedText(text);
      setTyping(false);
      setFinished(true);
    } else if (finished) {
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
      className="dialog-box p-4 rounded-lg w-full max-w-xl mx-auto relative"
      onClick={handleClick}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
    >
      {/* Speaker name label */}
      {speakerName && (
        <div className="flex items-center mb-2">
          {/* Character portrait - small circle avatar */}
          {showPortrait && characterId && (
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-800 border-2 border-accent">
              <CharacterPortrait 
                characterId={characterId} 
                mood={characterMood}
                className="w-full h-full" 
                isInDialog={true}
              />
            </div>
          )}
          
          {/* Speaker name */}
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
        className="text-white text-base leading-relaxed pl-14"
        dangerouslySetInnerHTML={{ __html: processedDisplayedText }}
      />
      
      {/* Continue indicator */}
      {finished && (
        <div className="absolute bottom-3 right-4 animate-bounce text-white text-sm">
          ▼
        </div>
      )}
    </div>
  );
};

export default DialogueBox;
