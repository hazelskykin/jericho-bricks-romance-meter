
import React from 'react';
import { Button } from '@/components/ui/button';
import { PoemTheme, PoemRanking } from './useSpokenWord';

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

  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 text-center">
        <div className="text-3xl font-bold mb-2" style={{ color: currentTheme?.color }}>
          {ranking.name}
        </div>
        <div className="text-gray-300 mb-4">
          {ranking.description}
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
          {compiledPoem}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onContinue}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
