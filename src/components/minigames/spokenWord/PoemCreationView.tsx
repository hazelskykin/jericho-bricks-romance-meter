
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

  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold" style={{ color: currentTheme?.color }}>
          Theme: {themes.find(t => t.id === selectedTheme)?.name}
        </h3>
        <p className="text-gray-400">Stanza {currentStanzaIndex + 1} of {stanzas.length}</p>
      </div>
      
      {/* Display current poem so far */}
      {currentStanzaIndex > 0 && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
          {stanzas.slice(0, currentStanzaIndex).map((stanza, idx) => {
            const selectedOptionId = selectedOptions[stanza.id];
            const option = stanza.options.find(o => o.id === selectedOptionId);
            return option ? (
              <div key={`stanza-${idx}`} className="mb-2 italic text-gray-300">
                {option.text}
              </div>
            ) : null;
          })}
        </div>
      )}
      
      <div className="text-gray-300 mb-3">
        {currentStanza.prompt}
      </div>
      
      <div className="space-y-3">
        {currentStanza.options.map(option => (
          <motion.div
            key={option.id}
            className="p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50"
            whileTap={{ scale: 0.98 }}
            onClick={() => onOptionSelect(currentStanza.id, option.id)}
          >
            {option.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PoemCreationView;
