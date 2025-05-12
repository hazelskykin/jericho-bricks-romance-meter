
import React, { useRef, useState } from 'react';
import { PlacedAccent } from '@/hooks/useCrafterGame';
import { motion } from 'framer-motion';

interface CraftCanvasProps {
  baseMaterial: 'fabric' | 'metal' | 'wood';
  accents: PlacedAccent[];
  onPlaceAccent?: (x: number, y: number) => void;
  interactive?: boolean;
  showInitials?: boolean;
  characterInitials?: string;
}

const CraftCanvas: React.FC<CraftCanvasProps> = ({ 
  baseMaterial, 
  accents, 
  onPlaceAccent,
  interactive = false,
  showInitials = false,
  characterInitials = ''
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  
  // Get background position for an accent sprite
  const getAccentPosition = (accentId: string): string => {
    const positionMap: Record<string, string> = {
      'autumn-leaf': '0% 0%',
      'button': '25% 0%',
      'glass-shard': '50% 0%',
      'gear-charm': '75% 0%',
      'ribbon': '100% 0%',
    };
    
    return positionMap[accentId] || '0% 0%';
  };
  
  // Handle click on the canvas to place an accent
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !onPlaceAccent || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    onPlaceAccent(x, y);
  };

  return (
    <div 
      ref={canvasRef}
      className={`relative w-64 h-64 ${interactive ? 'cursor-pointer' : ''} bg-transparent`}
      onClick={handleCanvasClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Base Material */}
      <img 
        src={`/assets/minigames/autumn/crafter/${baseMaterial}Base.png`}
        alt={`${baseMaterial} base`}
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Placed Accents */}
      {accents.map((accent, index) => (
        <div 
          key={`${accent.id}-${index}`}
          className="absolute w-12 h-12 bg-no-repeat"
          style={{ 
            left: `${accent.position.x - 6}%`, 
            top: `${accent.position.y - 6}%`,
            backgroundImage: 'url(/assets/minigames/autumn/crafter/accents.png)',
            backgroundPosition: getAccentPosition(accent.id),
            backgroundSize: '500% 100%', // 5 sprites in one row
            imageRendering: 'pixelated' // This may help with image quality
          }}
        />
      ))}
      
      {/* Initials (shown when craft is complete) */}
      {showInitials && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Heart Shape */}
            <svg width="60" height="60" viewBox="0 0 24 24" className="text-[#FF5E5B]/70">
              <path 
                fill="currentColor" 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            
            {/* Initials Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {characterInitials}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Placement Helper (only shown when interactive and hovering) */}
      {interactive && hovering && (
        <motion.div 
          className="absolute inset-0 border-2 border-dashed border-[#9b87f5]/60 rounded-lg"
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default CraftCanvas;
