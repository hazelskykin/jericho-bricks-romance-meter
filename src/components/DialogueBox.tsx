
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogueLine } from '@/types/game';
import { Button } from '@/components/ui/button';

interface DialogueBoxProps {
  line: DialogueLine;
  onContinue: () => void;
  isActive: boolean;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ line, onContinue, isActive }) => {
  // Determine character name display
  const displayName = () => {
    if (line.character === 'narrator') {
      return '';
    } else if (line.character === 'maven') {
      return 'Maven (You)';
    } else {
      // Capitalize first letter of character name
      return line.character ? line.character.charAt(0).toUpperCase() + line.character.slice(1) : '';
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
        >
          {line.character !== 'narrator' && (
            <div className="font-medium text-lg text-cyberpunk-primary mb-2">
              {displayName()}
            </div>
          )}
          
          <p className="text-lg text-white/90 leading-relaxed">
            {line.text}
          </p>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={onContinue} 
              className="text-sm bg-cyberpunk-dark hover:bg-cyberpunk-secondary border border-cyberpunk-primary/30"
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
