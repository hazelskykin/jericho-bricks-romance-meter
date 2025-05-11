
import React from 'react';
import { motion } from 'framer-motion';
import { DialogueChoice } from '@/types/game';

interface ChoiceMenuProps {
  choices: DialogueChoice[];
  onChoiceSelected: (index: number) => void;
  isActive: boolean;
}

const ChoiceMenu: React.FC<ChoiceMenuProps> = ({ choices, onChoiceSelected, isActive }) => {
  if (!isActive || !choices || choices.length === 0) return null;
  
  return (
    <motion.div
      className="fixed inset-x-0 bottom-8 mx-auto max-w-4xl z-30 px-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dialog-box p-6 rounded-lg flex flex-col items-center">
        <div className="font-medium text-lg text-cyberpunk-primary mb-4">
          What will you do?
        </div>
        
        <div className="grid gap-3 w-full">
          {choices.map((choice, index) => (
            <motion.button
              key={index}
              className="choice-button text-left p-4 rounded-md bg-cyberpunk-dark/50 border border-cyberpunk-primary/20 text-white/90 hover:text-white"
              onClick={() => onChoiceSelected(index)}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              {choice.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChoiceMenu;
