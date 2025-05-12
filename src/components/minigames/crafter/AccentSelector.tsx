
import React from 'react';
import { motion } from 'framer-motion';

interface AccentSelectorProps {
  onSelect: (accent: string) => void;
  vertical?: boolean;
  compact?: boolean;
}

const AccentSelector: React.FC<AccentSelectorProps> = ({ onSelect, vertical = false, compact = false }) => {
  // Now using individual image files instead of sprite positions
  const accents = [
    { id: 'autumn-leaf', name: 'Autumn Leaf', imagePath: '/assets/minigames/autumn/crafter/accents-leaf.png' },
    { id: 'button', name: 'Button', imagePath: '/assets/minigames/autumn/crafter/accents-button.png' },
    { id: 'glass-shard', name: 'Glass Shard', imagePath: '/assets/minigames/autumn/crafter/accents-glass.png' },
    { id: 'gear-charm', name: 'Gear Charm', imagePath: '/assets/minigames/autumn/crafter/accents-gearcharm.png' },
    { id: 'ribbon', name: 'Ribbon', imagePath: '/assets/minigames/autumn/crafter/accents-ribbon.png' },
  ];

  return (
    <div className={`flex ${vertical ? 'flex-col' : ''} flex-wrap gap-2 justify-center`}>
      {accents.map((accent) => (
        <motion.div 
          key={accent.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect(accent.id)}
        >
          <div className="bg-[#1A1F2C]/70 p-2 rounded-lg border border-[#9b87f5] mb-1 hover:bg-[#2A2045]/70 transition-colors">
            <div 
              className={compact ? "w-10 h-10" : "w-12 h-12"}
              style={{ 
                backgroundImage: `url(${accent.imagePath})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
          <span className="text-white text-xs font-semibold text-shadow">{compact ? '' : accent.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default AccentSelector;
