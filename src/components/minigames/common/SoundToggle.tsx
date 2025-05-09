
import React from 'react';
import { Volume2, VolumeX, Music, Music2Off } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/soundEffects';
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface SoundToggleProps {
  showMusicToggle?: boolean;
  compact?: boolean;
}

export function SoundToggle({ showMusicToggle = true, compact = false }: SoundToggleProps) {
  const [muted, setMuted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [audioLoadErrors, setAudioLoadErrors] = useState(false);
  
  // Initialize state from sound manager
  useEffect(() => {
    setMuted(soundManager.isMuted());
    setMusicMuted(soundManager.isMusicMuted());
    setAudioAvailable(soundManager.isAudioAvailable());
    
    // Check if there are any audio load errors
    setAudioLoadErrors(soundManager.hasLoadErrors());
    
    // Subscribe to error updates
    const errorListener = () => {
      setAudioLoadErrors(soundManager.hasLoadErrors());
    };
    
    window.addEventListener('sound-error', errorListener);
    
    return () => {
      window.removeEventListener('sound-error', errorListener);
    };
  }, []);
  
  const handleSFXToggle = () => {
    const newMutedState = soundManager.toggleMute();
    setMuted(newMutedState);
    
    // Play feedback sound if unmuting
    if (!newMutedState) {
      setTimeout(() => {
        soundManager.playSFX('ui-click');
      }, 100);
    }
  };
  
  const handleMusicToggle = () => {
    const newMusicMutedState = soundManager.toggleMusicMute();
    setMusicMuted(newMusicMutedState);
  };
  
  // If audio is not available at all, don't show the toggle
  if (!audioAvailable) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full w-8 h-8 ${audioLoadErrors ? 'text-amber-400' : ''}`}
              onClick={handleSFXToggle}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {audioLoadErrors && <span className="absolute top-0 right-0 h-2 w-2 bg-amber-400 rounded-full"></span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {muted ? "Unmute sound effects" : "Mute sound effects"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {showMusicToggle && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8"
                onClick={handleMusicToggle}
              >
                {musicMuted ? <Music2Off className="h-4 w-4" /> : <Music className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {musicMuted ? "Enable music" : "Mute music"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
