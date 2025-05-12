
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/sound';

export interface SoundToggleProps {
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Update sound manager
    soundManager.setMuted(newMutedState);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className={className}
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 text-gray-400" />
      ) : (
        <Volume2 className="h-5 w-5 text-purple-400" />
      )}
    </Button>
  );
};

export default SoundToggle;
