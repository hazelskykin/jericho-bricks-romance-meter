
import React from 'react';
import { motion } from 'framer-motion';

const GameTitle: React.FC = () => {
  return (
    <motion.h1 
      className="text-5xl font-bold text-white text-glow mt-6 mb-4 text-center"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      Jericho Bricks
    </motion.h1>
  );
};

export default GameTitle;
