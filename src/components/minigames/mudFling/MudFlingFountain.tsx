import React from 'react';
import { motion } from 'framer-motion';

export interface MudFlingFountainProps {
  intensity: 'low' | 'medium' | 'high';
}

const MudFlingFountain: React.FC<MudFlingFountainProps> = ({ intensity }) => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <motion.div 
        className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center"
        animate={{
          scale: intensity === 'low' ? [1, 1.1] :
                 intensity === 'medium' ? [1, 1.2] : [1, 1.3],
          opacity: [0.7, 0.9]
        }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <div className="w-8 h-8 rounded-full bg-blue-300" />
      </motion.div>
      
      {/* Water spray */}
      <motion.div 
        className="absolute left-1/2 top-0 transform -translate-x-1/2 w-40 h-40"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: intensity === 'low' ? 0.3 :
                   intensity === 'medium' ? 0.5 : 0.7
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-blue-300 rounded-full"
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1 + Math.random(),
              delay: Math.random()
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MudFlingFountain;
