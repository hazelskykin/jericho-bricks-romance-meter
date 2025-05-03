
import React from 'react';
import { motion } from 'framer-motion';
import AssetPreloader from './AssetPreloader';
import GameInterface from './GameInterface';
import GameSceneObserver from './GameSceneObserver';

const Game: React.FC = () => {
  console.log('Game component rendered');
  
  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AssetPreloader>
        <GameInterface />
        <GameSceneObserver />
      </AssetPreloader>
    </motion.div>
  );
};

export default Game;
