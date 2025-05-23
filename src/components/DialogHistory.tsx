
import React from 'react';
import { useGame } from '@/context/GameContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogueLine } from '@/types/game';
import { allScenes } from '@/data/scenes';

interface DialogHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReplayScene: () => void;
  dialogHistory?: DialogueLine[];
  onClose?: () => void;
}

const DialogHistory: React.FC<DialogHistoryProps> = ({ 
  open, 
  onOpenChange,
  onReplayScene,
  dialogHistory: externalDialogHistory,
  onClose
}) => {
  const { gameState } = useGame();
  
  // Use external dialogHistory if provided, otherwise use from current scene
  const dialogHistory = externalDialogHistory || 
    (gameState?.currentScene && gameState?.dialogueIndex !== undefined ? 
      allScenes[gameState.currentScene]?.dialogue?.slice(0, gameState.dialogueIndex + 1) || [] : 
      []);
  
  const handleClose = () => {
    if (onClose) onClose();
    onOpenChange(false);
  };

  const handleReplay = () => {
    onReplayScene();
    onOpenChange(false); // Close the dialog after starting replay
  };

  const getCharacterName = (characterId?: string) => {
    if (!characterId || characterId === 'narrator') return 'Narrator';
    const character = gameState?.characters[characterId];
    return character?.name || characterId;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#1A1F2C] text-white border-[#9b87f5]">
        <DialogHeader>
          <DialogTitle className="text-[#9b87f5]">Dialog History</DialogTitle>
          <DialogDescription className="text-white/70">
            Review the current scene's dialogue.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[300px] rounded-md border border-[#9b87f5]/20 p-4">
          {dialogHistory && dialogHistory.length > 0 ? (
            dialogHistory.map((line, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-[#9b87f5]">
                  {getCharacterName(line.character)}:
                </p>
                <p className="text-white/90 pl-2">{line.text}</p>
              </div>
            ))
          ) : (
            <p className="text-white/50 italic">No dialogue in this scene.</p>
          )}
        </ScrollArea>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-[#9b87f5]/30 text-white hover:bg-[#9b87f5]/20"
          >
            Close
          </Button>
          <Button 
            onClick={handleReplay}
            className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
          >
            Replay Scene
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogHistory;
