
import React from 'react';
import FestivalActivitiesScene from '../FestivalActivitiesScene';

interface FestivalActivitiesViewProps {
  sceneId: string;
  activities: any[];
  season: string;
}

const FestivalActivitiesView: React.FC<FestivalActivitiesViewProps> = ({ sceneId, activities, season }) => {
  return (
    <FestivalActivitiesScene
      activities={activities}
      title={`${season.charAt(0).toUpperCase() + season.slice(1)} Festival`}
      description={`Choose which activities you'd like to experience during the ${season} festival.`}
      completionSceneId={`${season}-festival-completion`}
    />
  );
};

export default FestivalActivitiesView;
