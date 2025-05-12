
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PoemTheme, PoemRanking } from './useSpokenWord';
import { motion } from 'framer-motion';

interface ResultsViewProps {
  themes: PoemTheme[];
  selectedTheme: string;
  score: number;
  compiledPoem: string;
  ranking: PoemRanking;
  onContinue: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  themes,
  selectedTheme,
  score,
  compiledPoem,
  ranking,
  onContinue
}) => {
  const currentTheme = themes.find(t => t.id === selectedTheme);
  const [showRanking, setShowRanking] = useState(false);
  const [typedPoem, setTypedPoem] = useState("");
  
  // Get mastery icon path based on rank name
  const getMasteryIconPath = (rankName: string): string => {
    switch(rankName) {
      case 'Laureate': return '/assets/minigames/summer/spokenWord/mastery-icons-laureate.png';
      case 'Lyricist': return '/assets/minigames/summer/spokenWord/mastery-icons-lyricist.png';
      case 'Wordsmith': return '/assets/minigames/summer/spokenWord/mastery-icons-wordsmith.png';
      case 'Acolyte': return '/assets/minigames/summer/spokenWord/mastery-icons-acolyte.png';
      default: return '/assets/minigames/summer/spokenWord/mastery-icons-acolyte.png';
    }
  };
  
  // Animation for typing effect
  useEffect(() => {
    if (!compiledPoem) return;
    
    let currentIndex = 0;
    const typingInterval = 50; // ms per character
    
    const typeCharacter = () => {
      if (currentIndex < compiledPoem.length) {
        setTypedPoem(compiledPoem.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeCharacter, typingInterval);
      } else {
        // Show ranking after poem is fully typed
        setTimeout(() => {
          setShowRanking(true);
        }, 500);
      }
    };
    
    // Start typing animation
    setTimeout(typeCharacter, 500);
    
    return () => {
      // Cleanup if needed
    };
  }, [compiledPoem]);

  return (
    <div className="w-full max-w-2xl">
      {/* Poem display */}
      <div className="mb-6 p-6 rounded-lg relative" style={{ 
        backgroundImage: 'url(/assets/minigames/summer/spokenWord/paper-background.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: `0 4px 6px -1px ${currentTheme?.color || '#9b87f5'}30`
      }}>
        <div className="whitespace-pre-line text-gray-800 font-medium leading-relaxed">
          {typedPoem.split('\n').map((line, idx) => (
            <p key={`line-${idx}`} className="mb-3 italic">
              {line}
            </p>
          ))}
        </div>
      </div>
      
      {/* Mastery rank display */}
      {showRanking && (
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div 
              className="w-24 h-24 mb-4 bg-contain bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${getMasteryIconPath(ranking.name)})`,
              }}
            />
            
            <div className="text-3xl font-bold mb-2" style={{ color: currentTheme?.color }}>
              {ranking.name}
            </div>
            
            <div className="text-gray-300 mb-4 text-center">
              {ranking.description}
            </div>
            
            <div className="flex items-center justify-center mb-2">
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-gray-400 ml-2">/ 100</div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="flex justify-center">
        <Button 
          onClick={onContinue}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-2"
        >
          {showRanking ? "Close" : "View Mastery"}
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
