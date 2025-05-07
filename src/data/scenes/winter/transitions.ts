
import { Scene } from '../../../types/game';

/**
 * This file contains transitions from winter to epilogue.
 * Unlike other seasons which transition to the next season,
 * winter transitions to epilogue scenes.
 */
const winterTransitions: Record<string, Scene> = {
  'winter-to-epilogue': {
    id: 'winter-to-epilogue',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "As winter comes to a close, your year-long journey in Stonewich approaches its conclusion.",
      },
      {
        character: 'narrator',
        text: "The choices you've made throughout the seasons have shaped not only your relationships with others, but also your own growth and understanding.",
      },
      {
        character: 'maven',
        text: "It feels like just yesterday that I first arrived here. So much has changed...",
        mood: 'thoughtful',
      },
      {
        character: 'narrator',
        text: "With the winter festival behind you, it's time to reflect on everything you've achieved and decide what comes next.",
      }
    ],
    nextSceneId: 'epilogue-intro',
  },
};

export default winterTransitions;
