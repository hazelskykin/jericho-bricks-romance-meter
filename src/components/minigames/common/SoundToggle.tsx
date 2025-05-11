
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music, MusicOff } from 'lucide-react';

interface SoundToggleProps {
  showMusicToggle?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ showMusicToggle = false }) => {
  const [muted, setMuted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  
  const toggleMute = () => {
    setMuted(!muted);
    // In a real implementation, this would connect to the sound system
    console.log(`Sound effects are now ${!muted ? 'muted' : 'unmuted'}`);
  };
  
  const toggleMusic = () => {
    setMusicMuted(!musicMuted);
    // In a real implementation, this would connect to the music system
    console.log(`Music is now ${!musicMuted ? 'muted' : 'unmuted'}`);
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
          {musicMuted ? <MusicOff size={16} /> : <Music size={16} />}
        </Button>
      )}
    </div>
  );
};
