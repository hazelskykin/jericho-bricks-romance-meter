
import React from 'react';
import { motion } from 'framer-motion';
import { Beer, CupSoda } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DrinkOrder, DrinkPour, DrinkType, LEMONADE_OPTIONS, SELTZER_FLAVORS } from './useWhatsOnTap';

interface GamePlayViewProps {
  orders: DrinkOrder[];
  currentPour: DrinkPour | null;
  pourProgress: number;
  timeRemaining: number;
  score: number;
  ordersFulfilled: number;
  isPouringActive: boolean;
  onStartPour: (type: DrinkType, modifier?: string) => void;
  onStopPour: () => void;
}

const GamePlayView: React.FC<GamePlayViewProps> = ({
  orders,
  currentPour,
  pourProgress,
  timeRemaining,
  score,
  ordersFulfilled,
  isPouringActive,
  onStartPour,
  onStopPour
}) => {
  return (
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
            onMouseDown={() => onStartPour('beer')}
            onMouseUp={onStopPour}
            onTouchStart={() => onStartPour('beer')}
            onTouchEnd={onStopPour}
            disabled={isPouringActive && currentPour?.type !== 'beer'}
          >
            <Beer className="mr-2" /> Beer
          </Button>
          
          <div className="text-xs text-gray-400">Pour to 90%</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-1 w-full mb-2">
            {LEMONADE_OPTIONS.map(option => (
              <Button
                key={option}
                className="h-16 bg-yellow-600 hover:bg-yellow-700"
                onMouseDown={() => onStartPour('lemonade', option)}
                onMouseUp={onStopPour}
                onTouchStart={() => onStartPour('lemonade', option)}
                onTouchEnd={onStopPour}
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
            {SELTZER_FLAVORS.slice(0, 3).map(flavor => (
              <Button
                key={flavor}
                className="h-16 bg-pink-600 hover:bg-pink-700"
                onMouseDown={() => onStartPour('seltzer', flavor)}
                onMouseUp={onStopPour}
                onTouchStart={() => onStartPour('seltzer', flavor)}
                onTouchEnd={onStopPour}
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
  );
};

export default GamePlayView;
