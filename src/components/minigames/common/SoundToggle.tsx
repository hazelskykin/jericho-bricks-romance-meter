
import React from 'react';
import { Volume2, VolumeX, Music, MicOff } from 'lucide-react';
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
    try {
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
    } catch (error) {
      console.error('Error initializing SoundToggle component:', error);
      setAudioAvailable(false);
    }
  }, []);
  
  const handleSFXToggle = () => {
    try {
      const newMutedState = soundManager.toggleMute();
      setMuted(newMutedState);
      
      // Try to play feedback sound if unmuting
      if (!newMutedState) {
        setTimeout(() => {
          try {
            soundManager.playSFX('ui-click');
          } catch (error) {
            console.warn('Failed to play feedback sound:', error);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error toggling SFX:', error);
    }
  };
  
  const handleMusicToggle = () => {
    try {
      const newMusicMutedState = soundManager.toggleMusicMute();
      setMusicMuted(newMusicMutedState);
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  };
  
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
            {audioLoadErrors && " (Some sounds failed to load)"}
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
                {musicMuted ? <MicOff className="h-4 w-4" /> : <Music className="h-4 w-4" />}
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

// Named export rather than default export
export default SoundToggle;
