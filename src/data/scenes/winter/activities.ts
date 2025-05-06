
import { Scene } from '@/types/game';

//scene ID winter-festival-activities is the landing page where the intro scenes for the winter minigames are; winter-intro transitions there and the end of minigames also transitions back to it

const winterActivityScenes: Record<string, Scene> = {
  // Charity Auction activity
  'winter-charity-auction-intro': {
    id: 'winter-charity-auction-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Winter Gala's charity auction is one of the most anticipated events of the season. Luxury items and experiences are available to the highest bidders, with all proceeds going to local charities.",
      },
      {
        character: 'navarre',
        text: "The auction is about to start. I've been helping curate some of the items - there's some incredible stuff up for grabs.",
        mood: 'excited',
      },
      {
        character: 'maven',
        text: "It looks like quite a high-end event. I'm not sure I can afford anything here.",
        mood: 'concerned',
      },
      {
        character: 'navarre',
        text: "Don't worry about that. The experience is what matters. Besides, I've arranged a special item that I think you'll be interested in.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-charity-auction-start'
  },
  'winter-charity-auction-complete': {
    id: 'winter-charity-auction-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The charity auction concludes with impressive results. The funds raised will support several local initiatives throughout the coming year.",
      },
      {
        character: 'navarre',
        text: "That was fantastic! Did you see how much the historical city tour package went for?",
        mood: 'excited',
      },
      {
        character: 'maven',
        text: "The whole event was a huge success. I'm glad we could be part of it.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Events like this remind me why I love what I do. Connecting people, creating experiences... it matters.",
        mood: 'sincere',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  },
  
  // Gala Dance activity
  'winter-gala-dance-intro': {
    id: 'winter-gala-dance-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The grand ballroom is beautifully decorated for the Winter Gala. Crystal chandeliers sparkle overhead as couples take to the floor for the traditional winter waltz.",
      },
      {
        character: 'xavier',
        text: "I've been looking forward to this all evening. Would you care to dance?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I have to admit, I'm not the most graceful dancer.",
        mood: 'embarrassed',
      },
      {
        character: 'xavier',
        text: "Don't worry about that. It's all about enjoying the moment. Just follow my lead.",
        mood: 'sincere',
      },
    ],
    nextSceneId: 'winter-gala-dance-start'
  },
  'winter-gala-dance-complete': {
    id: 'winter-gala-dance-complete',
    background: 'stonewich-cityscape',
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
      {
        character: 'xavier',
        text: "Thank you for trusting me to lead. You know, I used to be terrified of dancing in public.",
        mood: 'reflective',
      },
      {
        character: 'maven',
        text: "Really? I wouldn't have guessed.",
        mood: 'surprised',
      },
      {
        character: 'xavier',
        text: "It's amazing how the right partner can change everything.",
        mood: 'sincere',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  },
  
  // Looking for Signs activity
  'winter-looking-signs-intro': {
    id: 'winter-looking-signs-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "A unique Winter Games & Gala tradition involves couples walking through the snow-covered Stonewich Gardens, looking for 'signs' that predict their future together.",
      },
      {
        character: 'senara',
        text: "This tradition dates back centuries. People believe that certain natural patterns in the winter landscape can reveal truths about relationships.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "Do you believe in that kind of thing?",
        mood: 'curious',
      },
      {
        character: 'senara',
        text: "I believe in observing closely and finding meaning in what others might overlook. Whether that's mystical or simply mindful attention, does it matter?",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "Would you like to walk the garden path with me? We could look for signs together.",
        mood: 'vulnerable',
      }
    ],
    nextSceneId: 'winter-looking-signs-start'
  },
  'winter-looking-signs-complete': {
    id: 'winter-looking-signs-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Your walk through the winter gardens comes to an end as you reach a small frozen pond, its surface reflecting the starlight above.",
      },
      {
        character: 'senara',
        text: "Look at that. The way the stars reflect on the ice - it's like two worlds meeting.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "What kind of sign is that supposed to be?",
        mood: 'curious',
      },
      {
        character: 'senara',
        text: "A reminder that boundaries aren't always as solid as they seem. That sometimes, what appears to separate us can actually be the place where we connect most deeply.",
        mood: 'sincere',
      },
      {
        character: 'maven',
        text: "I think I like that sign.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "So do I.",
        mood: 'sincere',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  }
};
//when winter-festival-activities are complete or skipped, the scene should transition to 
export default winterActivityScenes;
