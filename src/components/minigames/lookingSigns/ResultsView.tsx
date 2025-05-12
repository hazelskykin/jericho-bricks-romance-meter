
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, XCircle } from 'lucide-react';

interface ResultsViewProps {
  score: number;
  incorrectScore: number;
  gameResult: 'win' | 'lose';
  onContinue: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  score,
  incorrectScore,
  gameResult,
  onContinue
}) => {
  // Calculate total signs sorted
  const totalSorted = score + incorrectScore;
  // Calculate percentage of correct signs
  const correctPercentage = totalSorted > 0 ? Math.round((score / totalSorted) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6 max-w-md mx-auto py-6"
    >
      {/* Result Icon */}
      <div className="h-32 w-32 flex items-center justify-center rounded-full mb-4">
        {gameResult === 'win' ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <Trophy className="h-24 w-24 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <XCircle className="h-24 w-24 text-red-400" />
          </motion.div>
        )}
      </div>

      {/* Result Title */}
      <h2 className="text-2xl font-bold mb-2 text-center">
        {gameResult === 'win' 
          ? "Auspicious Fortune!" 
          : "Unfortunate Reading..."}
      </h2>

      {/* Result Message */}
      <p className="text-center text-gray-300 mb-4">
        {gameResult === 'win'
          ? "The signs favor your relationship! Your keen eye for fortune has impressed your companion."
          : "You've misread the signs... Better luck next time. Perhaps fortune isn't with you today."}
      </p>

      {/* Stats */}
      <div className="w-full bg-[#1A1F2C]/60 p-6 rounded-lg mb-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-gray-400">Good Signs</p>
            <p className="text-2xl font-bold text-green-400">{score}</p>
          </div>
          <div>
            <p className="text-gray-400">Bad Omens</p>
            <p className="text-2xl font-bold text-red-400">{incorrectScore}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400">Accuracy</p>
            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${correctPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="mt-1 font-bold">{correctPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Affection Change Message */}
      <p className="text-center italic text-sm">
        {gameResult === 'win'
          ? "Your companion seems impressed with your fortune-reading abilities."
          : "Your companion seems a bit disappointed with the results."}
      </p>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-2 mt-4"
      >
        Continue
      </Button>
    </motion.div>
  );
};

export default ResultsView;
