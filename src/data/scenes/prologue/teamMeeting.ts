
import { Scene } from '../../../types/game';
import initialMeetingScenes from './meetings/initialMeeting';
import briefingScenes from './meetings/briefing';
import coffeeShopScenes from './bonding/coffeeShop';
import studySessionScenes from './bonding/studySession';
import rdTourScenes from './bonding/rdTour';

// Combine all team meeting related scenes
const teamMeetingScenes: Record<string, Scene> = {
  ...initialMeetingScenes,
  ...briefingScenes,
  ...coffeeShopScenes,
  ...studySessionScenes,
  ...rdTourScenes
};

export default teamMeetingScenes;
