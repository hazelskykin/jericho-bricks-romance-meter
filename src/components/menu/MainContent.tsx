
import React from 'react';
import { motion } from 'framer-motion';
import CharacterChibisPreview from './CharacterChibisPreview';
import MenuButtons from './MenuButtons';

interface MainContentProps {
  onNewGame: () => void;
  onAbout: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onNewGame, onAbout }) => {
  return (
    <motion.div 
      className="w-1/3 text-right pr-8 pt-8 flex flex-col items-end"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <p className="text-lg text-white/80 mb-6 max-w-md">
        Navigate relationships and technology in the city of Stonewich as part of Cybaton's elite administrative team.
      </p>

      {/* Character Chibi Preview */}
      <CharacterChibisPreview />
      
      {/* Menu Buttons */}
      <MenuButtons onNewGame={onNewGame} onAbout={onAbout} />
    </motion.div>
  );
};

export default MainContent;
