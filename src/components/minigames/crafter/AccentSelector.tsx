
import React from 'react';
import { motion } from 'framer-motion';

interface AccentSelectorProps {
  onSelect: (accent: string) => void;
  vertical?: boolean;
}

const AccentSelector: React.FC<AccentSelectorProps> = ({ onSelect, vertical = false }) => {
  // Refined sprite positions to avoid sprite bleed and fix proportions
  const accents = [
    { id: 'autumn-leaf', name: 'Autumn Leaf', position: '0% 0%' },
    { id: 'button', name: 'Button', position: '25% 0%' },
    { id: 'glass-shard', name: 'Glass Shard', position: '50% 0%' },
    { id: 'gear-charm', name: 'Gear Charm', position: '75% 0%' },
    { id: 'ribbon', name: 'Ribbon', position: '100% 0%' },
  ];

  return (
    <div className={`flex ${vertical ? 'flex-col gap-4' : 'gap-4 overflow-x-auto pb-2 justify-center'}`}>
      {accents.map((accent) => (
        <motion.div 
          key={accent.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect(accent.id)}
        >
          <div className="bg-[#1A1F2C]/70 p-2 rounded-lg border border-[#9b87f5] mb-1 hover:bg-[#2A2045]/70 transition-colors">
            <div 
              className="w-16 h-16 bg-no-repeat bg-contain"
              style={{ 
                backgroundImage: 'url(/assets/minigames/autumn/crafter/accents.png)',
                backgroundPosition: accent.position,
                backgroundSize: '500% 100%', // 5 sprites in one row
                imageRendering: 'auto' // Better image rendering
              }}
            />
          </div>
          <span className="text-white text-xs font-semibold text-shadow">{accent.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default AccentSelector;
