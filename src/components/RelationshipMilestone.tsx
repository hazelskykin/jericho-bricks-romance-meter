
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

/**
 * This component has been disabled as requested by the user.
 * No toast notifications will be shown for relationship milestones.
 */
export const showRelationshipMilestone = ({ characterId, milestoneText, level }: RelationshipMilestoneProps) => {
  // All toast notifications have been disabled as requested by the user
  return;
};

export default showRelationshipMilestone;
