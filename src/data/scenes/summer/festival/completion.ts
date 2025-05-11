
import { Scene } from '../../../../types/game';

const summerFestivalCompletionScenes: Record<string, Scene> = {
  'summer-festival-completion': {
    id: 'summer-festival-completion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "The Summer Songs & Sips festival was a huge success! Our team managed to create a memorable experience for everyone.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "The interactive music exhibits were a hit. People loved being able to create their own tunes.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "And the beverage tastings brought in record revenue. I made some excellent connections with the local vendors.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The metrics show a 24% increase in attendance and a 31% increase in revenue compared to last year's festival.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The cultural performances provided an enlightening view into Stonewich's history while embracing modern interpretations.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Now it's time to compile our report for Dr. Voss. Our summer achievements will certainly impress Cybaton.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-conclusion-meeting'
  }
};

export default summerFestivalCompletionScenes;
