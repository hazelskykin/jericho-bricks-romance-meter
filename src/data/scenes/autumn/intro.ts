
import { Scene } from '../../../types/game';

const autumnIntroScenes: Record<string, Scene> = {
  'autumn-intro': {
    id: 'autumn-intro',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'narrator',
        text: 'As summer fades, the crisp air of autumn settles over Stonewich.',
      },
      {
        character: 'narrator',
        text: 'The team has become more cohesive, and your relationships have deepened with certain members.',
      },
      {
        character: 'maven',
        text: "The seasons change so quickly here. It feels like we just arrived.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Autumn in Stonewich has historically been a time of gathering and preserving. The Handicrafts & Heritage Festival celebrates traditional crafts and skills.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "The city's environmental systems are shifting to heating mode. We should run some diagnostics to ensure everything's working properly before the colder weather sets in.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'spring-transition', // Temporarily point back to spring for demo purposes
  }
};

export default autumnIntroScenes;
