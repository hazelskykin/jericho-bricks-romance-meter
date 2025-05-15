
import React from 'react';
import { motion } from 'framer-motion';

interface AccentSelectorProps {
  onSelect: (accentType: string) => void;
  compact?: boolean;
}

const AccentSelector: React.FC<AccentSelectorProps> = ({ onSelect, compact = false }) => {
  // We now use a combined sprite sheet instead of individual files
  const accents = [
    { id: 'leaf', name: 'Leaf', image: '/assets/minigames/autumn/crafter/accents.png', position: '0 0' },
    { id: 'button', name: 'Button', image: '/assets/minigames/autumn/crafter/accents.png', position: '-50px 0' },
    { id: 'glass', name: 'Glass', image: '/assets/minigames/autumn/crafter/accents.png', position: '-100px 0' },
    { id: 'gearcharm', name: 'Gear', image: '/assets/minigames/autumn/crafter/accents.png', position: '-150px 0' },
    { id: 'ribbon', name: 'Ribbon', image: '/assets/minigames/autumn/crafter/accents.png', position: '-200px 0' },
  ];

  return (
    <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-5 gap-4'}`}>
      {accents.map((accent) => (
        <motion.div 
          key={accent.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect(accent.id)}
        >
          <div className={`bg-[#1A1F2C]/70 ${compact ? 'p-1' : 'p-3'} rounded-lg border border-[#9b87f5] hover:bg-[#2A2045]/70 transition-colors`}>
            <div 
              className={compact ? "w-12 h-12" : "w-16 h-16"}
              style={{ 
                backgroundImage: `url(${accent.image})`,
                backgroundPosition: accent.position,
                backgroundSize: '250px 50px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
          {!compact && <span className="text-white text-xs mt-1">{accent.name}</span>}
        </motion.div>
      ))}
    </div>
  );
};

export default AccentSelector;
