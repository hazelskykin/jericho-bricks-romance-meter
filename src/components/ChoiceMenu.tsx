
import React from 'react';
import { motion } from 'framer-motion';
import { DialogueChoice } from '@/types/game';

interface ChoiceMenuProps {
  choices: DialogueChoice[];
  onChoiceSelected: (choice: DialogueChoice) => void;
  isActive: boolean;
}

const ChoiceMenu: React.FC<ChoiceMenuProps> = ({ choices, onChoiceSelected, isActive }) => {
  if (!isActive || !choices || choices.length === 0) return null;
  
  return (
    <motion.div
      className="fixed bottom-8 left-8 right-8 p-6 rounded-lg z-30 mx-auto max-w-4xl dialog-box"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="font-medium text-lg text-cyberpunk-primary mb-4">
        What will you do?
      </div>
      
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <motion.button
            key={index}
            className="choice-button w-full text-left p-4 rounded-md bg-cyberpunk-dark/50 border border-cyberpunk-primary/20 text-white/90 hover:text-white"
            onClick={() => onChoiceSelected(choice)}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
          >
            {choice.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ChoiceMenu;
