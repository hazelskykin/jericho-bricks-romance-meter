
import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import BackgroundScene from './BackgroundScene';
import characters from '@/data/characters';
import { CharacterId } from '@/types/game';
import { Button } from './ui/button';

interface CharacterSelectionProps {
  availableCharacters: CharacterId[];
  scenePrefix: string;
  title: string;
  description: string;
  completionSceneId?: string; // Added optional completionSceneId prop
}

const CharacterSelectionScene: React.FC<CharacterSelectionProps> = ({
  availableCharacters,
  scenePrefix,
  title,
  description,
  completionSceneId // Include in component props
}) => {
  const { handleSceneTransition } = useGame();
  
  // Log when component renders to debug navigation
  console.log("CharacterSelectionScene rendered", {
    availableCharacters,
    scenePrefix,
    title,
    completionSceneId // Log the new prop as well
  });
  
  // Filter only the specified characters
  const selectableCharacters = Object.values(characters).filter(
    character => availableCharacters.includes(character.id as CharacterId)
  );
  
  // Handle character selection with logging
  const handleCharacterSelect = (characterId: string) => {
    console.log(`Selected character ${characterId}, navigating to ${scenePrefix}-${characterId}`);
    handleSceneTransition(`${scenePrefix}-${characterId}`);
  };
  
  // Handle proceed to festival planning
  const handleProceedToFestival = () => {
    console.log(`Proceeding to festival planning: ${completionSceneId || 'spring-festival-planning'}`);
    // Use the completionSceneId prop if provided, otherwise use default
    handleSceneTransition(completionSceneId || 'spring-festival-planning');
  };
  
  return (
    <>
      <BackgroundScene backgroundId="stonewich-cityscape" />
      
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4 z-30">
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 max-w-4xl w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
          <p className="text-lg text-white/80 mb-8">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectableCharacters.map(character => (
              <motion.button
                key={character.id}
                className="flex items-center p-4 rounded-lg border transition-all duration-300"
                style={{ 
                  borderColor: `${character.color}50`,
                  backgroundColor: `${character.color}10`
                }}
                whileHover={{ 
                  backgroundColor: `${character.color}30`,
                  x: 5 
                }}
                onClick={() => handleCharacterSelect(character.id)}
              >
                <div 
                  className="w-16 h-16 rounded-full mr-4 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${character.avatar})`,
                    border: `2px solid ${character.color}`
                  }}
                />
                
                <div className="text-left">
                  <h3 className="font-bold text-xl" style={{ color: character.color }}>{character.name}</h3>
                  <p className="text-white/70">{character.role}</p>
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* Add Proceed to Festival Planning button */}
          <div className="mt-8 flex justify-center">
            <Button
              className="px-8 py-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold text-lg transition-all duration-300"
              onClick={handleProceedToFestival}
            >
              Proceed to Festival Planning
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CharacterSelectionScene;
