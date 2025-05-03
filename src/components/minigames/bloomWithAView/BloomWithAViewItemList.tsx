
import React from 'react';
import { HiddenItem } from '@/hooks/useBloomWithAViewGame';

interface BloomWithAViewItemListProps {
  items: HiddenItem[];
}

const BloomWithAViewItemList: React.FC<BloomWithAViewItemListProps> = ({ items }) => {
  return (
    <div className="bg-[#1A1F2C]/50 p-4 rounded-lg mb-4 w-full">
      <h3 className="font-medium text-white mb-2">Items to Find:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`text-center p-2 rounded-lg ${item.found ? 'bg-green-800/50 text-white/80' : 'bg-gray-800/50 text-white'}`}
          >
            <span className={item.found ? 'line-through' : ''}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloomWithAViewItemList;
