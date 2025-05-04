
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Speech } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinigameContainer from '../MinigameContainer';
import { CharacterId } from '@/types/game';
import { soundManager } from '@/utils/soundEffects';

interface SpokenWordGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

// Define the poem themes
const themes = [
  { id: 'nature', name: 'Nature & Environment', color: '#4CC2FF', character: 'xavier' as CharacterId },
  { id: 'connection', name: 'Human Connection', color: '#FFB347', character: 'navarre' as CharacterId },
  { id: 'ambition', name: 'Ambition & Success', color: '#FF5E5B', character: 'etta' as CharacterId },
  { id: 'knowledge', name: 'Knowledge & Mystery', color: '#9C89FF', character: 'senara' as CharacterId }
];

// Define poem stanzas with options
const poemStanzas = [
  {
    id: 'stanza1',
    prompt: 'Begin your poem with:',
    options: [
      { id: 'a1', text: 'In summer light, we find our voice', themes: ['nature', 'connection'] },
      { id: 'a2', text: 'Beneath the stars of Stonewich sky', themes: ['knowledge', 'nature'] },
      { id: 'a3', text: 'Ambitions rise like summer heat', themes: ['ambition', 'nature'] },
      { id: 'a4', text: 'Connections form through melody', themes: ['connection', 'knowledge'] }
    ]
  },
  {
    id: 'stanza2',
    prompt: 'Continue with:',
    options: [
      { id: 'b1', text: 'The rhythm flows through ancient streets', themes: ['knowledge', 'connection'] },
      { id: 'b2', text: 'As technology and nature blend', themes: ['nature', 'knowledge'] },
      { id: 'b3', text: 'We climb the ladders of success', themes: ['ambition'] },
      { id: 'b4', text: 'And share our stories hand in hand', themes: ['connection'] }
    ]
  },
  {
    id: 'stanza3',
    prompt: 'Then add:',
    options: [
      { id: 'c1', text: 'The legacy we leave behind', themes: ['ambition', 'knowledge'] },
      { id: 'c2', text: 'In harmony with earth and sky', themes: ['nature'] },
      { id: 'c3', text: 'Through shared experience we grow', themes: ['connection'] },
      { id: 'c4', text: 'Our wisdom deepens, thoughts refined', themes: ['knowledge'] }
    ]
  },
  {
    id: 'stanza4',
    prompt: 'Conclude with:',
    options: [
      { id: 'd1', text: 'Until we reach our destined heights', themes: ['ambition'] },
      { id: 'd2', text: 'Forever part of nature\'s song', themes: ['nature'] },
      { id: 'd3', text: 'Together stronger than alone', themes: ['connection'] },
      { id: 'd4', text: 'The mysteries of life unfold', themes: ['knowledge'] }
    ]
  }
];

// Define master poem combinations
const masterPoems = [
  { theme: 'nature', combination: ['a1', 'b2', 'c2', 'd2'] },
  { theme: 'connection', combination: ['a4', 'b4', 'c3', 'd3'] },
  { theme: 'ambition', combination: ['a3', 'b3', 'c1', 'd1'] },
  { theme: 'knowledge', combination: ['a2', 'b1', 'c4', 'd4'] }
];

const rankingCategories = [
  { name: 'Laureate', minScore: 90, description: 'A true master of words!' },
  { name: 'Lyricist', minScore: 70, description: 'Your words flow with rhythm and meaning.' },
  { name: 'Wordsmith', minScore: 50, description: 'You have a good grasp of poetic elements.' },
  { name: 'Acolyte', minScore: 0, description: 'You\'re taking your first steps into poetry.' }
];

const SpokenWordGame: React.FC<SpokenWordGameProps> = ({ onComplete, onExit }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [gameStage, setGameStage] = useState<'theme' | 'poem' | 'results'>('theme');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setGameStage('poem');
    soundManager.playSound('click');
  };

  const handleOptionSelect = (stanzaId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [stanzaId]: optionId }));
    soundManager.playSound('click');
    
    // If this is the last stanza, calculate score and show results
    if (stanzaId === 'stanza4' || currentStanzaIndex === poemStanzas.length - 1) {
      calculateScore({ ...selectedOptions, [stanzaId]: optionId });
      setGameStage('results');
    } else {
      // Move to next stanza
      setCurrentStanzaIndex(prev => prev + 1);
    }
  };
  
  const calculateScore = (selections: Record<string, string>) => {
    // Start with base score
    let calculatedScore = 50;
    
    // Check theme coherence
    const selectedOptionIds = Object.values(selections);
    const selectedOptions = poemStanzas.flatMap(stanza => 
      stanza.options.filter(option => selectedOptionIds.includes(option.id))
    );
    
    // Count theme occurrences
    const themeCounts: Record<string, number> = {};
    selectedOptions.forEach(option => {
      option.themes.forEach(theme => {
        themeCounts[theme] = (themeCounts[theme] || 0) + 1;
      });
    });
    
    // Add points for theme coherence
    const primaryTheme = selectedTheme;
    if (primaryTheme && themeCounts[primaryTheme]) {
      calculatedScore += themeCounts[primaryTheme] * 10;
    }
    
    // Check if the combination matches a master poem
    const combinationArray = [
      selections.stanza1,
      selections.stanza2,
      selections.stanza3,
      selections.stanza4
    ];
    
    const isMasterPoem = masterPoems.some(poem => 
      poem.combination.every((id, index) => combinationArray[index] === id)
    );
    
    if (isMasterPoem) {
      calculatedScore = 100; // Perfect score for master poem
      soundManager.playSound('win');
    } else {
      soundManager.playSound('click');
    }
    
    setScore(Math.min(100, Math.max(0, calculatedScore)));
  };
  
  const getRanking = () => {
    return rankingCategories.find(rank => score >= rank.minScore) || rankingCategories[0];
  };
  
  const getCompiledPoem = () => {
    return poemStanzas.map(stanza => {
      const selectedOptionId = selectedOptions[stanza.id];
      const option = stanza.options.find(o => o.id === selectedOptionId);
      return option ? option.text : '';
    }).filter(Boolean).join('\n');
  };
  
  const handleContinue = () => {
    // 70+ is considered a success (Lyricist or better)
    const success = score >= 70;
    onComplete(success);
  };
  
  const currentTheme = themes.find(t => t.id === selectedTheme);
  const currentStanza = poemStanzas[currentStanzaIndex];

  return (
    <MinigameContainer
      title="Spoken Word: Poetry Game"
      instructions={
        gameStage === 'theme' 
          ? "Choose a theme for your poem. Different themes resonate with different characters."
          : gameStage === 'poem'
          ? "Create your poem by selecting options for each stanza. Choose carefully to maintain thematic coherence."
          : "Your poem is complete!"
      }
      onComplete={handleContinue}
      onExit={onExit}
    >
      <div className="flex flex-col items-center gap-6">
        {gameStage === 'theme' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {themes.map(theme => (
              <motion.div
                key={theme.id}
                className="p-4 rounded-lg border cursor-pointer"
                style={{ borderColor: `${theme.color}50`, backgroundColor: `${theme.color}10` }}
                whileHover={{ backgroundColor: `${theme.color}30`, y: -5 }}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.color }}>
                    <Speech size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: theme.color }}>{theme.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {gameStage === 'poem' && currentTheme && currentStanza && (
          <div className="w-full max-w-lg">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold" style={{ color: currentTheme.color }}>
                Theme: {themes.find(t => t.id === selectedTheme)?.name}
              </h3>
              <p className="text-gray-400">Stanza {currentStanzaIndex + 1} of {poemStanzas.length}</p>
            </div>
            
            {/* Display current poem so far */}
            {currentStanzaIndex > 0 && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                {poemStanzas.slice(0, currentStanzaIndex).map((stanza, idx) => {
                  const selectedOptionId = selectedOptions[stanza.id];
                  const option = stanza.options.find(o => o.id === selectedOptionId);
                  return option ? (
                    <div key={`stanza-${idx}`} className="mb-2 italic text-gray-300">
                      {option.text}
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="text-gray-300 mb-3">
              {currentStanza.prompt}
            </div>
            
            <div className="space-y-3">
              {currentStanza.options.map(option => (
                <motion.div
                  key={option.id}
                  className="p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(currentStanza.id, option.id)}
                >
                  {option.text}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {gameStage === 'results' && (
          <div className="w-full max-w-lg">
            <div className="mb-6 text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: currentTheme?.color }}>
                {getRanking().name}
              </div>
              <div className="text-gray-300 mb-4">
                {getRanking().description}
              </div>
              <div className="flex items-center justify-center mb-6">
                <div className="text-4xl font-bold">{score}</div>
                <div className="text-gray-400 ml-2">/ 100</div>
              </div>
            </div>
            
            <div className="mb-6 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-xl mb-3 font-semibold text-center" style={{ color: currentTheme?.color }}>
                Your Poem
              </h3>
              <div className="whitespace-pre-line text-gray-200 italic text-center">
                {getCompiledPoem()}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleContinue}
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </MinigameContainer>
  );
};

export default SpokenWordGame;
