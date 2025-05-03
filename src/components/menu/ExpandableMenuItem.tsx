
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExpandableMenuItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  tooltipText: string;
}

const ExpandableMenuItem: React.FC<ExpandableMenuItemProps> = ({
  label,
  icon,
  onClick,
  active = false,
  tooltipText,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          className="shadow-md w-full justify-start" 
          size="sm" 
          variant={active ? 'default' : 'outline'} 
          onClick={onClick}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ExpandableMenuItem;
