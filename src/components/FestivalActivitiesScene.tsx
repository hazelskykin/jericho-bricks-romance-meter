
import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import BackgroundScene from './BackgroundScene';
import { Button } from './ui/button';

interface FestivalActivity {
  id: string;
  title: string;
  description: string;
  color: string;
  sceneId: string;
}

interface FestivalActivitiesProps {
  activities: FestivalActivity[];
  title: string;
  description: string;
  completionSceneId: string;
}

const FestivalActivitiesScene: React.FC<FestivalActivitiesProps> = ({
  activities,
  title,
  description,
  completionSceneId
}) => {
  const { handleSceneTransition } = useGame();
  
  return (
    <>
      <BackgroundScene backgroundId="stonewich-cityscape" />
      
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4 z-30">
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 max-w-4xl w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
          <p className="text-lg text-white/80 mb-8">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {activities.map(activity => (
              <motion.button
                key={activity.id}
                className="flex flex-col items-center p-6 rounded-lg border transition-all duration-300"
                style={{ 
                  borderColor: `${activity.color}50`,
                  backgroundColor: `${activity.color}10`
                }}
                whileHover={{ 
                  backgroundColor: `${activity.color}30`,
                  y: -5 
                }}
                onClick={() => handleSceneTransition(activity.sceneId)}
              >
                <h3 className="font-bold text-xl mb-2" style={{ color: activity.color }}>{activity.title}</h3>
                <p className="text-white/70 text-center">{activity.description}</p>
              </motion.button>
            ))}
          </div>
          
          {/* Skip/Complete Festival button */}
          <div className="mt-8 flex justify-center">
            <Button
              className="px-8 py-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold text-lg transition-all duration-300"
              onClick={() => handleSceneTransition(completionSceneId)}
            >
              Complete Festival
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FestivalActivitiesScene;
