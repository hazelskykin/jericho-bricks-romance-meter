
import { Scene } from '@/types/game';
import winterIntroScenes from './intro';
import winterPlanningScenes from './planning';
import winterActivitiesScenes from './activities';
import winterConclusionScenes from './conclusion';
import relationshipScenes from './relationship';
import teamFutureScenes from './teamfuture';
import winterTransitions from './transitions';

// Combine all winter-related scenes
const winterScenes: Record<string, Scene> = {
  ...winterIntroScenes,
  ...winterPlanningScenes,
  ...winterActivitiesScenes,
  ...winterConclusionScenes,
  ...relationshipScenes,
  ...teamFutureScenes,
  ...winterTransitions,
  
  // Winter minigame scenes
  'winter-charity-auction-start': {
    id: 'winter-charity-auction-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You approach the charity auction area, ready to bid on items for a good cause.",
      },
    ],
    nextSceneId: 'winter-charity-auction-complete',
  },
  
  'winter-gala-dance-start': {
    id: 'winter-gala-dance-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You step onto the dance floor at the Winter Gala, ready to dance with your special someone.",
      },
    ],
    nextSceneId: 'winter-gala-dance-complete',
  },
  
  'winter-looking-signs-start': {
    id: 'winter-looking-signs-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You begin your walk through Stonewich, searching for signs of fortune with someone special.",
      },
    ],
    nextSceneId: 'winter-looking-signs-complete',
  },
  
  // Minigame completion scenes
  'winter-charity-auction-complete': {
    id: 'winter-charity-auction-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The auction concludes with your successful bids helping to raise money for local causes.",
      },
      {
        character: 'navarre',
        text: "Your bidding strategy was impressive! You really know how to work a crowd.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-festival-midway',
  },
  
  'winter-gala-dance-complete': {
    id: 'winter-gala-dance-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the dance ends, you find yourself feeling closer to your partner than ever before.",
      },
    ],
    nextSceneId: 'winter-festival-midway',
  },
  
  'winter-looking-signs-complete': {
    id: 'winter-looking-signs-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Your walk concludes as you find several hopeful signs about your future together.",
      },
    ],
    nextSceneId: 'winter-festival-midway',
  },
  
  'winter-festival-midway': {
    id: 'winter-festival-midway',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Winter Gala & Games festival continues with lights twinkling across Stonewich.",
      },
      {
        character: 'maven',
        text: "There's something magical about winter festivals. Everything seems to glow with possibility.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-festival-activities',
  },
};

export default winterScenes;
