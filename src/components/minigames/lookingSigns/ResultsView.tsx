
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GameResult } from './useLookingSigns';
import { Check, X } from 'lucide-react';

interface ResultsViewProps {
  score: number;
  incorrectScore: number;
  gameResult: GameResult;
  onContinue: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  score,
  incorrectScore,
  gameResult,
  onContinue
}) => {
  const totalSigns = score + incorrectScore;
  const accuracy = totalSigns > 0 ? Math.round((score / totalSigns) * 100) : 0;
  const isSuccess = gameResult === 'success';

  return (
    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
      <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg text-center w-full max-w-xl">
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isSuccess ? (
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white">
              <Check className="w-12 h-12" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white">
              <X className="w-12 h-12" />
            </div>
          )}
        </motion.div>

        <h2 className="text-2xl font-bold mb-2 text-white">
          {isSuccess ? "Favorable Fortune" : "An Unfortunate Reading..."}
        </h2>

        <p className="text-gray-300 mb-6">
          {isSuccess 
            ? "Your accurate interpretation of the signs shows you can discern true meaning. Your fortune is bright!" 
            : "You have misinterpreted too many signs. Your fortune is clouded."}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-400">{score}</div>
            <div className="text-gray-400 text-sm">Correct</div>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-red-400">{incorrectScore}</div>
            <div className="text-gray-400 text-sm">Incorrect</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-1">Accuracy</div>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${accuracy >= 51 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1 text-gray-400">{accuracy}%</div>
          <div className="text-xs mt-2 text-gray-500">
            (51% accuracy or higher is needed to succeed)
          </div>
        </div>

        <Button
          className="px-8 py-2 text-lg"
          onClick={onContinue}
          variant={isSuccess ? "default" : "secondary"}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
