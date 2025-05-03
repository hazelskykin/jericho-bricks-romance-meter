
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const MenuToggleButton: React.FC<MenuToggleButtonProps> = ({ isExpanded, onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full shadow-lg"
          onClick={onClick}
          aria-label="Toggle Menu"
        >
          {isExpanded ? <X /> : <Menu />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Toggle Menu</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default MenuToggleButton;
