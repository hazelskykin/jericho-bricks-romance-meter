
import React, { useState } from 'react';
import { Volume2, VolumeX, Music, MusicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/sound';

export interface SoundToggleProps {
  className?: string;
  showMusicToggle?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className, showMusicToggle = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  const toggleSound = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Update sound manager
    soundManager.setMuted(newMutedState);
  };

  const toggleMusic = () => {
    const newMusicMutedState = !isMusicMuted;
    setIsMusicMuted(newMusicMutedState);
    
    // Update music in sound manager
    soundManager.setMusicMuted(newMusicMutedState);
  };

  return (
    <div className={`flex items-center ${className || ''}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSound}
        className="mr-2"
        title={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-gray-400" />
        ) : (
          <Volume2 className="h-5 w-5 text-purple-400" />
        )}
      </Button>
      
      {showMusicToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          title={isMusicMuted ? "Unmute music" : "Mute music"}
        >
          {isMusicMuted ? (
            <MusicOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Music className="h-5 w-5 text-purple-400" />
          )}
        </Button>
      )}
    </div>
  );
};

export default SoundToggle;
