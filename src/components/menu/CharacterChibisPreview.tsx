
import React from 'react';
import { motion } from 'framer-motion';
import { ChibiImageData } from '@/types/game';

interface CharacterChibisPreviewProps {
  characterChibis: Record<string, ChibiImageData>;
  loadingComplete: boolean;
  showNeutral?: boolean;
}

const CharacterChibisPreview: React.FC<CharacterChibisPreviewProps> = ({ 
  characterChibis, 
  loadingComplete,
  showNeutral = true 
}) => {
  // Define colors for character frames
  const characterColors = {
    maven: '#0D98BA',   // Maven's teal
    xavier: '#4CC2FF',  // Xavier's blue
    navarre: '#FFB347', // Navarre's orange
    etta: '#FF5E5B',    // Etta's red
    senara: '#9C89FF'   // Senara's purple
  };
  
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Filter out Maven as requested and take only the other characters
  const filteredChibis = Object.values(characterChibis).filter(chibi => chibi.id !== 'maven');

  return (
    <motion.div 
      className="grid grid-cols-2 gap-2"
      variants={containerVariants}
      initial="hidden"
      animate={loadingComplete ? "visible" : "hidden"}
    >
      {filteredChibis.map((chibi) => (
        <motion.div 
          key={chibi.id} 
          className="relative"
          variants={itemVariants}
        >
          {/* Colored frame for the chibi */}
          <div 
            className="absolute inset-0 rounded-lg transform scale-105"
            style={{ 
              backgroundColor: characterColors[chibi.id as keyof typeof characterColors] || '#888888', 
              opacity: 0.2 
            }}
          />
          
          <img
            src={(showNeutral && 'neutralImage' in chibi) ? 
              (chibi.neutralImage as string) : 
              chibi.image}
            alt={chibi.description}
            width={chibi.width || "100px"}
            height="auto"
            className="object-contain relative z-10"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CharacterChibisPreview;
