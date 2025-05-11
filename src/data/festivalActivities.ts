
import { GameState } from '@/types/game';

interface FestivalActivity {
  id: string;
  title: string;
  description: string;
  color: string;
  sceneId: string;
  available?: boolean;
}

export const getFestivalActivities = (gameState: GameState): Record<string, FestivalActivity[]> => {
  return {
    'spring-festival-activities': [
      { id: 'brooms-away', title: 'Brooms Away!', description: 'Help coordinate the cleanup efforts with the automated drones', color: '#4CC2FF', sceneId: 'spring-brooms-away-intro' },
      { id: 'mud-fling', title: 'Mud Fling', description: 'Participate in the playful mud fling competition at the festival', color: '#FFB347', sceneId: 'spring-mud-fling-intro' },
      { id: 'bloom-view', title: 'Bloom with a View', description: 'Assist residents with planting flowers and creating garden displays', color: '#9C89FF', sceneId: 'spring-bloom-view-intro' }
    ],
    'summer-festival-activities': [
      { id: 'serenade', title: 'Serenade', description: 'Experience the interactive rhythm game at the music stages', color: '#4CC2FF', sceneId: 'summer-serenade-intro' },
      { id: 'spoken-word', title: 'Spoken Word', description: 'Participate in the poetry competition by crafting your own verses', color: '#9C89FF', sceneId: 'summer-spoken-word-intro' },
      { id: 'whats-on-tap', title: "What's On-Tap?", description: 'Work the beer tent and serve drinks to festival attendees', color: '#FFB347', sceneId: 'summer-whats-on-tap-intro' }
    ],
    'autumn-festival-activities': [
      { id: 'tour-guide', title: 'Tour Guide', description: 'Match up tour itineraries with guests', color: '#FF5E5B', sceneId: 'autumn-tour-guide-intro' },
      { id: 'crafter', title: 'Crafter', description: 'Create a custom item at the DIY crafting booth', color: '#9C89FF', sceneId: 'autumn-crafter-intro' },
      { id: 'memories-date', title: 'Making Memories Date', description: 'Go on a sightseeing date with someone special', color: '#0D98BA', sceneId: 'autumn-memories-date-intro', available: gameState.currentLoveInterest !== undefined }
    ],
    'winter-festival-activities': [
      { id: 'charity-auction', title: 'Charity Auction', description: 'Bid on items in the silent auction', color: '#FFB347', sceneId: 'winter-charity-auction-intro' },
      { id: 'gala-dance', title: 'Gala Dance', description: 'Dance with someone special at the gala', color: '#4CC2FF', sceneId: 'winter-gala-dance-intro', available: gameState.currentLoveInterest !== undefined },
      { id: 'looking-signs', title: 'Looking for Signs', description: 'Take a walk to search for signs of love', color: '#9C89FF', sceneId: 'winter-looking-signs-intro', available: gameState.currentLoveInterest !== undefined }
    ]
  };
};
