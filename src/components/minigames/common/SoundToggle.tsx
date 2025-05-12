
import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/sound';

interface SoundToggleProps {
  showMusicToggle?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ 
  showMusicToggle = false 
}) => {
  // Track separate state for sound FX and music
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  const toggleSound = () => {
    const newMutedState = !isSoundMuted;
    setIsSoundMuted(newMutedState);
    soundManager.setMuted(newMutedState, 'sfx');
    console.log(`Sound effects ${newMutedState ? 'muted' : 'unmuted'}`);
  };
  
  const toggleMusic = () => {
    const newMutedState = !isMusicMuted;
    setIsMusicMuted(newMutedState);
    soundManager.setMuted(newMutedState, 'music');
    console.log(`Music ${newMutedState ? 'muted' : 'unmuted'}`);
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSound}
        className="h-8 w-8 bg-purple-900/20 hover:bg-purple-900/40"
        title={isSoundMuted ? "Unmute sound effects" : "Mute sound effects"}
      >
        {isSoundMuted ? (
          <VolumeX className="h-4 w-4 text-purple-300" />
        ) : (
          <Volume2 className="h-4 w-4 text-purple-300" />
        )}
      </Button>
      
      {showMusicToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          className="h-8 w-8 bg-purple-900/20 hover:bg-purple-900/40"
          title={isMusicMuted ? "Unmute music" : "Mute music"}
        >
          {isMusicMuted ? (
            <Mic className="h-4 w-4 text-purple-300" />
          ) : (
            <Music className="h-4 w-4 text-purple-300" />
          )}
        </Button>
      )}
    </div>
  );
};

export default SoundToggle;
