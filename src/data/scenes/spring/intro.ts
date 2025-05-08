
import { Scene } from '../../../types/game';

const springIntroScenes: Record<string, Scene> = {
  // Spring season transition scene
  'spring-intro': {
    id: 'spring-intro',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'As the weather warms, Stonewich prepares for the Spring Blooms & Brooms Festival, a time of renewal and community beautification efforts.',
      },
      {
        character: 'narrator',
        text: "You find Xavier sitting in the office working on a tablet.",
      },
      {
        character: 'xavier',
        text: "Good morning!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Good morning. Busy day?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Yep! The Spring Blooms & Brooms festival is coming up fast, and there's a lot to do.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Morning! Did someone mention the festival? We should all definitely get involved. What a great way to make connections.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Oh, hello. Are we meeting on the festival now? This room isn't usually so hectic this early. Where's Etta?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What? Oh, no. We were just chatting.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Did someone call for me? I've been working on these vendor arrangements since dawn for the local art fair component of the spring festival.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "No, sorry. We were just chatting.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "All of you? Typical. Look, the spring festival planning is very demanding. Rather than chatting, why don't you pick someone to shadow and help them out, Maven?",
        mood: 'angry',
      },
      {
        character: 'navarre',
        text: "No need to get short with us because we're connecting here, but it's a great idea. Maven, who would you like to shadow?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Maybe I can spend some time with each of you? I think...",
        mood: 'neutral',
      },
    ],
       nextSceneId: 'spring-selection',
  },
};

export default springIntroScenes;
