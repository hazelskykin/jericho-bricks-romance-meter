
import React from 'react';
import { motion } from 'framer-motion';
import { Position } from './types';

interface MudFlingFountainProps {
  position: Position;
  intensity: 'low' | 'medium' | 'high';
}

const MudFlingFountain: React.FC<MudFlingFountainProps> = ({ position, intensity }) => {
  // Scale based on intensity
  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'low': return 0.7;
      case 'medium': return 1;
      case 'high': return 1.3;
      default: return 1;
    }
  };
  
  const intensityMultiplier = getIntensityMultiplier();
  
  // Animation speeds based on intensity
  const getAnimationDuration = () => {
    switch (intensity) {
      case 'low': return 3;
      case 'medium': return 2;
      case 'high': return 1;
      default: return 2;
    }
  };
  
  return (
    <div 
      className="absolute"
      style={{
        left: position.x - 32,
        top: position.y - 20,
        zIndex: 1
      }}
    >
      {/* Base puddle */}
      <div 
        className="w-16 h-8 bg-amber-900 rounded-full"
        style={{
          width: `${64 * intensityMultiplier}px`,
          height: `${24 * intensityMultiplier}px`
        }}
      />
      
      {/* Fountain mud */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-10 h-10 bg-amber-800 rounded-full origin-bottom"
        style={{
          width: `${40 * intensityMultiplier}px`,
        }}
        initial={{ scaleY: 0.3, y: 0 }}
        animate={{ 
          scaleY: [0.3, 1, 0.3],
          y: [0, -20 * intensityMultiplier, 0]
        }}
        transition={{
          duration: getAnimationDuration(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Fountain particles */}
      {Array(5).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-amber-700"
          initial={{ 
            x: 0,
            y: 0,
            opacity: 0 
          }}
          animate={{ 
            x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5) * intensityMultiplier],
            y: [0, -15 * intensityMultiplier, 5],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: getAnimationDuration(),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
          style={{
            left: '50%',
            top: 0,
          }}
        />
      ))}
    </div>
  );
};

export default MudFlingFountain;
