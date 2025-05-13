
import React from 'react';
import { useGame } from '@/context/GameContext';
import FestivalActivitiesScene from '@/components/FestivalActivitiesScene';

interface FestivalActivity {
  id: string;
  title: string;
  description: string;
  color?: string;
  sceneId: string;
  available: boolean;
}

interface FestivalActivitiesViewProps {
  sceneId: string;
  activities: FestivalActivity[];
  season: string;
}

/**
 * Component to display the festival activities selection UI
 */
const FestivalActivitiesView: React.FC<FestivalActivitiesViewProps> = ({ sceneId, activities, season }) => {
  // Get titles and descriptions based on the season
  const getSeasonalContent = () => {
    switch (season) {
      case 'spring':
        return {
          title: "Spring Blooms & Brooms Festival",
          description: "Choose an activity to participate in during the Spring Festival.",
          completionSceneId: 'spring-festival-completion'
        };
      case 'summer':
        return {
          title: "Summer Songs & Sips Festival",
          description: "Choose an activity to participate in during the Summer Festival.",
          completionSceneId: 'summer-festival-completion'
        };
      case 'autumn':
        return {
          title: "Autumn Handicrafts & Heritage Festival",
          description: "Choose an activity to participate in during the Autumn Festival.",
          completionSceneId: 'autumn-festival-completion'
        };
      case 'winter':
        return {
          title: "Winter Games & Gala Festival",
          description: "Choose an activity to participate in during the Winter Festival.",
          completionSceneId: 'winter-festival-completion'
        };
      default:
        return {
          title: "Festival Activities",
          description: "Choose an activity to participate in during the Festival.",
          completionSceneId: `${season}-festival-completion`
        };
    }
  };

  const { title, description, completionSceneId } = getSeasonalContent();

  return (
    <FestivalActivitiesScene 
      activities={activities}
      title={title} 
      description={description}
      completionSceneId={completionSceneId}
    />
  );
};

export default FestivalActivitiesView;
