
import React from 'react';
import { Character } from '@/types/game';
import { motion } from 'framer-motion';
import characterChibis from '@/data/characterChibis';

interface AffectionChangeToastProps {
  character: Character;
  amount: number;
  message: string;
  onDismiss: () => void;
}

/**
 * Toast notification for affection changes
 */
export const AffectionChangeToast: React.FC<AffectionChangeToastProps> = ({
  character,
  amount,
  message,
  onDismiss
}) => {
  // Get character color based on character id
  const getCharacterColor = () => {
    switch(character.id) {
      case 'xavier': return '#4CC2FF';
      case 'navarre': return '#FFB347';
      case 'etta': return '#FF5E5B';
      case 'senara': return '#9C89FF';
      case 'maven': return '#0D98BA';
      default: return '#9b87f5';
    }
  };

  const characterColor = getCharacterColor();
  // Get the character's chibi image from characterChibis
  const chibiImage = characterChibis[character.id]?.image;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center bg-gray-900/90 border rounded-lg shadow-lg p-4 max-w-md"
      style={{ borderColor: characterColor }}
    >
      <div className="flex-shrink-0 mr-3">
        {chibiImage && (
          <img 
            src={chibiImage}
            alt={character.name}
            className="w-12 h-12 rounded-full"
          />
        )}
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-white">{character.name}</h4>
        <p className="text-gray-200 text-sm">{message}</p>
        <div className="mt-1 flex items-center">
          <span 
            className="inline-block mr-2 text-lg font-bold"
            style={{ color: amount > 0 ? '#45dc7f' : '#ff6b6b' }}
          >
            {amount > 0 ? '+' : ''}{amount}
          </span>
          <div className="h-1 flex-grow rounded-full bg-gray-700">
            <div 
              className="h-1 rounded-full" 
              style={{ width: `${character.affection}%`, backgroundColor: characterColor }}
            ></div>
          </div>
        </div>
      </div>
      <button 
        onClick={onDismiss}
        className="ml-3 text-gray-400 hover:text-white"
      >
        ×
      </button>
    </motion.div>
  );
};

export default AffectionChangeToast;
