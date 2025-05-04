
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Beer, CupSoda } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinigameContainer from '../MinigameContainer';
import { soundManager } from '@/utils/soundEffects';

interface WhatsOnTapGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

interface DrinkOrder {
  id: number;
  type: 'beer' | 'lemonade' | 'seltzer';
  modifier?: string; // For seltzer flavors or lemonade ice
  customerName: string;
  isCompleted: boolean;
}

interface DrinkPour {
  type: 'beer' | 'lemonade' | 'seltzer';
  quality: number; // 0-100, higher is better
  modifier?: string;
}

// Customer names
const customerNames = [
  "Alex", "Jamie", "Morgan", "Taylor", "Jordan", 
  "Casey", "Riley", "Avery", "Quinn", "Dakota",
  "Robin", "Sam", "Drew", "Ash", "Max"
];

// Seltzer flavors
const seltzerFlavors = [
  "Cherry", "Lime", "Berry", "Orange", "Grape"
];

// Lemonade ice options
const lemonadeOptions = [
  "No Ice", "Light Ice", "Extra Ice"
];

const WhatsOnTapGame: React.FC<WhatsOnTapGameProps> = ({ onComplete, onExit }) => {
  const [gameStage, setGameStage] = useState<'instructions' | 'playing' | 'results'>('instructions');
  const [score, setScore] = useState(0);
  const [orders, setOrders] = useState<DrinkOrder[]>([]);
  const [currentPour, setCurrentPour] = useState<DrinkPour | null>(null);
  const [pourProgress, setPourProgress] = useState(0);
  const [isPouringActive, setIsPouringActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds game
  const [ordersFulfilled, setOrdersFulfilled] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  
  const pourTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ordersTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the game
  const startGame = () => {
    setGameStage('playing');
    setScore(0);
    setOrdersFulfilled(0);
    setTimeRemaining(60);
    setOrders([generateRandomOrder()]);
    
    // Start timers
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
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
    const drinkTypes: ('beer' | 'lemonade' | 'seltzer')[] = ['beer', 'lemonade', 'seltzer'];
    const type = drinkTypes[Math.floor(Math.random() * drinkTypes.length)];
    let modifier;
    
    if (type === 'seltzer') {
      modifier = seltzerFlavors[Math.floor(Math.random() * seltzerFlavors.length)];
    } else if (type === 'lemonade') {
      modifier = lemonadeOptions[Math.floor(Math.random() * lemonadeOptions.length)];
    }
    
    return {
      id: idOverride || Math.floor(Math.random() * 10000),
      type,
      modifier,
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      isCompleted: false
    };
  };
  
  // Start pouring a drink
  const startPour = (type: 'beer' | 'lemonade' | 'seltzer', modifier?: string) => {
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
    
    soundManager.playSound('click');
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
    
    soundManager.playSound(quality > 70 ? 'win' : 'error');
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
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (ordersTimerRef.current) clearInterval(ordersTimerRef.current);
    if (pourTimerRef.current) clearInterval(pourTimerRef.current);
    
    setIsPouringActive(false);
    setCurrentPour(null);
    setGameStage('results');
  };
  
  // Cleanup timers
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (ordersTimerRef.current) clearInterval(ordersTimerRef.current);
      if (pourTimerRef.current) clearInterval(pourTimerRef.current);
    };
  }, []);
  
  const handleComplete = () => {
    // 70+ is considered a success
    const success = score >= 70;
    onComplete(success);
  };
  
  return (
    <MinigameContainer
      title="What's On-Tap?"
      instructions={
        gameStage === 'instructions' 
          ? "Work the festival's Beer Tent and fulfill drink orders. Pour carefully to match customer preferences!"
          : gameStage === 'playing'
          ? "Hold the tap button to pour, release when you think it's perfect. Match the drink to the right order!"
          : "Shift completed!"
      }
      onComplete={handleComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center gap-6">
        {gameStage === 'instructions' && (
          <>
            <div className="text-gray-300 text-center max-w-md">
              <p className="mb-4">
                Customers will place orders for three types of drinks:
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <Beer size={32} className="mb-2 text-amber-400" />
                  <p><b>Beer</b>: Pour just right to minimize foam (around 90%)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <CupSoda size={32} className="mb-2 text-yellow-300" />
                  <p><b>Lemonade</b>: Match the customer's ice preference</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <CupSoda size={32} className="mb-2 text-pink-400" />
                  <p><b>Seltzer</b>: Hit the sweet spot in the middle for perfect flavor</p>
                </div>
              </div>
              
              <Button 
                onClick={startGame}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-lg px-8 py-3"
              >
                Start Shift
              </Button>
            </div>
          </>
        )}

        {gameStage === 'playing' && (
          <div className="w-full">
            {/* Game stats */}
            <div className="flex justify-between mb-4">
              <div className="text-lg">Time: {timeRemaining}s</div>
              <div className="text-lg">Score: {score}</div>
              <div className="text-lg">Orders Filled: {ordersFulfilled}</div>
            </div>
            
            {/* Orders queue */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {orders.map(order => (
                <motion.div
                  key={order.id}
                  className={`p-3 rounded-lg border ${order.isCompleted ? 'border-green-500 bg-green-900/20' : 'border-gray-700'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{order.customerName}:</span>{' '}
                      {order.type === 'beer' ? 'Beer' : 
                       order.type === 'lemonade' ? `Lemonade (${order.modifier})` :
                       `${order.modifier} Seltzer`}
                    </div>
                    {order.isCompleted && (
                      <span className="text-green-400">✓ Completed</span>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {orders.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  No pending orders. New customers arriving soon!
                </div>
              )}
            </div>
            
            {/* Pour visualization */}
            {currentPour && (
              <div className="mb-6">
                <div className="bg-gray-800 rounded-lg h-32 w-full relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-100`}
                    style={{ 
                      height: `${pourProgress}%`,
                      backgroundColor: 
                        currentPour.type === 'beer' ? '#F59E0B' : 
                        currentPour.type === 'lemonade' ? '#FBBF24' : 
                        '#EC4899'
                    }}
                  />
                  
                  {currentPour.type === 'beer' && pourProgress > 80 && (
                    <div 
                      className="absolute left-0 right-0 bg-white/80"
                      style={{ 
                        bottom: `${pourProgress}%`, 
                        height: `${Math.min(30, pourProgress - 70)}%` 
                      }}
                    />
                  )}
                </div>
                
                <div className="mt-2 text-center">
                  Pouring: {currentPour.type === 'beer' ? 'Beer' : 
                           currentPour.type === 'lemonade' ? `Lemonade` : 
                           `${currentPour.modifier} Seltzer`}
                </div>
              </div>
            )}
            
            {/* Taps control */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Button
                  className="w-full h-16 bg-amber-600 hover:bg-amber-700 mb-2"
                  onMouseDown={() => startPour('beer')}
                  onMouseUp={stopPour}
                  onTouchStart={() => startPour('beer')}
                  onTouchEnd={stopPour}
                  disabled={isPouringActive && currentPour?.type !== 'beer'}
                >
                  <Beer className="mr-2" /> Beer
                </Button>
                
                <div className="text-xs text-gray-400">Pour to 90%</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 gap-1 w-full mb-2">
                  {lemonadeOptions.map(option => (
                    <Button
                      key={option}
                      className="h-16 bg-yellow-600 hover:bg-yellow-700"
                      onMouseDown={() => startPour('lemonade', option)}
                      onMouseUp={stopPour}
                      onTouchStart={() => startPour('lemonade', option)}
                      onTouchEnd={stopPour}
                      disabled={isPouringActive && (currentPour?.type !== 'lemonade' || currentPour?.modifier !== option)}
                      title={option}
                    >
                      <CupSoda className="mr-1" />
                      <span className="text-xs">{option}</span>
                    </Button>
                  ))}
                </div>
                <div className="text-xs text-gray-400">Lemonade options</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 gap-1 w-full mb-2">
                  {seltzerFlavors.slice(0, 3).map(flavor => (
                    <Button
                      key={flavor}
                      className="h-16 bg-pink-600 hover:bg-pink-700"
                      onMouseDown={() => startPour('seltzer', flavor)}
                      onMouseUp={stopPour}
                      onTouchStart={() => startPour('seltzer', flavor)}
                      onTouchEnd={stopPour}
                      disabled={isPouringActive && (currentPour?.type !== 'seltzer' || currentPour?.modifier !== flavor)}
                    >
                      <CupSoda className="mr-1" />
                      <span className="text-xs">{flavor}</span>
                    </Button>
                  ))}
                </div>
                <div className="text-xs text-gray-400">Seltzer flavors</div>
              </div>
            </div>
          </div>
        )}

        {gameStage === 'results' && (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-4">Shift Complete!</div>
            
            <div className="flex items-center justify-center my-4">
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-gray-400 ml-2">points</div>
            </div>
            
            <div className="text-xl mb-2">
              Orders Fulfilled: {ordersFulfilled}
            </div>
            
            <div className="text-xl mb-6">
              {score >= 90 ? "Legendary bartender!" : 
               score >= 70 ? "Great job handling the rush!" : 
               score >= 50 ? "Not bad for your first shift!" : 
               "The customers were patient with you!"}
            </div>
            
            <Button 
              onClick={handleComplete}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </MinigameContainer>
  );
};

export default WhatsOnTapGame;
