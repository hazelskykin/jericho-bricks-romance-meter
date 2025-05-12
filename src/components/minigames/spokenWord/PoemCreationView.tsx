
import React from 'react';
import { motion } from 'framer-motion';
import { PoemTheme, PoemStanza } from './useSpokenWord';

interface PoemCreationViewProps {
  themes: PoemTheme[];
  stanzas: PoemStanza[];
  selectedTheme: string;
  currentStanzaIndex: number;
  selectedOptions: Record<string, string>;
  onOptionSelect: (stanzaId: string, optionId: string) => void;
}

const PoemCreationView: React.FC<PoemCreationViewProps> = ({
  themes,
  stanzas,
  selectedTheme,
  currentStanzaIndex,
  selectedOptions,
  onOptionSelect
}) => {
  const currentTheme = themes.find(t => t.id === selectedTheme);
  const currentStanza = stanzas[currentStanzaIndex];

  if (!currentTheme || !currentStanza) return null;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 text-center">
        <h3 
          className="text-xl font-semibold mb-1" 
          style={{ color: currentTheme?.color }}
        >
          Theme: {currentTheme?.name}
        </h3>
        <div className="flex items-center justify-center gap-1 mb-2">
          {stanzas.map((_, idx) => (
            <div 
              key={`progress-${idx}`} 
              className={`w-3 h-3 rounded-full ${idx === currentStanzaIndex ? 'bg-white' : 'bg-gray-600'} ${idx < currentStanzaIndex ? 'bg-green-500' : ''}`}
              style={idx === currentStanzaIndex ? { backgroundColor: currentTheme?.color } : {}}
            />
          ))}
        </div>
        <p className="text-gray-400">Stanza {currentStanzaIndex + 1} of {stanzas.length}</p>
      </div>
      
      {/* Display current poem so far */}
      {currentStanzaIndex > 0 && (
        <div className="mb-6 p-6 rounded-lg" style={{ 
          backgroundImage: 'url(/assets/minigames/summer/spokenWord/paper-background.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          boxShadow: `0 4px 6px -1px ${currentTheme.color}30`
        }}>
          {stanzas.slice(0, currentStanzaIndex).map((stanza, idx) => {
            const selectedOptionId = selectedOptions[stanza.id];
            const option = stanza.options.find(o => o.id === selectedOptionId);
            return option ? (
              <div key={`stanza-${idx}`} className="mb-3 italic text-gray-800 font-medium">
                {option.text}
              </div>
            ) : null;
          })}
        </div>
      )}
      
      <div className="text-gray-300 mb-4 text-lg font-medium">
        {currentStanza.prompt}
      </div>
      
      <div className="space-y-3">
        {currentStanza.options.map(option => (
          <motion.div
            key={option.id}
            className="p-4 rounded-lg cursor-pointer backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(30, 30, 40, 0.7)',
              border: `1px solid rgba(150, 150, 170, 0.2)`,
            }}
            whileHover={{ 
              backgroundColor: `rgba(${currentTheme.color.substring(1).match(/.{2}/g)?.map(val => parseInt(val, 16)).join(', ')}, 0.2)`,
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOptionSelect(currentStanza.id, option.id)}
          >
            <p className="text-white">{option.text}</p>
            
            {/* Show theme tags */}
            <div className="flex flex-wrap mt-2 gap-1">
              {option.themes.map(themeId => {
                const theme = themes.find(t => t.id === themeId);
                return theme ? (
                  <span 
                    key={`${option.id}-${themeId}`} 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: `${theme.color}30`,
                      color: theme.color
                    }}
                  >
                    {theme.name}
                  </span>
                ) : null;
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PoemCreationView;
