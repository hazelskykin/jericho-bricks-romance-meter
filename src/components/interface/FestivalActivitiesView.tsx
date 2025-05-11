
// Import necessary packages and components - don't change this section
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGame } from '@/context/GameContext';
import GameBackgroundScene from '../game/GameBackgroundScene';
import { toast } from 'sonner';

interface FestivalActivity {
  id: string;
  title: string;
  description: string;
  color: string;
  sceneId: string;
  available?: boolean;
}

interface FestivalActivitiesViewProps {
  sceneId: string;
  activities: FestivalActivity[];
  season: string;
}

const FestivalActivitiesView: React.FC<FestivalActivitiesViewProps> = ({
  sceneId,
  activities,
  season,
}) => {
  const { handleSceneTransition, gameState } = useGame();
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [allCompleted, setAllCompleted] = useState(false);
  // Add a state to prevent auto-selection
  const [skipClicked, setSkipClicked] = useState(false);

  // Check if all activities are completed
  useEffect(() => {
    // Only consider available activities
    const availableActivities = activities.filter(
      activity => activity.available !== false
    );
    
    if (
      availableActivities.length > 0 &&
      availableActivities.every(activity => completedActivities.has(activity.id))
    ) {
      setAllCompleted(true);
    }
  }, [activities, completedActivities]);

  // Handle activity selection
  const handleActivitySelect = (activity: FestivalActivity) => {
    // Mark this activity as completed
    const newCompleted = new Set(completedActivities);
    newCompleted.add(activity.id);
    setCompletedActivities(newCompleted);

    // Proceed to the activity scene
    handleSceneTransition(activity.sceneId);
  };

  // Continue after all activities are completed
  const handleContinue = () => {
    console.log(`All activities explored, continuing to: ${season}-festival-completion`);
    handleSceneTransition(`${season}-festival-completion`);
  };
  
  // Handle skip button click
  const handleSkipFestival = () => {
    // Set skipClicked to true first to prevent auto-selection
    setSkipClicked(true);
    console.log(`Skipping festival activities for ${season}`);
    toast.info(`Skipping ${season} festival activities`);
    
    // Small delay to ensure the skip flag is set before navigation
    setTimeout(() => {
      handleSceneTransition(`${season}-festival-completion`);
    }, 50);
  };

  // Handle background click (no action needed, just preventing errors)
  const handleBackgroundClick = () => {
    // No action needed for background clicks in this view
  };

  // Get appropriate background for the season
  const getSeasonBackground = () => {
    switch (season) {
      case 'spring':
        return 'stonewich-cityscape';
      case 'summer':
        return 'stonewich-cityscape';
      case 'autumn':
        return 'stonewich-cityscape';
      case 'winter':
        return 'stonewich-cityscape';
      default:
        return 'stonewich-cityscape';
    }
  };

  // For winter season with current love interest, we can automatically route to the appropriate activity
  useEffect(() => {
    // Don't auto-select if skip was clicked
    if (skipClicked) return;
    
    if (season === 'winter' && gameState.currentLoveInterest) {
      // Give a slight delay to allow the component to render first
      const timer = setTimeout(() => {
        // In winter with a love interest, auto-select a romance activity
        const romanceActivity = activities.find(a => 
          (a.id === 'gala-dance' || a.id === 'looking-signs') && a.available !== false
        );
        
        if (romanceActivity) {
          console.log(`Auto-selecting romance activity for winter: ${romanceActivity.id}`);
          handleActivitySelect(romanceActivity);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [season, gameState.currentLoveInterest, activities, skipClicked]);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <GameBackgroundScene 
        backgroundId={getSeasonBackground()} 
        onBackgroundClick={handleBackgroundClick} 
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
        <div className="max-w-4xl w-full bg-black/80 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {season.charAt(0).toUpperCase() + season.slice(1)} Festival Activities
          </h1>
          
          <p className="mb-6 text-center">
            Choose an activity to participate in during the festival:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {activities.map((activity) => (
              <Card
                key={activity.id}
                className="bg-gray-800 border-2 hover:border-purple-500 transition-all"
                style={{
                  borderColor: completedActivities.has(activity.id)
                    ? 'rgba(255,255,255,0.2)'
                    : activity.color,
                  opacity: activity.available === false ? 0.6 : 1
                }}
              >
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-2">{activity.title}</h2>
                  <p className="text-sm text-gray-300 mb-4">{activity.description}</p>
                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: activity.color,
                      opacity: completedActivities.has(activity.id) ? 0.6 : 1,
                    }}
                    disabled={
                      activity.available === false ||
                      completedActivities.has(activity.id)
                    }
                    onClick={() => handleActivitySelect(activity)}
                  >
                    {completedActivities.has(activity.id)
                      ? 'Completed'
                      : activity.available === false
                      ? 'Not Available'
                      : 'Select'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            {/* Skip button that's always visible */}
            <Button
              variant="outline"
              className="border-[#9b87f5] hover:bg-[#9b87f5]/10 text-white"
              onClick={handleSkipFestival}
            >
              Skip Festival Activities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalActivitiesView;
