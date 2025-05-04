
import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { SongOption } from './useSerenade';

interface SongSelectionViewProps {
  songs: SongOption[];
  onSongSelect: (song: SongOption) => void;
}

const SongSelectionView: React.FC<SongSelectionViewProps> = ({ songs, onSongSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {songs.map(song => (
        <motion.div
          key={song.id}
          className="p-4 rounded-lg border cursor-pointer"
          style={{ borderColor: `${song.color}50`, backgroundColor: `${song.color}10` }}
          whileHover={{ backgroundColor: `${song.color}30`, y: -5 }}
          onClick={() => onSongSelect(song)}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: song.color }}>
              <Music size={24} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: song.color }}>{song.title}</h3>
              <p className="text-gray-300">{song.artist}</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-400">{song.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SongSelectionView;
