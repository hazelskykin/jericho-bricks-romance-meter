
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Cell {
  isSensitive: boolean;
  isSwept: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

export function useBroomsAwayGame(onComplete: (success: boolean) => void) {
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
  
  const getCursorClass = () => {
    if (gameStatus !== 'playing') return '';
    return cursorType === 'broom' ? 'cursor-pointer' : 'cursor-cell';
  };

  return {
    grid,
    rows,
    cols,
    featherDusters,
    brokenSpots,
    maxBrokenSpots,
    cursorType,
    gameStatus,
    toggleCursor,
    handleCellClick,
    getCursorClass
  };
}
