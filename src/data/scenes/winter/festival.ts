
import { Scene } from '@/types/game';

const winterFestivalScenes: Record<string, Scene> = {
  'winter-festival-intro': {
    id: 'winter-festival-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Winter Gala & Games transforms Stonewich into a magical wonderland. The streets are lined with twinkling lights, and the central plaza has been converted into an elegant outdoor ballroom.",
      },
      {
        character: 'maven',
        text: "It's even more beautiful than I imagined. Everyone looks so elegant.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "The Winter Gala is Stonewich's premier social event. It's where partnerships are formed, deals are made, and of course, where everyone shows off their finest attire.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "It's also home to some of our most cherished traditions. The charity auction, the winter waltz, the search for signs...",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  },
  'winter-festival-completion': {
    id: 'winter-festival-completion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the Winter Gala & Games draws to a close, the city of Stonewich seems to glow with renewed energy and purpose.",
      },
      {
        character: 'etta',
        text: "I have to admit, this year's festival exceeded even my expectations. The team performed admirably.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It feels like we've accomplished something special here, doesn't it?",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "We certainly have. The people of Stonewich are going to remember this winter for years to come.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-conclusion'
  },
  'winter-festival-activities': {
    id: 'winter-festival-activities',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "With the Winter Gala & Games underway, there are several activities you could participate in.",
      },
      {
        character: 'maven',
        text: "Where should I focus my attention during the festival?",
        mood: 'thoughtful',
      }
    ]
  }
};

export default winterFestivalScenes;
