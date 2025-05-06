import { Scene } from '../../../types/game';

const teamFutureScenes: Record<string, Scene> = {

// game-end-team-futures, follows relationship-confession scenes

'team-future-meeting': {
    id: 'team-future-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
        {
            character: 'narrator',
            text: "The air is thick with anticipation. The cool, collected demeanor your team members have usually composed betrays small hints of stress."
        }
        {
            character: 'narrator',
            text: "Dr. Voss: Thank you all for coming, and thank you once again for your hard work this past year. Our faith in you as individuals and as a team has been validated beyond expectations.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: After reviewing all factors, I've made a decision regarding your team's future.",
      },
      {
        character: 'narrator',
        text: "Your exceptional performance and the positive feedback from Stonewich has been taken into account and prioritized with other current needs that Cybaton is managing.",
      },
      {
        character: 'narrator',
        text: "As for the 'Versa' role experiment, a conclusion has not yet been reached. We will discuss that separately at another time.",
      },
    ],
    nextSceneId: 'winter-epilogue-check',
  },

  'winter-epilogue-check': {
    id: 'winter-epilogue-check',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'maven',
        text: "I catch the eye of my teammates. This is the moment we have been waiting to hear.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'epilogue-intro',
  },
],
};

export default teamFutureScenes;
