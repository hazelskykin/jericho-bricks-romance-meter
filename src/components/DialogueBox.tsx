
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogueLine, MoodType } from '@/types/game';
import { Button } from '@/components/ui/button';
import characters, { maven } from '@/data/characters';

interface DialogueBoxProps {
  line: DialogueLine;
  onContinue: () => void;
  isActive: boolean;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ line, onContinue, isActive }) => {
  // Get character data to display the correct color
  const getCharacterData = () => {
    if (!line.character || line.character === 'narrator') {
      return null;
    }
    
    if (line.character === 'maven') {
      return maven;
    }
    
    return characters[line.character];
  };
  
  const characterData = getCharacterData();
  
  // Determine character name display
  const displayName = () => {
    if (line.character === 'narrator') {
      return 'Narrator';
    } else if (line.character === 'maven') {
      return 'Maven (You)';
    } else if (line.character) {
      return characters[line.character]?.name || '';
    }
    return '';
  };

  // Determine mood indicator
  const getMoodIndicator = (mood: MoodType = 'neutral') => {
    switch(mood) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😔';
      case 'angry':
        return '😠';
      case 'surprised':
        return '😮';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div 
          className="dialog-box fixed bottom-8 left-8 right-8 p-6 rounded-lg z-30 mx-auto max-w-4xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={line.text.substring(0, 20)}
          style={{
            borderLeft: characterData ? `4px solid ${characterData.color}` : undefined,
            borderBottom: characterData ? `1px solid ${characterData.color}30` : undefined,
            borderRight: characterData ? `1px solid ${characterData.color}30` : undefined,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            {line.character && (
              <div 
                className="font-medium text-lg flex items-center gap-2"
                style={{ color: characterData?.color || 'white' }}
              >
                <span>{displayName()}</span>
                {line.mood && line.mood !== 'neutral' && (
                  <span className="text-sm opacity-70">{getMoodIndicator(line.mood)}</span>
                )}
              </div>
            )}
          </div>
          
          <p className="text-lg text-white/90 leading-relaxed">
            {line.text}
          </p>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={onContinue} 
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
