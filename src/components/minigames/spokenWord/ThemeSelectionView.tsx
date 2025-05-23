
import React from 'react';
import { motion } from 'framer-motion';
import { PoemTheme } from './useSpokenWord';

interface ThemeSelectionViewProps {
  themes: PoemTheme[];
  onThemeSelect: (themeId: string) => void;
}

const ThemeSelectionView: React.FC<ThemeSelectionViewProps> = ({ themes, onThemeSelect }) => {
  // Get theme icon path based on theme id
  const getThemeIconPath = (themeId: string): string => {
    switch(themeId) {
      case 'nature': return '/assets/minigames/summer/spokenWord/theme-icons-nature.png';
      case 'connection': return '/assets/minigames/summer/spokenWord/theme-icons-human.png';
      case 'ambition': return '/assets/minigames/summer/spokenWord/theme-icons-technology.png';
      case 'knowledge': return '/assets/minigames/summer/spokenWord/theme-icons-mysticism.png';
      default: return '/assets/minigames/summer/spokenWord/theme-icons-nature.png';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
      {themes.map(theme => (
        <motion.div
          key={theme.id}
          className="p-4 rounded-lg border cursor-pointer relative overflow-hidden"
          style={{ 
            borderColor: `${theme.color}50`, 
            backgroundColor: `${theme.color}10`,
            boxShadow: `0 4px 6px -1px ${theme.color}20`
          }}
          whileHover={{ 
            backgroundColor: `${theme.color}20`,
            boxShadow: `0 8px 12px -1px ${theme.color}30`,
            y: -5 
          }}
          transition={{ duration: 0.2 }}
          onClick={() => onThemeSelect(theme.id)}
        >
          <div className="flex items-center gap-3">
            <div 
              className="h-12 w-12 rounded-full flex items-center justify-center bg-cover"
              style={{ 
                backgroundImage: `url(${getThemeIconPath(theme.id)})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: `${theme.color}20`
              }}
            >
              {/* Icon is handled by background image */}
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: theme.color }}>
                {theme.name}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ThemeSelectionView;
