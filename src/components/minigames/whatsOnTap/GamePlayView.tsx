
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Beer, CupSoda, Clock } from 'lucide-react';
import { DrinkOrder, DrinkPour, DrinkType } from '../whatsOnTap/useWhatsOnTap';
import { soundManager } from '@/utils/soundEffects';

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
  // Handle start pouring with sound effect
  const handleStartPour = (type: DrinkType, modifier?: string) => {
    soundManager.playSFX('pour-start');
    onStartPour(type, modifier);
  };
  
  // Handle stop pouring with sound effect
  const handleStopPour = () => {
    soundManager.playSFX('pour-stop');
    onStopPour();
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Top bar with score and time */}
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-800 rounded">
        <div className="flex items-center">
          <span className="text-amber-400 font-bold">Score: {score}</span>
          <span className="ml-4 text-gray-400">Orders: {ordersFulfilled}</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="text-red-400 mr-2" />
          <Progress value={(timeRemaining / 60) * 100} className="w-32" />
          <span className="ml-2 text-white">{timeRemaining}s</span>
        </div>
      </div>
      
      {/* Orders and Pouring Area */}
      <div className="flex flex-grow">
        {/* Orders List */}
        <div className="w-1/3 pr-2">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {orders.map(order => (
              <div 
                key={order.id}
                className={`p-2 border rounded ${order.isCompleted ? 'bg-green-900/20 border-green-700' : 'bg-gray-800 border-gray-700'}`}
              >
                <div className="flex items-center">
                  {order.type === 'beer' && <Beer className="text-amber-400 mr-2" />}
                  {order.type === 'lemonade' && <CupSoda className="text-yellow-300 mr-2" />}
                  {order.type === 'seltzer' && <CupSoda className="text-pink-400 mr-2" />}
                  
                  <span className="font-medium">{order.customerName}</span>
                </div>
                
                <div className="text-sm">
                  {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                  {order.modifier && ` (${order.modifier})`}
                </div>
                
                {order.isCompleted && <div className="text-green-400 text-sm mt-1">Completed!</div>}
              </div>
            ))}
            
            {orders.length === 0 && (
              <div className="text-gray-500 p-4 text-center">No orders yet!</div>
            )}
          </div>
        </div>
        
        {/* Pouring Area */}
        <div className="w-2/3 pl-2 flex flex-col items-center">
          <div className="relative mb-4 w-full h-60 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
            {currentPour ? (
              <>
                <div className="text-center">
                  <div className="mb-2">
                    {currentPour.type === 'beer' && <Beer size={48} className="text-amber-400 mx-auto" />}
                    {currentPour.type === 'lemonade' && <CupSoda size={48} className="text-yellow-300 mx-auto" />}
                    {currentPour.type === 'seltzer' && <CupSoda size={48} className="text-pink-400 mx-auto" />}
                  </div>
                  
                  <div className="text-lg">
                    {currentPour.type.charAt(0).toUpperCase() + currentPour.type.slice(1)}
                    {currentPour.modifier && ` (${currentPour.modifier})`}
                  </div>
                  
                  <div className="w-48 h-4 bg-gray-700 rounded-full mt-4 relative overflow-hidden">
                    <div 
                      className="h-full transition-all duration-100 rounded-full"
                      style={{
                        width: `${pourProgress}%`,
                        background: currentPour.type === 'beer' 
                          ? 'linear-gradient(to right, #fbbf24, #d97706)' 
                          : currentPour.type === 'lemonade'
                          ? 'linear-gradient(to right, #fcd34d, #fbbf24)'
                          : 'linear-gradient(to right, #f472b6, #db2777)'
                      }}
                    />
                  </div>
                  
                  <div className="mt-4">
                    {isPouringActive ? (
                      <Button 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={handleStopPour}
                      >
                        Stop Pouring
                      </Button>
                    ) : (
                      <div className="text-gray-300">
                        {currentPour.quality ? `Pour Quality: ${currentPour.quality}%` : 'Click a drink below to start pouring'}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-500">
                Select a drink below to start pouring
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full">
            <Button 
              className="h-20 bg-amber-700 hover:bg-amber-800 flex flex-col items-center justify-center"
              onClick={() => !isPouringActive && handleStartPour('beer')}
              disabled={isPouringActive}
            >
              <Beer size={24} />
              <span className="mt-1">Beer</span>
            </Button>
            
            <div className="space-y-2">
              <Button 
                className="w-full h-5 bg-yellow-600 hover:bg-yellow-700 text-xs"
                onClick={() => !isPouringActive && handleStartPour('lemonade', 'No Ice')}
                disabled={isPouringActive}
              >
                Lemonade (No Ice)
              </Button>
              
              <Button 
                className="w-full h-5 bg-yellow-600 hover:bg-yellow-700 text-xs"
                onClick={() => !isPouringActive && handleStartPour('lemonade', 'Light Ice')}
                disabled={isPouringActive}
              >
                Lemonade (Light Ice)
              </Button>
              
              <Button 
                className="w-full h-5 bg-yellow-600 hover:bg-yellow-700 text-xs"
                onClick={() => !isPouringActive && handleStartPour('lemonade', 'Extra Ice')}
                disabled={isPouringActive}
              >
                Lemonade (Extra Ice)
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full h-5 bg-pink-600 hover:bg-pink-700 text-xs"
                onClick={() => !isPouringActive && handleStartPour('seltzer', 'Cherry')}
                disabled={isPouringActive}
              >
                Cherry Seltzer
              </Button>
              
              <Button 
                className="w-full h-5 bg-pink-600 hover:bg-pink-700 text-xs"
                onClick={() => !isPouringActive && handleStartPour('seltzer', 'Lime')}
                disabled={isPouringActive}
              >
                Lime Seltzer
              </Button>
              
              <Button 
                className="w-full h-5 bg-pink-600 hover:bg-pink-700 text-xs"
                onClick={() => !isPouringActive && handleStartPour('seltzer', 'Berry')}
                disabled={isPouringActive}
              >
                Berry Seltzer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayView;
