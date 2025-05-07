
import React from 'react';
import { motion } from 'framer-motion';
import CharacterChibisPreview from './CharacterChibisPreview';

const MainContent: React.FC = () => {
  return (
    <motion.div 
      className="w-full max-w-lg flex flex-col items-end"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <p className="text-sm text-white/80 mb-6 text-right max-w-md">
        Navigate relationships and technology in the city of Stonewich as part of Cybaton's elite administrative team.
      </p>

      {/* Character Chibi Preview - Right-aligned */}
      <div className="text-right">
        <CharacterChibisPreview />
      </div>
    </motion.div>
  );
};

export default MainContent;
