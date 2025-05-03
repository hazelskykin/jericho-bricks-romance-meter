
import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import BackgroundScene from './BackgroundScene';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FestivalActivity {
  id: string;
  title: string;
  description: string;
  color: string;
  sceneId: string;
  available: boolean;
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
  
  // Log when component renders to debug navigation
  console.log("FestivalActivitiesScene rendered", {
    activities: activities.map(a => a.id),
    title
  });
  
  // Handle activity selection with logging
  const handleActivitySelect = (activity: FestivalActivity) => {
    if (!activity.available) {
      console.log(`Activity ${activity.id} is not available`);
      return;
    }
    
    console.log(`Selected activity ${activity.id}, navigating to ${activity.sceneId}`);
    handleSceneTransition(activity.sceneId);
  };
  
  // Handle complete festival
  const handleCompleteFestival = () => {
    console.log(`Completing festival, navigating to ${completionSceneId}`);
    handleSceneTransition(completionSceneId);
  };
  
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
                className={`flex flex-col items-center p-6 rounded-lg border transition-all duration-300 ${!activity.available ? 'opacity-75' : ''}`}
                style={{ 
                  borderColor: `${activity.color}50`,
                  backgroundColor: `${activity.color}10`
                }}
                whileHover={activity.available ? { 
                  backgroundColor: `${activity.color}30`,
                  y: -5 
                } : {}}
                onClick={() => handleActivitySelect(activity)}
              >
                <h3 className="font-bold text-xl mb-2" style={{ color: activity.color }}>{activity.title}</h3>
                <p className="text-white/70 text-center">{activity.description}</p>
                {!activity.available && (
                  <div className="mt-3 px-2 py-1 bg-gray-800/70 rounded text-xs text-white/90">
                    Coming Soon
                  </div>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Skip/Complete Festival button */}
          <div className="mt-8 flex justify-center">
            <Button
              className="px-8 py-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold text-lg transition-all duration-300"
              onClick={handleCompleteFestival}
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
