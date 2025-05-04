
import React from 'react';
import { motion } from 'framer-motion';
import { Speech } from 'lucide-react';
import { PoemTheme } from './useSpokenWord';

interface ThemeSelectionViewProps {
  themes: PoemTheme[];
  onThemeSelect: (themeId: string) => void;
}

const ThemeSelectionView: React.FC<ThemeSelectionViewProps> = ({ themes, onThemeSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {themes.map(theme => (
        <motion.div
          key={theme.id}
          className="p-4 rounded-lg border cursor-pointer"
          style={{ borderColor: `${theme.color}50`, backgroundColor: `${theme.color}10` }}
          whileHover={{ backgroundColor: `${theme.color}30`, y: -5 }}
          onClick={() => onThemeSelect(theme.id)}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.color }}>
              <Speech size={24} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: theme.color }}>{theme.name}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ThemeSelectionView;
