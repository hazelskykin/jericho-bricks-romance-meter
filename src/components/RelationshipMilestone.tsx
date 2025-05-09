
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CharacterId } from '@/types/game';
import characters, { maven } from '@/data/characters';
import characterChibis from '@/data/characterChibis';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RelationshipMilestoneProps {
  characterId: CharacterId;
  milestoneText: string;
  level: string;
}

export const showRelationshipMilestone = ({ characterId, milestoneText, level }: RelationshipMilestoneProps) => {
  
  return;
};

export default showRelationshipMilestone;
