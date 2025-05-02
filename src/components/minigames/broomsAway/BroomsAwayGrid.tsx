
import React from 'react';
import { motion } from 'framer-motion';
import { Cell } from '@/hooks/useBroomsAwayGame';

interface BroomsAwayGridProps {
  grid: Cell[][];
  cols: number;
  cursorClass: string;
  onCellClick: (row: number, col: number) => void;
}

const BroomsAwayGrid: React.FC<BroomsAwayGridProps> = ({
  grid,
  cols,
  cursorClass,
  onCellClick
}) => {
  const getCellDisplay = (cell: Cell) => {
    if (cell.isFlagged) {
      return '🪶'; // Feather duster
    }
    
    if (!cell.isSwept) {
      return ''; // Covered in dust
    }
    
    if (cell.isSensitive) {
      return '💥'; // Broken sensitive spot
    }
    
    if (cell.neighborCount > 0) {
      return cell.neighborCount;
    }
    
    return ''; // Empty swept cell
  };
  
  const getCellStyle = (cell: Cell) => {
    if (!cell.isSwept && !cell.isFlagged) {
      return 'bg-gray-400'; // Dusty
    }
    
    if (cell.isFlagged) {
      return 'bg-blue-200'; // Feather dusted
    }
    
    if (cell.isSensitive) {
      return 'bg-red-500'; // Broken sensitive spot
    }
    
    if (cell.isSwept) {
      return 'bg-gray-200'; // Swept clean
    }
    
    return 'bg-gray-300';
  };

  return (
    <div 
      className={`grid gap-1 p-4 bg-gray-700 rounded-lg ${cursorClass}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(30px, 1fr))` }}
    >
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <motion.div
            key={`${rowIndex}-${colIndex}`}
            className={`w-full aspect-square flex items-center justify-center font-bold text-lg border border-gray-600 ${getCellStyle(cell)}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            {getCellDisplay(cell)}
          </motion.div>
        ))
      ))}
    </div>
  );
};

export default BroomsAwayGrid;
