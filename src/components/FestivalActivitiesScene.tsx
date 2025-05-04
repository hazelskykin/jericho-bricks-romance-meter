
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface FestivalActivity {
  id: string;
  title: string;
  description: string;
  color?: string;
  sceneId: string;
  available: boolean;
}

interface FestivalActivitiesSceneProps {
  activities: FestivalActivity[];
  title: string;
  description: string;
  completionSceneId: string;
}

const FestivalActivitiesScene: React.FC<FestivalActivitiesSceneProps> = ({ 
  activities, 
  title, 
  description,
  completionSceneId
}) => {
  const { handleSceneTransition } = useGame();
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  
  const handleActivitySelected = (activity: FestivalActivity) => {
    console.log(`Activity selected: ${activity.title}, navigating to scene: ${activity.sceneId}`);
    // Navigate to the selected activity scene
    handleSceneTransition(activity.sceneId);
    
    // Mark this activity as completed
    if (!completedActivities.includes(activity.id)) {
      setCompletedActivities([...completedActivities, activity.id]);
    }
  };
  
  const handleContinue = () => {
    console.log(`All activities explored, continuing to: ${completionSceneId}`);
    handleSceneTransition(completionSceneId);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/90">
      <div className="bg-black/80 text-white rounded-lg w-full max-w-4xl p-6 backdrop-blur">
        <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
        <p className="text-lg mb-8 text-center">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: 'rgba(20, 20, 30, 0.8)',
                  borderColor: completedActivities.includes(activity.id) 
                    ? '#45dc7f' 
                    : activity.color || '#9b87f5'
                }}
              >
                <div 
                  className="p-4 flex-1 flex flex-col"
                  style={{
                    borderLeft: `4px solid ${activity.color || '#9b87f5'}`
                  }}
                >
                  <h3 className="text-xl font-medium mb-2">{activity.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{activity.description}</p>
                  <div className="mt-auto flex justify-end">
                    <Button
                      onClick={() => handleActivitySelected(activity)}
                      className="text-sm border-none"
                      style={{ 
                        backgroundColor: activity.color || '#9b87f5',
                        color: '#000'
                      }}
                    >
                      {completedActivities.includes(activity.id) ? 'Try Again' : 'Start Activity'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="text-lg px-8 py-2 bg-purple-600 hover:bg-purple-700"
          >
            {completedActivities.length === 0 ? 'Skip Activities' : 
              completedActivities.length === activities.length ? 'Continue' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FestivalActivitiesScene;
