
import React from 'react';
import { motion } from 'framer-motion';

interface AccentSelectorProps {
  onSelect: (accent: string) => void;
  vertical?: boolean;
  compact?: boolean;
}

const AccentSelector: React.FC<AccentSelectorProps> = ({ onSelect, vertical = false, compact = false }) => {
  // Refined sprite positions to avoid sprite bleed and fix proportions
  const accents = [
    { id: 'autumn-leaf', name: 'Autumn Leaf', position: '0% 0%' },
    { id: 'button', name: 'Button', position: '20% 0%' },
    { id: 'glass-shard', name: 'Glass Shard', position: '40% 0%' },
    { id: 'gear-charm', name: 'Gear Charm', position: '60% 0%' },
    { id: 'ribbon', name: 'Ribbon', position: '80% 0%' },
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
              className={compact ? "w-10 h-10 bg-no-repeat bg-contain" : "w-12 h-12 bg-no-repeat bg-contain"}
              style={{ 
                backgroundImage: 'url(/assets/minigames/autumn/crafter/accents.png)',
                backgroundPosition: accent.position,
                backgroundSize: '500% 100%', // 5 sprites in one row
                imageRendering: 'pixelated' // Better pixel-perfect rendering
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
