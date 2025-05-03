
import React from 'react';
import { motion } from 'framer-motion';
import { GameProvider } from '@/context/GameContext';
import AssetPreloader from './AssetPreloader';
import GameInterface from './GameInterface';
import GameSceneObserver from './GameSceneObserver';

const Game: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <GameProvider>
        <AssetPreloader>
          <GameInterface />
          <GameSceneObserver />
        </AssetPreloader>
      </GameProvider>
    </motion.div>
  );
};

export default Game;
