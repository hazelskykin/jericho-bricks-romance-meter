
import { Scene } from '../../../../types/game';

const studySessionScenes: Record<string, Scene> = {
  'study-session': {
    id: 'study-session',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'narrator',
        text: 'You all gather in the Cybaton research library. Digital displays and holographic projections illuminate the space.',
      },
      {
        character: 'etta',
        text: "Excellent choice, Maven. Let's make sure we're fully prepared for the Stonewich assignment.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've already compiled notes on their primary systems. We should focus on integration points and maintenance history.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I found some interesting community feedback on Stonewich's tech. The residents actually seem to like the older systems.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Politics are crucial too. Stonewich has a strong community council that we'll need to work with.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'The team works late into the evening, analyzing Stonewich\'s systems and history. You develop a deeper understanding of the city and its needs.',
      },
      {
        character: 'narrator',
        text: 'By the time you leave, you feel well-prepared for tomorrow\'s departure, and you notice approving glances from both Etta and Senara.',
      }
    ],
    nextSceneId: 'departure-lobby', // Updated to go to the lobby scene first
  }
};

export default studySessionScenes;
