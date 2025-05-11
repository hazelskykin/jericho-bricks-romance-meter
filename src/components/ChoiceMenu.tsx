
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
      <div className="bg-[#1A1F2C]/90 border border-[#9b87f5]/30 backdrop-blur-md shadow-lg rounded-lg p-6">
        <div className="font-medium text-xl text-[#9b87f5] mb-4 text-center text-glow-sm">
          What will you do?
        </div>
        
        <div className="grid gap-3 w-full">
          {choices.map((choice, index) => (
            <motion.button
              key={index}
              className="choice-button w-full text-left p-4 rounded-md bg-[#2A2E3A]/80 border border-[#9b87f5]/20 
                        text-white/90 hover:text-white hover:bg-[#3A3150] hover:border-[#9b87f5]/60
                        transition-all duration-200 shadow-md hover:shadow-[0_0_12px_rgba(155,135,245,0.3)]"
              onClick={() => onChoiceSelected(index)}
              whileHover={{ 
                x: 8,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.3, 
                  delay: index * 0.1 
                } 
              }}
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
