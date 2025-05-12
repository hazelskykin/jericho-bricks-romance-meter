
import { Scene } from '@/types/game';

//scene ID winter-festival-activities is the landing page where the intro scenes for the winter minigames are; winter-intro transitions there and the end of minigames also transitions back to it

const winterActivityScenes: Record<string, Scene> = {
  // Charity Auction activity
  'winter-charity-auction-intro': {
    id: 'winter-charity-auction-intro',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "The Winter Gala's charity auction is one of the most anticipated events of the season. Luxury items and experiences are available to the highest bidders, with all proceeds going to local charities.",
      },
    ],
    nextSceneId: 'winter-charity-auction-start'
  },
  'winter-charity-auction-complete': {
    id: 'winter-charity-auction-complete',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "The charity auction concludes with impressive results. The funds raised will support several local initiatives throughout the coming year.",
      },
      {
        character: 'navarre',
        text: "That was fantastic! Did you see how much the historical city tour package went for?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "The whole event was a huge success. I'm glad we could be part of it.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Events like this remind me why I love what I do. Connecting people, creating experiences... it matters.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  },
  
  // Gala Dance activity
  'winter-gala-dance-intro': {
    id: 'winter-gala-dance-intro',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "The grand ballroom is beautifully decorated for the Winter Gala. Crystal chandeliers sparkle overhead as couples take to the floor for the traditional winter waltz.",
      },
      {
        character: 'narrator',
        text: "You look around to see if someone special might be available to enjoy this moment with you.",
      },
      {
        character: 'narrator',
        text: "You hear a voice ask, 'may I have this dance?'",
      },
      {
        character: 'maven',
        text: "Yes, please.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-gala-dance-start'
  },
  'winter-gala-dance-complete': {
    id: 'winter-gala-dance-complete',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "As the music fades, the two of you gradually stop dancing, but remain close together in the center of the ballroom.",
      },
      {
        character: 'maven',
        text: "That was... wonderful. Thank you.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-festival-activities'
  },
  
  // Looking for Signs activity
  'winter-looking-signs-intro': {
    id: 'winter-looking-signs-intro',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "A unique Winter Games & Gala tradition involves couples walking through the snow-covered Stonewich Gardens, looking for 'signs' that predict their future together.",
      },
      {
        character: 'maven',
        text: "I wonder if we should give it a try?",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'winter-looking-signs-start'
  },
  'winter-looking-signs-complete': {
    id: 'winter-looking-signs-complete',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "Your walk through the winter gardens comes to an end as you reach a small frozen pond, its surface reflecting the starlight above.", 
      },
    ],
    nextSceneId: 'winter-festival-activities'
  }
};
//when winter-festival-activities are complete or skipped, the scene should transition to winter-festivities-completion
export default winterActivityScenes;
