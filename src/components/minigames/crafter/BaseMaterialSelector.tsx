
import React from 'react';
import { motion } from 'framer-motion';

interface BaseMaterialSelectorProps {
  onSelect: (material: 'fabric' | 'metal' | 'wood') => void;
}

const BaseMaterialSelector: React.FC<BaseMaterialSelectorProps> = ({ onSelect }) => {
  const materials = [
    { id: 'fabric', name: 'Fabric', image: '/assets/minigames/autumn/crafter/fabricBase.png' },
    { id: 'metal', name: 'Metal', image: '/assets/minigames/autumn/crafter/metalBase.png' },
    { id: 'wood', name: 'Wood', image: '/assets/minigames/autumn/crafter/woodBase.png' },
  ] as const;

  return (
    <div className="flex gap-6 justify-center">
      {materials.map((material) => (
        <motion.div 
          key={material.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect(material.id)}
        >
          <div className="bg-[#1A1F2C]/70 p-3 rounded-lg border-2 border-[#9b87f5] mb-2 hover:bg-[#2A2045]/70 transition-colors">
            <img 
              src={material.image} 
              alt={material.name} 
              className="w-32 h-32 object-contain"
            />
          </div>
          <span className="text-white font-semibold text-shadow">{material.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default BaseMaterialSelector;
