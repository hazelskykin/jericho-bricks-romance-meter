
import { useState, useEffect, useRef } from 'react';
import { soundManager } from '@/utils/soundEffects';
import { useMinigameTimer } from '../common/useMinigameTimer';

export interface DrinkOrder {
  id: number;
  type: DrinkType;
  modifier?: string; // For seltzer flavors or lemonade ice
  customerName: string;
  isCompleted: boolean;
}

export interface DrinkPour {
  type: DrinkType;
  quality: number; // 0-100, higher is better
  modifier?: string;
}

export type DrinkType = 'beer' | 'lemonade' | 'seltzer';

// Customer names
export const CUSTOMER_NAMES = [
  "Alex", "Jamie", "Morgan", "Taylor", "Jordan", 
  "Casey", "Riley", "Avery", "Quinn", "Dakota",
  "Robin", "Sam", "Drew", "Ash", "Max"
];

// Seltzer flavors
export const SELTZER_FLAVORS = [
  "Cherry", "Lime", "Berry", "Orange", "Grape"
];

// Lemonade ice options
export const LEMONADE_OPTIONS = [
  "No Ice", "Light Ice", "Extra Ice"
];

export function useWhatsOnTap(onComplete: (success: boolean) => void) {
  const [gameStage, setGameStage] = useState<'instructions' | 'playing' | 'results'>('instructions');
  const [score, setScore] = useState(0);
  const [orders, setOrders] = useState<DrinkOrder[]>([]);
  const [currentPour, setCurrentPour] = useState<DrinkPour | null>(null);
  const [pourProgress, setPourProgress] = useState(0);
  const [isPouringActive, setIsPouringActive] = useState(false);
  const [ordersFulfilled, setOrdersFulfilled] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  
  const pourTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ordersTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { timeRemaining, startTimer } = useMinigameTimer({
    initialTime: 60, // 60 seconds game
    onTimeUp: () => endGame(),
    autoStart: false
  });

  // Start the game
  const startGame = () => {
    setGameStage('playing');
    setScore(0);
    setOrdersFulfilled(0);
    setOrders([generateRandomOrder()]);
    startTimer();
    
    // Add new orders periodically
    ordersTimerRef.current = setInterval(() => {
      if (Math.random() < 0.7 * gameSpeed) { // Chance to add order increases with game speed
        setOrders(prev => {
          if (prev.length < 5) { // Maximum 5 orders at a time
            return [...prev, generateRandomOrder(prev.length + 1)];
          }
          return prev;
        });
      }
      
      // Increase game speed slowly
      setGameSpeed(prev => Math.min(2, prev + 0.05));
    }, 3000);
  };
  
  // Generate a random drink order
  const generateRandomOrder = (idOverride?: number): DrinkOrder => {
    const drinkTypes: DrinkType[] = ['beer', 'lemonade', 'seltzer'];
    const type = drinkTypes[Math.floor(Math.random() * drinkTypes.length)];
    let modifier;
    
    if (type === 'seltzer') {
      modifier = SELTZER_FLAVORS[Math.floor(Math.random() * SELTZER_FLAVORS.length)];
    } else if (type === 'lemonade') {
      modifier = LEMONADE_OPTIONS[Math.floor(Math.random() * LEMONADE_OPTIONS.length)];
    }
    
    return {
      id: idOverride || Math.floor(Math.random() * 10000),
      type,
      modifier,
      customerName: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
      isCompleted: false
    };
  };
  
  // Start pouring a drink
  const startPour = (type: DrinkType, modifier?: string) => {
    if (isPouringActive || currentPour) return;
    
    setCurrentPour({ type, quality: 0, modifier });
    setIsPouringActive(true);
    setPourProgress(0);
    
    pourTimerRef.current = setInterval(() => {
      setPourProgress(prev => {
        const newProgress = prev + 2;
        
        if (newProgress >= 100) {
          completePour();
          return 0;
        }
        
        return newProgress;
      });
    }, 50);
    
    soundManager.play('click');
  };
  
  // Stop pouring the current drink
  const stopPour = () => {
    if (!isPouringActive || !currentPour) return;
    
    clearInterval(pourTimerRef.current!);
    setIsPouringActive(false);
    
    // Calculate pour quality based on how close to optimal point
    let quality = 0;
    
    if (currentPour.type === 'beer') {
      // Beer is best around 85-95% filled (not too much foam)
      quality = 100 - Math.abs(90 - pourProgress) * 2;
    } else if (currentPour.type === 'lemonade') {
      // Lemonade depends on ice preference
      if (currentPour.modifier === 'No Ice' && pourProgress < 30) {
        quality = 100 - (30 - pourProgress) * 3;
      } else if (currentPour.modifier === 'Light Ice' && pourProgress >= 30 && pourProgress <= 70) {
        quality = 100 - Math.abs(50 - pourProgress) * 2;
      } else if (currentPour.modifier === 'Extra Ice' && pourProgress > 70) {
        quality = 100 - (pourProgress - 70) * 3;
      } else {
        quality = 50;
      }
    } else if (currentPour.type === 'seltzer') {
      // Seltzer is about timing the sweet spot in the middle
      quality = 100 - Math.abs(50 - pourProgress) * 2;
    }
    
    // Cap quality between 0-100
    quality = Math.max(0, Math.min(100, quality));
    
    // Update the current pour with the calculated quality
    setCurrentPour({
      ...currentPour,
      quality: Math.round(quality)
    });
    
    soundManager.play(quality > 70 ? 'win' : 'error');
  };
  
  // Complete the pour and match with an order
  const completePour = () => {
    if (!currentPour) return;
    
    clearInterval(pourTimerRef.current!);
    setIsPouringActive(false);
    setPourProgress(0);
    
    // Find a matching order
    const matchingOrderIndex = orders.findIndex(order => 
      !order.isCompleted && 
      order.type === currentPour.type &&
      (!order.modifier || !currentPour.modifier || order.modifier === currentPour.modifier)
    );
    
    if (matchingOrderIndex >= 0) {
      // Order matched
      const quality = currentPour.quality;
      
      // Award points based on quality
      const pointsAwarded = Math.round(quality / 10);
      
      setScore(prev => prev + pointsAwarded);
      setOrdersFulfilled(prev => prev + 1);
      
      // Mark order as completed
      setOrders(prev => {
        const newOrders = [...prev];
        newOrders[matchingOrderIndex] = {
          ...newOrders[matchingOrderIndex],
          isCompleted: true
        };
        
        // Remove completed orders after a delay
        setTimeout(() => {
          setOrders(current => current.filter(o => o.id !== newOrders[matchingOrderIndex].id));
        }, 1000);
        
        return newOrders;
      });
    } else {
      // No matching order, penalty
      setScore(prev => Math.max(0, prev - 5));
    }
    
    // Reset current pour
    setCurrentPour(null);
  };
  
  // End the game
  const endGame = () => {
    if (ordersTimerRef.current) clearInterval(ordersTimerRef.current);
    if (pourTimerRef.current) clearInterval(pourTimerRef.current);
    
    setIsPouringActive(false);
    setCurrentPour(null);
    setGameStage('results');
  };
  
  // Cleanup timers
  useEffect(() => {
    return () => {
      if (ordersTimerRef.current) clearInterval(ordersTimerRef.current);
      if (pourTimerRef.current) clearInterval(pourTimerRef.current);
    };
  }, []);
  
  const handleComplete = () => {
    // 70+ is considered a success
    const success = score >= 70;
    onComplete(success);
  };

  return {
    gameStage,
    score,
    orders,
    currentPour,
    pourProgress,
    isPouringActive,
    timeRemaining,
    ordersFulfilled,
    startGame,
    startPour,
    stopPour,
    handleComplete,
    endGame
  };
}
