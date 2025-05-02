
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Lock } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

type GlossaryCategory = 'people' | 'places' | 'concepts';

const Glossary: React.FC<GlossaryProps> = ({ open, onOpenChange }) => {
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory>('concepts');
  
  // Try to access GameContext, but don't break if it's not available
  let isVersaUnlocked = false;
  try {
    const { gameState } = useGame();
    isVersaUnlocked = gameState.hasCompletedGame;
  } catch (e) {
    // If we're not within a GameProvider, we'll default to false
    isVersaUnlocked = false;
  }
  
  const glossaryTerms: Record<GlossaryCategory, GlossaryTerm[]> = {
    concepts: [
      {
        id: "gnarus",
        term: "GNARUS",
        description: "One who specializes in knowledge acquisition, curation and insights.",
        color: "text-blue-300",
        unlocked: true
      },
      {
        id: "solvitor",
        term: "SOLVITOR",
        description: "One who specializes in design, build and performance optimization.",
        color: "text-blue-300",
        unlocked: true
      },
      {
        id: "diva",
        term: "DIVA",
        description: "One who plans, mobilizes and acts to transform vision to reality.",
        color: "text-blue-300",
        unlocked: true
      },
      {
        id: "bellfox",
        term: "BELLFOX",
        description: "One who achieves unity through empathy, influence and harmony.",
        color: "text-blue-300",
        unlocked: true
      },
      {
        id: "versa",
        term: "VERSA",
        description: "One who has completed the journey and can adapt to fill any role as needed.",
        color: "text-purple-300",
        unlocked: isVersaUnlocked
      }
    ],
    people: [
      {
        id: "maven",
        term: "Maven",
        description: "The protagonist. Uncertain of her strengths, dealing with imposter syndrome but highly adaptive and perceptive.",
        color: "text-teal-300",
        unlocked: true
      },
      {
        id: "xavier",
        term: "Xavier",
        description: "The emotional and technological bedrock of the team. Supportive, tech-savvy, and empathetic Solvitor.",
        color: "text-blue-300",
        unlocked: true
      },
      {
        id: "navarre",
        term: "Navarre",
        description: "A natural networker with a flirtatious and persuasive style. Charismatic, persuasive, and gregarious Bellfox.",
        color: "text-orange-300",
        unlocked: true
      },
      {
        id: "etta",
        term: "Etta",
        description: "Confident to the point of arrogance, with a narrow focus on goals. Ambitious, assertive, and results-oriented Diva.",
        color: "text-red-300",
        unlocked: true
      },
      {
        id: "senara",
        term: "Senara",
        description: "The enigmatic intellectual, standoffish but trusted for integrity. Intellectual, analytical, and reserved Gnarus.",
        color: "text-purple-300",
        unlocked: true
      },
      {
        id: "dr-voss",
        term: "Dr. Voss",
        description: "Key contact for the team at Cybaton HQ. Experienced mentor and supervisor for the trainee program.",
        color: "text-gray-300",
        unlocked: true
      }
    ],
    places: [
      {
        id: "cybaton-hq",
        term: "Cybaton HQ",
        description: "The headquarters of Cybaton, the mega corporation with a monopoly on city management systems. Base of operations for the trainee program.",
        color: "text-cyan-300",
        unlocked: true
      },
      {
        id: "stonewich",
        term: "Stonewich",
        description: "A bustling trade center with a proud history. A native haven where trusted technology fulfills everyday public functions under Cybaton's management.",
        color: "text-green-300",
        unlocked: true
      }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2045] border border-primary/30 text-white max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary text-glow-sm">Glossary</DialogTitle>
          <DialogDescription className="text-white/70">
            Terms and concepts from the world of Jericho Bricks
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as GlossaryCategory)}>
          <TabsList className="grid grid-cols-3 w-full bg-[#1A1F2C]/50">
            <TabsTrigger value="concepts" className="data-[state=active]:bg-primary/20">Concepts</TabsTrigger>
            <TabsTrigger value="people" className="data-[state=active]:bg-primary/20">People</TabsTrigger>
            <TabsTrigger value="places" className="data-[state=active]:bg-primary/20">Places</TabsTrigger>
          </TabsList>
          
          {Object.entries(glossaryTerms).map(([category, terms]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <ScrollArea className="h-[45vh] pr-4">
                <div className="space-y-6 pb-4">
                  {terms.map((item) => (
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
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Glossary;
