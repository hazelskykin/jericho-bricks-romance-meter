
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Lock } from 'lucide-react';
import { useGame } from '@/context/GameContext';

interface GlossaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GlossaryTerm {
  id: string;
  term: string;
  description: string;
  color: string;
  unlocked: boolean;
}

const Glossary: React.FC<GlossaryProps> = ({ open, onOpenChange }) => {
  // Try to access GameContext, but don't break if it's not available
  let isVersaUnlocked = false;
  try {
    const { gameState } = useGame();
    isVersaUnlocked = gameState.hasCompletedGame;
  } catch (e) {
    // If we're not within a GameProvider, we'll default to false
    isVersaUnlocked = false;
  }
  
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: "gnarus",
      term: "GNARUS",
      description: "One who specializes in knowledge acquisition, curation and insights",
      color: "text-blue-300",
      unlocked: true
    },
    {
      id: "solvitor",
      term: "SOLVITOR",
      description: "One who specializes in design, build and performance optimization",
      color: "text-blue-300",
      unlocked: true
    },
    {
      id: "diva",
      term: "DIVA",
      description: "One who plans, mobilizes and acts to transform vision to reality",
      color: "text-blue-300",
      unlocked: true
    },
    {
      id: "bellfox",
      term: "BELLFOX",
      description: "One who achieves unity through empathy, influence and harmony",
      color: "text-blue-300",
      unlocked: true
    },
    {
      id: "versa",
      term: "VERSA",
      description: "One who has completed the journey",
      color: "text-blue-300",
      unlocked: isVersaUnlocked
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-primary/30 text-white max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary text-glow-sm">Glossary</DialogTitle>
          <DialogDescription className="text-white/70">
            Terms and concepts from the world of Jericho Bricks
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6 pb-4">
            {glossaryTerms.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center">
                  <h3 className={`text-lg font-medium ${item.color}`}>
                    {item.term}
                  </h3>
                  {!item.unlocked && (
                    <Lock className="ml-2 h-4 w-4 text-gray-500" />
                  )}
                </div>
                
                {item.unlocked ? (
                  <p className="text-white/80">{item.description}</p>
                ) : (
                  <p className="text-white/50 italic">Locked - Complete the game to unlock</p>
                )}
                <Separator className="bg-white/10 mt-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Glossary;
