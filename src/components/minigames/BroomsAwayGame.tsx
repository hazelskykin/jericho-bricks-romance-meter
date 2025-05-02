
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MinigameContainer from './MinigameContainer';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';

interface Cell {
  isSensitive: boolean;
  isSwept: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

interface BroomsAwayGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BroomsAwayGame: React.FC<BroomsAwayGameProps> = ({ onComplete, onExit }) => {
  // Game config
  const rows = 8;
  const cols = 10;
  const sensitiveSpotsCount = 10;
  const maxBrokenSpots = 3;
  
  // Game state
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [featherDusters, setFeatherDusters] = useState(15);
  const [brokenSpots, setBrokenSpots] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [cursorType, setCursorType] = useState<'broom' | 'duster'>('broom');
  
  // Initialize the game grid
  useEffect(() => {
    initializeGrid();
  }, []);
  
  // Monitor game state for win/loss conditions
  useEffect(() => {
    if (brokenSpots >= maxBrokenSpots) {
      setGameStatus('lost');
      setTimeout(() => onComplete(false), 2000);
    } else {
      checkForWin();
    }
  }, [grid, brokenSpots]);
  
  const initializeGrid = () => {
    // Create empty grid
    const newGrid: Cell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({
        isSensitive: false,
        isSwept: false,
        isFlagged: false,
        neighborCount: 0
      }))
    );
    
    // Place sensitive spots randomly
    let sensitiveSpotsPlaced = 0;
    while (sensitiveSpotsPlaced < sensitiveSpotsCount) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      
      if (!newGrid[randomRow][randomCol].isSensitive) {
        newGrid[randomRow][randomCol].isSensitive = true;
        sensitiveSpotsPlaced++;
        
        // Update neighbor counts
        for (let i = Math.max(0, randomRow - 1); i <= Math.min(rows - 1, randomRow + 1); i++) {
          for (let j = Math.max(0, randomCol - 1); j <= Math.min(cols - 1, randomCol + 1); j++) {
            if (!(i === randomRow && j === randomCol)) {
              newGrid[i][j].neighborCount++;
            }
          }
        }
      }
    }
    
    setGrid(newGrid);
  };
  
  const checkForWin = () => {
    // Game is won when all non-sensitive cells are swept
    let allNonSensitiveSwept = true;
    let allSensitiveFlagged = true;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!grid[i][j].isSensitive && !grid[i][j].isSwept) {
          allNonSensitiveSwept = false;
        }
        if (grid[i][j].isSensitive && !grid[i][j].isFlagged) {
          allSensitiveFlagged = false;
        }
      }
    }
    
    if ((allNonSensitiveSwept || allSensitiveFlagged) && gameStatus === 'playing') {
      setGameStatus('won');
      setTimeout(() => onComplete(true), 2000);
    }
  };
  
  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing' || grid[row][col].isSwept || grid[row][col].isFlagged) {
      return;
    }
    
    const newGrid = [...grid];
    
    if (cursorType === 'broom') {
      // Sweeping with broom
      if (grid[row][col].isSensitive) {
        // Hit a sensitive spot
        newGrid[row][col].isSwept = true;
        setBrokenSpots(prev => prev + 1);
        toast.error("Oh no! You broke a sensitive tech spot!");
      } else {
        // Reveal this cell and potentially neighboring cells
        revealCell(newGrid, row, col);
      }
    } else {
      // Placing feather duster
      if (featherDusters > 0) {
        newGrid[row][col].isFlagged = true;
        setFeatherDusters(prev => prev - 1);
        
        if (grid[row][col].isSensitive) {
          toast.success("Good call! That was a sensitive tech spot!");
        }
      } else {
        toast.warning("No more feather dusters available!");
      }
    }
    
    setGrid(newGrid);
  };
  
  const revealCell = (grid: Cell[][], row: number, col: number) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col].isSwept || grid[row][col].isFlagged) {
      return;
    }
    
    grid[row][col].isSwept = true;
    
    // If this is an empty cell, reveal neighbors
    if (grid[row][col].neighborCount === 0) {
      for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
        for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
          if (!(i === row && j === col)) {
            revealCell(grid, i, j);
          }
        }
      }
    }
  };
  
  const toggleCursor = () => {
    setCursorType(prev => prev === 'broom' ? 'duster' : 'broom');
  };
  
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
  
  const getCursorClass = () => {
    if (gameStatus !== 'playing') return '';
    return cursorType === 'broom' ? 'cursor-pointer' : 'cursor-cell';
  };
  
  return (
    <MinigameContainer
      title="Brooms Away"
      instructions="Sweep away the dust covering the city without breaking sensitive tech spots. Use feather dusters to mark sensitive spots."
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white">Feather Dusters:</span>
            <span className="font-bold text-yellow-300">{featherDusters}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white">Broken Spots:</span>
            <span className="font-bold text-red-500">{brokenSpots}/{maxBrokenSpots}</span>
          </div>
          
          <Button 
            variant="outline"
            className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
            onClick={toggleCursor}
          >
            {cursorType === 'broom' ? '🧹 Using Broom' : '🪶 Using Duster'}
          </Button>
        </div>
        
        <div 
          className={`grid gap-1 p-4 bg-gray-700 rounded-lg ${getCursorClass()}`}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(30px, 1fr))` }}
        >
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`w-full aspect-square flex items-center justify-center font-bold text-lg border border-gray-600 ${getCellStyle(cell)}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                {getCellDisplay(cell)}
              </motion.div>
            ))
          ))}
        </div>
        
        {gameStatus === 'won' && (
          <div className="mt-4 p-3 bg-green-800/70 rounded-lg text-white text-center">
            <h3 className="text-xl font-bold">You Won!</h3>
            <p>Excellent job keeping the city clean while protecting sensitive tech!</p>
          </div>
        )}
        
        {gameStatus === 'lost' && (
          <div className="mt-4 p-3 bg-red-800/70 rounded-lg text-white text-center">
            <h3 className="text-xl font-bold">Game Over</h3>
            <p>Too many sensitive tech spots were broken. Better luck next time!</p>
          </div>
        )}
      </div>
    </MinigameContainer>
  );
};

export default BroomsAwayGame;
