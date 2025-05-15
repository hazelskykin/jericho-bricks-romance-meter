
import { Scene } from '../../../../types/game';

const studySessionScenes: Record<string, Scene> = {
  'study-session': {
    id: 'study-session',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'narrator',
        text: "You all gather in the Cybaton research library. Digital displays and holographic projections illuminate the space.",
      },
      {
        character: 'etta',
        text: "Excellent choice, Maven. Let's make sure we're fully prepared for the Stonewich assignment.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've already compiled notes to indicate status and immediate actions. Integration points and forecasted bottlenecks should be a focus. All relevant details have been shared in the team Oracle.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "That's great, Senara. I found some interesting community feedback on Stonewich's tech. The residents actually seem to like some of the older systems.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Politics are crucial too. Stonewich has a strong community council and thriving commerce leadership that we'll need to work with.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Let's determine a strong plan with prioritized actions that integrate our efforts. Your notes are exceptionally detailed, Senara. Excellent!",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Xavier, you'll need to dig deeper and assess latent demand for self-directed services that Cybaton offers.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I'd love to work with some of the latest Cybaton R&D, so I'll try some pilot programs to test out the local appetite for the new tech services.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I've got contacts at the Council and the Commerce Guild. Don't worry, Etta. We know our jobs.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "The team works late into the evening, analyzing Stonewich's systems and history. You develop a deeper understanding of the city and its needs, thanks mostly to Senara who seemed to know everything about Stonewich.",
      },
      {
        character: 'narrator',
        text: "By the time you leave, you feel well-prepared for tomorrow's departure, and you notice approving glances from Etta.",
      }
    ],
    nextSceneId: 'departure-lobby',
  }
};

export default studySessionScenes;
