
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MinigameContainer from '../common/MinigameContainer';
import { Button } from '@/components/ui/button';
import { Camera, Image, Sticker, Heart } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';
import { soundManager } from '@/utils/sound';
import { useMemoriesDateState } from '@/hooks/memoriesDate/useMemoriesDateState';

interface MemoriesDateGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const MemoriesDateGame = ({ onComplete, onExit }: MemoriesDateGameProps) => {
  const { gameState } = useGame();
  const [currentStep, setCurrentStep] = useState<'location' | 'frame' | 'sticker' | 'result' | 'gallery'>('location');
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  
  // Get game state from our custom hook
  const {
    locations,
    frames,
    stickers,
    selectedFrame,
    selectedSticker,
    photos,
    framePosition,
    stickerPosition,
    frameSize,
    selectLocation,
    selectFrame,
    selectSticker,
    moveFrame,
    moveSticker,
    resizeFrame,
    takePhoto,
    resetSelection
  } = useMemoriesDateState(gameState.currentLoveInterest || 'senara');

  // Play background music when the game starts
  useEffect(() => {
    soundManager.playSFX('memoriesDate-loop-gameplay', true);
    return () => soundManager.stopSFX('memoriesDate-loop-gameplay');
  }, []);

  // Proceed to next step in the photo creation process
  const handleNextStep = () => {
    if (currentStep === 'location') {
      setCurrentStep('frame');
      soundManager.playSFX('ui-click');
    } else if (currentStep === 'frame') {
      if (!selectedFrame) {
        toast.error("Please select a frame first!");
        return;
      }
      setCurrentStep('sticker');
      soundManager.playSFX('ui-click');
    } else if (currentStep === 'sticker') {
      if (!selectedSticker) {
        toast.error("Please select a sticker first!");
        return;
      }
      
      // Take the photo
      soundManager.playSFX('memoriesDate-camera-click');
      takePhoto();
      
      // Check if we've taken all 3 photos
      if (currentLocationIndex >= 2) {
        // Show gallery
        setCurrentStep('gallery');
        soundManager.playSFX('memoriesDate-effect-twinkle');
      } else {
        // Move to next location
        setCurrentLocationIndex(prev => prev + 1);
        resetSelection();
        setCurrentStep('location');
      }
    } else if (currentStep === 'gallery') {
      // Complete the minigame
      onComplete(true);
    }
  };

  // Render the current step of the photo creation process
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'location':
        return (
          <div className="flex flex-col items-center">
            <h3 className="text-xl mb-4">Choose your location</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  className={`relative p-1 border-2 ${currentLocationIndex === index ? 'border-[#9b87f5]' : 'border-transparent'}`}
                  onClick={() => {
                    selectLocation(index);
                    playSound('ui-click');
                  }}
                >
                  <img 
                    src={location.src} 
                    alt={location.name} 
                    className="w-32 h-24 object-cover rounded" 
                  />
                  <div className="mt-1 text-center text-sm">{location.name}</div>
                </button>
              ))}
            </div>
            <Button onClick={handleNextStep} className="mt-4">
              Next: Choose Frame <Image className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
        
      case 'frame':
        return (
          <div className="flex flex-col items-center">
            <h3 className="text-xl mb-4">Position your frame</h3>
            <div className="relative w-full max-w-lg h-64 bg-gray-800 overflow-hidden mb-4">
              {/* Background */}
              <img 
                src={locations[currentLocationIndex].src} 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              
              {/* Draggable frame */}
              {selectedFrame && (
                <motion.div
                  className="absolute cursor-move"
                  drag
                  dragMomentum={false}
                  dragConstraints={{ left: 0, right: 320, top: 0, bottom: 180 }}
                  style={{ 
                    x: framePosition.x, 
                    y: framePosition.y,
                    width: `${frameSize}px`,
                    height: `${frameSize * 0.75}px`
                  }}
                  onDrag={(_, info) => moveFrame(info.point.x, info.point.y)}
                >
                  <img 
                    src={selectedFrame.src} 
                    alt="Frame" 
                    className="w-full h-full object-contain" 
                  />
                </motion.div>
              )}
            </div>
            
            {/* Frame selection */}
            <div className="flex gap-4 mb-4">
              {frames.map((frame) => (
                <button
                  key={frame.id}
                  className={`p-1 border-2 ${selectedFrame?.id === frame.id ? 'border-[#9b87f5]' : 'border-transparent'}`}
                  onClick={() => {
                    selectFrame(frame);
                    playSound('memoriesDate-frame-select');
                  }}
                >
                  <img src={frame.src} alt={frame.name} className="w-16 h-12 object-contain" />
                </button>
              ))}
            </div>
            
            {/* Frame size control */}
            <div className="flex items-center gap-4 mb-4">
              <span>Frame Size:</span>
              <input
                type="range"
                min={100}
                max={250}
                value={frameSize}
                onChange={(e) => resizeFrame(parseInt(e.target.value))}
                className="accent-[#9b87f5]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('location')}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Next: Add Sticker <Sticker className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'sticker':
        return (
          <div className="flex flex-col items-center">
            <h3 className="text-xl mb-4">Add a sticker</h3>
            <div className="relative w-full max-w-lg h-64 bg-gray-800 overflow-hidden mb-4">
              {/* Background */}
              <img 
                src={locations[currentLocationIndex].src} 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              
              {/* Frame */}
              {selectedFrame && (
                <div
                  className="absolute"
                  style={{ 
                    left: framePosition.x, 
                    top: framePosition.y,
                    width: `${frameSize}px`,
                    height: `${frameSize * 0.75}px`
                  }}
                >
                  <img 
                    src={selectedFrame.src} 
                    alt="Frame" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}
              
              {/* Draggable sticker */}
              {selectedSticker && (
                <motion.div
                  className="absolute cursor-move z-10"
                  drag
                  dragMomentum={false}
                  dragConstraints={{ 
                    left: framePosition.x, 
                    right: framePosition.x + frameSize, 
                    top: framePosition.y, 
                    bottom: framePosition.y + frameSize * 0.75
                  }}
                  style={{ 
                    x: stickerPosition.x, 
                    y: stickerPosition.y,
                    width: '60px',
                    height: '60px'
                  }}
                  onDrag={(_, info) => moveSticker(info.point.x, info.point.y)}
                >
                  <img 
                    src={selectedSticker.src} 
                    alt="Sticker" 
                    className="w-full h-full object-contain" 
                  />
                </motion.div>
              )}
            </div>
            
            {/* Sticker selection */}
            <div className="flex gap-4 mb-4">
              {stickers.map((sticker) => (
                <button
                  key={sticker.id}
                  className={`p-1 border-2 ${selectedSticker?.id === sticker.id ? 'border-[#9b87f5]' : 'border-transparent'}`}
                  onClick={() => {
                    selectSticker(sticker);
                    playSound('memoriesDate-sticker-select');
                  }}
                >
                  <img src={sticker.src} alt={sticker.name} className="w-12 h-12 object-contain" />
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentStep('frame')}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Take Photo <Camera className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'gallery':
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Your Memory Album</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {photos.map((photo, index) => (
                <div key={index} className="bg-black p-2 rounded shadow-lg">
                  <div className="relative">
                    {/* Background */}
                    <img 
                      src={photo.location.src} 
                      alt={photo.location.name} 
                      className="w-full h-40 object-cover" 
                    />
                    
                    {/* Frame */}
                    <div
                      className="absolute"
                      style={{ 
                        left: photo.framePosition.x, 
                        top: photo.framePosition.y,
                        width: `${photo.frameSize}px`,
                        height: `${photo.frameSize * 0.75}px`
                      }}
                    >
                      <img 
                        src={photo.frame.src} 
                        alt="Frame" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    
                    {/* Chibis */}
                    <div
                      className="absolute"
                      style={{ 
                        left: photo.framePosition.x + photo.frameSize * 0.2, 
                        bottom: photo.framePosition.y + photo.frameSize * 0.05,
                        width: `${photo.frameSize * 0.3}px`,
                        height: `${photo.frameSize * 0.4}px`
                      }}
                    >
                      <img 
                        src={`/assets/characters/maven-chibi.png`}
                        alt="Maven" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    
                    <div
                      className="absolute"
                      style={{ 
                        left: photo.framePosition.x + photo.frameSize * 0.5, 
                        bottom: photo.framePosition.y + photo.frameSize * 0.05,
                        width: `${photo.frameSize * 0.3}px`,
                        height: `${photo.frameSize * 0.4}px`
                      }}
                    >
                      <img 
                        src={`/assets/characters/${photo.loveInterest}-chibi.png`}
                        alt="Love Interest" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    
                    {/* Sticker */}
                    <div
                      className="absolute"
                      style={{ 
                        left: photo.stickerPosition.x, 
                        top: photo.stickerPosition.y,
                        width: '60px',
                        height: '60px'
                      }}
                    >
                      <img 
                        src={photo.sticker.src} 
                        alt="Sticker" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center text-sm">
                    At {photo.location.name}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-6 text-center max-w-md">
              <p className="mb-2">You've created a beautiful memory album with your love interest!</p>
              <p>These photos will be a cherished keepsake of your time together at the festival.</p>
            </div>
            
            <Button 
              onClick={handleNextStep}
              className="px-8 py-2 text-lg"
            >
              Complete <Heart className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <MinigameContainer
      title="Memories Date"
      instructions="Create beautiful photo memories at three locations around the festival. Choose a frame, position it, add a sticker, and take the perfect photo with your love interest."
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center justify-center p-4">
        {renderCurrentStep()}
      </div>
    </MinigameContainer>
  );
};

export default MemoriesDateGame;
