import { Scene } from '@/types/game';

const festivalActivities: Record<string, Scene> = {
  'autumn-festival-activities': {
    id: 'autumn-festival-activities',
    background: 'autumn-cityoverlook',
    description: "Choose an autumn festival activity to explore.",
    type: 'festival-activities',
    // This is a special scene that will be handled by the FestivalActivitiesView component
  }
};

export default festivalActivities;
