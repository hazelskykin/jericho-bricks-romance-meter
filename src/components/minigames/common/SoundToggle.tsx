
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/utils/soundEffects';
import { useState, useEffect } from 'react';

export function SoundToggle() {
  const [muted, setMuted] = useState(false);
  
  // Initialize state from sound manager
  useEffect(() => {
    setMuted(soundManager.isMuted());
  }, []);
  
  const handleToggle = () => {
    const newMutedState = soundManager.toggleMute();
    setMuted(newMutedState);
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-8 h-8"
      onClick={handleToggle}
      title={muted ? "Unmute sound effects" : "Mute sound effects"}
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  );
}
