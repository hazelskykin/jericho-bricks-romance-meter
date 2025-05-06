
import { Scene } from '@/types/game';

const happyEndingScenes: Record<string, Scene> = {
  'happy-ending-xavier': {
    id: 'happy-ending-xavier',
    background: 'stonewich-sunset',
    dialogue: [
      {
        character: 'maven',
        text: "Xavier and I have grown closer than I ever imagined. His kindness and technical brilliance complement each other perfectly.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Maven, I've been thinking about our future. Now that we know we're staying in Stonewich...",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I'd like to take our relationship to the next level. Move in together, maybe?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'd love that, Xavier. With you, I've found a home both in Stonewich and in my heart.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Xavier and Maven build a life together in Stonewich, combining their talents to improve both the city and themselves.",
      },
      {
        character: 'narrator',
        text: "Xavier's communications system becomes a model for other cities, helping people connect in meaningful ways across Cybaton's territories.",
      },
      {
        character: 'narrator',
        text: "And Maven finds in Xavier a partner who supports her growth and cherishes her uniqueness.",
      }
    ],
    nextSceneId: 'versa-epilogue-check',
  },

  'happy-ending-navarre': {
    id: 'happy-ending-navarre',
    background: 'stonewich-sunset',
    dialogue: [
      {
        character: 'maven',
        text: "Navarre and I have built something I never expected - a relationship based on mutual respect and genuine connection.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "You know, Maven, I used to think success was measured by how many people knew your name.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Now I realize it's about how deeply one person knows your heart. And you know mine better than anyone.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "And you know mine. Here's to building our future together in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Navarre and Maven create a vibrant life together, combining his networking skills and her adaptability.",
      },
      {
        character: 'narrator',
        text: "Their home becomes a hub for the community, hosting events that bring together people from all walks of life.",
      },
      {
        character: 'narrator',
        text: "With Maven, Navarre finds the one connection that matters most, and together they make Stonewich truly feel like home.",
      }
    ],
    nextSceneId: 'versa-epilogue-check',
  },

  'happy-ending-etta': {
    id: 'happy-ending-etta',
    background: 'stonewich-sunset',
    dialogue: [
      {
        character: 'maven',
        text: "Etta and I have found a balance together that I never thought possible. She's taught me ambition, and I've taught her to breathe.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I spoke with my father yesterday, Maven. I told him about us, about my decision to stay in Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How did he take it?",
        mood: 'concerned',
      },
      {
        character: 'etta',
        text: "Better than expected. He said he's never heard me sound so... content. He wants to meet you.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'd like that. And Etta? I'm proud of you for making your own choices.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Etta and Maven create a life of balance together, with Etta learning to value herself beyond her achievements.",
      },
      {
        character: 'narrator',
        text: "Their relationship becomes a model of mutual support, each pushing the other to be their best while accepting their imperfections.",
      },
      {
        character: 'narrator',
        text: "Together, they transform both Stonewich and the Watanabe family business practices, creating a legacy of compassionate leadership.",
      }
    ],
    nextSceneId: 'versa-epilogue-check',
  },

  'happy-ending-senara': {
    id: 'happy-ending-senara',
    background: 'stonewich-sunset',
    dialogue: [
      {
        character: 'maven',
        text: "Senara and I have discovered something beautiful together. Our relationship defies analysis but feels absolutely right.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Maven, I've been contemplating the statistical improbability of finding someone who understands me as you do.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The odds were indeed astronomical. Yet here we are, defying probability.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Some things can't be calculated, Senara. Like how much I love you.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I find that I'm perfectly content with that inexplicability.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Senara and Maven build an unconventional but deeply fulfilling life together in Stonewich.",
      },
      {
        character: 'narrator',
        text: "Senara's analytical brilliance, tempered by Maven's emotional intelligence, leads to groundbreaking research on the human elements of city design.",
      },
      {
        character: 'narrator',
        text: "Together, they create a home where both logic and emotion are valued, where understanding comes in many forms.",
      }
    ],
    nextSceneId: 'versa-epilogue-check',
  },
  
  'versa-epilogue-check': {
    id: 'versa-epilogue-check',
    background: 'stonewich-sunset',
    dialogue: [
      {
        character: 'maven',
        text: "Life in Stonewich continues, full of possibilities and new adventures.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'game-complete',
  },
};

export default happyEndingScenes;
