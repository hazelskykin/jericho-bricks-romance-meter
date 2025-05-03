
import { Scene } from '../../../types/game';

const springIntroScenes: Record<string, Scene> = {
  'spring-intro': {
    id: 'spring-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Two months have passed since your arrival in Stonewich. The city has begun to welcome the spring season.',
      },
      {
        character: 'narrator',
        text: 'The administration team has settled into their roles, though there have been challenges along the way.',
      },
      {
        character: 'maven',
        text: "I'm still trying to find my place here. Everyone else seems to have their specialty.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "As you walk into the office this morning, you find Xavier reviewing reports on his tablet.",
      },
      {
        character: 'xavier',
        text: "Morning, Maven!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "You're here early. Busy day?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Yep! The Blooms and Brooms spring festival is nearly here. There's so much to do!",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Did I hear someone mention the festival? It's a great PR opportunity for us newcomers. We should all participate.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Are we meeting now on the festival? Where's Etta?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Oh, no. Nothing that formal. I was just chatting.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Did someone call my name? I've been at my desk since dawn working out the vendor arrangements for the art fair at the festival.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "No, sorry to have bothered you. We were just chatting.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "All of you? Typical. Let's make the most of this since we're all here. Maven, why don't you shadow someone so things get done in time for the festival.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'spring-planning',
  }
};

export default springIntroScenes;
