
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogueLine } from '@/types/game';
import { MoodType } from '@/types/expressions';
import { Button } from '@/components/ui/button';
import characters, { maven } from '@/data/characters';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import CharacterPortrait from './CharacterPortrait';

interface DialogueBoxProps {
  line?: DialogueLine;
  onContinue?: () => void;
  isActive?: boolean;
  dialogueLine?: DialogueLine;
  onAdvance?: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ 
  line, 
  dialogueLine,
  onContinue, 
  onAdvance,
  isActive = true 
}) => {
  // Use either line or dialogueLine prop (for backward compatibility)
  const currentLine = dialogueLine || line;
  const handleAdvance = onAdvance || onContinue || (() => {});
  
  if (!currentLine) return null;
  
  // Get character data to display the correct color
  const getCharacterData = () => {
    if (!currentLine.character || currentLine.character === 'narrator') {
      return null;
    }
    
    if (currentLine.character === 'maven') {
      return maven;
    }
    
    return characters[currentLine.character];
  };
  
  const characterData = getCharacterData();
  
  // Determine character name display
  const displayName = () => {
    if (currentLine.character === 'narrator') {
      return 'Narrator';
    } else if (currentLine.character === 'maven') {
      return 'Maven (You)';
    } else if (currentLine.character) {
      return characters[currentLine.character]?.name || '';
    }
    return '';
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div 
          className="dialog-box fixed bottom-4 left-0 right-0 p-6 rounded-lg z-30 mx-auto max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={currentLine.text.substring(0, 20)}
          style={{
            borderLeft: characterData ? `4px solid ${characterData.color}` : undefined,
            borderBottom: characterData ? `1px solid ${characterData.color}30` : undefined,
            borderRight: characterData ? `1px solid ${characterData.color}30` : undefined,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            {currentLine.character && currentLine.character !== 'narrator' && (
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center"
                  style={{ borderColor: characterData?.color || 'white' }}
                >
                  <CharacterPortrait
                    characterId={currentLine.character}
                    mood={currentLine.mood || 'neutral'}
                    animate={false}
                    isInDialog={true}
                  />
                </div>
                <div 
                  className="font-medium text-lg"
                  style={{ color: characterData?.color || 'white' }}
                >
                  <span>{displayName()}</span>
                </div>
              </div>
            )}
            
            {(!currentLine.character || currentLine.character === 'narrator') && (
              <div className="font-medium text-lg text-white/90">
                <span>Narrator</span>
              </div>
            )}
          </div>
          
          <p className="text-lg text-white/90 leading-relaxed ml-0">
            {currentLine.text}
          </p>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleAdvance} 
              className="text-sm bg-cyberpunk-dark hover:bg-cyberpunk-secondary border border-cyberpunk-primary/30"
              style={{
                borderColor: characterData ? `${characterData.color}50` : undefined,
              }}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DialogueBox;
