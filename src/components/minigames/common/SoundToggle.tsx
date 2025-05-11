
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music, MicOff } from 'lucide-react';
import { soundManager } from '@/utils/soundEffects';

interface SoundToggleProps {
  showMusicToggle?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ showMusicToggle = false }) => {
  const [muted, setMuted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    // Connect to the sound system
    soundManager.setMuted(newMuted);
    console.log(`Sound effects are now ${newMuted ? 'muted' : 'unmuted'}`);
  };
  
  const toggleMusic = () => {
    const newMusicMuted = !musicMuted;
    setMusicMuted(newMusicMuted);
    // Connect to the sound system
    soundManager.setMusicMuted(newMusicMuted);
    console.log(`Music is now ${newMusicMuted ? 'muted' : 'unmuted'}`);
  };
  
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={toggleMute}
        className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
      
      {showMusicToggle && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleMusic}
          className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
        >
          {musicMuted ? <MicOff size={16} /> : <Music size={16} />}
        </Button>
      )}
    </div>
  );
};
