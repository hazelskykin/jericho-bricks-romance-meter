
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music, Volume } from 'lucide-react';
import { soundManager } from '@/utils/soundEffects';

interface SoundToggleProps {
  showMusicToggle?: boolean;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ 
  showMusicToggle = true,
  className = '',
  size = 'sm'
}) => {
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
    <div className={`flex gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size={size}
        onClick={toggleMute}
        className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
        title={muted ? "Unmute sound effects" : "Mute sound effects"}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
      
      {showMusicToggle && (
        <Button 
          variant="outline" 
          size={size}
          onClick={toggleMusic}
          className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
          title={musicMuted ? "Unmute music" : "Mute music"}
        >
          {musicMuted ? <VolumeX size={16} /> : <Music size={16} />}
        </Button>
      )}
    </div>
  );
};

export default SoundToggle;
