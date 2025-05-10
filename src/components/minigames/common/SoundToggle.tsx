
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundToggle = () => {
  const [muted, setMuted] = useState(false);
  
  const toggleMute = () => {
    setMuted(!muted);
    // In a real implementation, this would connect to the sound system
    console.log(`Sound is now ${!muted ? 'muted' : 'unmuted'}`);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={toggleMute}
      className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </Button>
  );
};
