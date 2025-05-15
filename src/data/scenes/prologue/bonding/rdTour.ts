
import { Scene } from '../../../../types/game';

const rdTourScenes: Record<string, Scene> = {
  'rd-tour': {
    id: 'rd-tour',
    background: 'cybaton-lab',
    dialogue: [
      {
        character: 'narrator',
        text: "You suggest visiting Cybaton's R&D floor, and Xavier's eyes light up immediately.",
      },
      {
        character: 'xavier',
        text: "That's a brilliant idea! I can show you some of the prototypes we might be testing in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Sure, why not? Staying informed of the latest trends in any field can be helpful.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "As long as it's relevant to our assignment, I have no objection.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The latest status reports on some of the projects should be more impactful with physical interaction and visual inspection.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'Xavier leads the tour enthusiastically, showing off everything from maintenance drones to community engagement interfaces.',
      },
      {
        character: 'xavier',
        text: "And this is my favorite project - an AI system that helps predict infrastructure needs before problems arise. It started simply as drone surveillance but expanded to so much more.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "This is amazing, Xavier. You really know your stuff.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: 'The evening flies by with fascinating technology demonstrations. You notice Xavier beaming at your interest, while Senara makes quiet but insightful observations.',
      },
      {
        character: 'narrator',
        text: "By the end of the tour, you feel more excited about the possibilities in Stonewich, and you've definitely strengthened your connection with Xavier.",
      }
    ],
    nextSceneId: 'departure-lobby', // Updated to go to the lobby scene first
  }
};

export default rdTourScenes;
