
import { useState, useEffect } from 'react';
import { CharacterId } from '@/types/game';
import { soundManager } from '@/utils/sound';

export interface PoemTheme {
  id: string;
  name: string;
  color: string;
  character: CharacterId;
}

export interface PoemOption {
  id: string;
  text: string;
  themes: string[];
}

export interface PoemStanza {
  id: string;
  prompt: string;
  options: PoemOption[];
}

export interface PoemRanking {
  name: string;
  minScore: number;
  description: string;
}

export const DEFAULT_THEMES: PoemTheme[] = [
  { id: 'nature', name: 'Nature & Environment', color: '#4CC2FF', character: 'xavier' },
  { id: 'connection', name: 'Human Connection', color: '#FFB347', character: 'navarre' },
  { id: 'ambition', name: 'Ambition & Success', color: '#FF5E5B', character: 'etta' },
  { id: 'knowledge', name: 'Knowledge & Mystery', color: '#9C89FF', character: 'senara' }
];

export const DEFAULT_POEM_STANZAS: PoemStanza[] = [
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

export const MASTER_POEMS = [
  { theme: 'nature', combination: ['a1', 'b2', 'c2', 'd2'] },
  { theme: 'connection', combination: ['a4', 'b4', 'c3', 'd3'] },
  { theme: 'ambition', combination: ['a3', 'b3', 'c1', 'd1'] },
  { theme: 'knowledge', combination: ['a2', 'b1', 'c4', 'd4'] }
];

export const POEM_RANKINGS: PoemRanking[] = [
  { name: 'Laureate', minScore: 90, description: 'A true master of words!' },
  { name: 'Lyricist', minScore: 70, description: 'Your words flow with rhythm and meaning.' },
  { name: 'Wordsmith', minScore: 50, description: 'You have a good grasp of poetic elements.' },
  { name: 'Acolyte', minScore: 0, description: 'You\'re taking your first steps into poetry.' }
];

export function useSpokenWord(onComplete: (success: boolean) => void) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [gameStage, setGameStage] = useState<'theme' | 'poem' | 'results'>('theme');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isTypingPoem, setIsTypingPoem] = useState(false);
  
  // Reset typing animation when entering results stage
  useEffect(() => {
    if (gameStage === 'results') {
      setIsTypingPoem(true);
      // Play typing sound
      const typingSound = setTimeout(() => {
        soundManager.play('spokenWord-typing');
      }, 300);
      
      // After animation completes
      const finishTyping = setTimeout(() => {
        setIsTypingPoem(false);
        // Play mastery reveal sound after typing
        soundManager.play('spokenWord-mastered-ding');
      }, 3000);
      
      return () => {
        clearTimeout(typingSound);
        clearTimeout(finishTyping);
      };
    }
  }, [gameStage]);
  
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setGameStage('poem');
    soundManager.play('click');
  };

  const handleOptionSelect = (stanzaId: string, optionId: string) => {
    // Play line selection sound
    soundManager.play('spokenWord-line-select');
    
    setSelectedOptions(prev => ({ ...prev, [stanzaId]: optionId }));
    
    // If this is the last stanza, calculate score and show results
    if (stanzaId === 'stanza4' || currentStanzaIndex === DEFAULT_POEM_STANZAS.length - 1) {
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
    const selectedOptions = DEFAULT_POEM_STANZAS.flatMap(stanza => 
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
    
    const isMasterPoem = MASTER_POEMS.some(poem => 
      poem.combination.every((id, index) => combinationArray[index] === id)
    );
    
    if (isMasterPoem) {
      calculatedScore = 100; // Perfect score for master poem
      soundManager.play('win');
    } else {
      soundManager.play('click');
    }
    
    setScore(Math.min(100, Math.max(0, calculatedScore)));
  };
  
  const getRanking = () => {
    return POEM_RANKINGS.find(rank => score >= rank.minScore) || POEM_RANKINGS[POEM_RANKINGS.length - 1];
  };
  
  const getCompiledPoem = () => {
    return DEFAULT_POEM_STANZAS.map(stanza => {
      const selectedOptionId = selectedOptions[stanza.id];
      const option = stanza.options.find(o => o.id === selectedOptionId);
      return option ? option.text : '';
    }).filter(Boolean).join('\n');
  };
  
  const handleContinue = () => {
    // Play mastery sound if still on results screen
    if (gameStage === 'results') {
      soundManager.play('click');
    }
    
    // Stop any ongoing sounds
    setTimeout(() => {
      // 70+ is considered a success (Lyricist or better)
      const success = score >= 70;
      onComplete(success);
    }, 100);
  };
  
  return {
    selectedTheme,
    gameStage,
    selectedOptions,
    currentStanzaIndex,
    score,
    isTypingPoem,
    handleThemeSelect,
    handleOptionSelect,
    getRanking,
    getCompiledPoem,
    handleContinue
  };
}
