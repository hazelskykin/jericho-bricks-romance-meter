
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import characterChibis from '@/data/characterChibis';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CharacterId } from '@/types/game';
import characters from '@/data/characters';

interface AssetLoadingProps {
  message?: string;
}

const AssetLoading: React.FC<AssetLoadingProps> = ({ message = 'Loading assets...' }) => {
  const [randomCharacterId, setRandomCharacterId] = useState<CharacterId | null>(null);
  
  // Choose a random character on mount
  useEffect(() => {
    const characterIds = Object.keys(characters) as CharacterId[];
    // Filter to only include characters that have chibi images
    const chibisAvailable = characterIds.filter(id => characterChibis[id]?.image);
    
    // If we have characters with chibis, use one of them, otherwise just pick any character
    const availableCharacters = chibisAvailable.length > 0 ? chibisAvailable : characterIds;
    
    if (availableCharacters.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCharacters.length);
      setRandomCharacterId(availableCharacters[randomIndex]);
    }
  }, []);
  
  // Get character data if we have a random character
  const character = randomCharacterId ? characters[randomCharacterId] : null;
  const chibiData = randomCharacterId ? characterChibis[randomCharacterId] : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
      <motion.div 
        className="p-6 bg-card rounded-lg border border-primary/20 shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Show chibi image if available */}
          {chibiData?.image && character ? (
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <Avatar 
                className="w-20 h-20 rounded-xl border-2" 
                style={{ 
                  borderColor: character.color,
                  boxShadow: `0 0 10px ${character.color}50`
                }}
              >
                <AvatarImage 
                  src={chibiData.image} 
                  alt={character.name}
                  className="rounded-xl"
                />
                <AvatarFallback
                  style={{ 
                    backgroundColor: character.color + '20',
                    color: character.color
                  }}
                  className="rounded-xl"
                >
                  {character.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          ) : (
            <div className="relative w-16 h-16">
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          
          <div className="text-center">
            <h3 className="font-medium text-lg">{message}</h3>
            <p className="text-sm text-muted-foreground mt-1">Please wait while we prepare your experience.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssetLoading;
