
import { Scene } from '@/types/game';

const happyEndingScenes: Record<string, Scene> = {
  'happy-ending-xavier': {
    id: 'happy-ending-xavier',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'maven',
        text: "Xavier, we have grown closer than I ever imagined. Your desire to connect people and improve society has deeply resonated with me. Your kindness and dedication have endeared him to me.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That makes me so happy to hear you say that. I feel we have only grown closer this past year we've been together.",
        mood: 'happy',
      },
      
      {
        character: 'xavier',
        text: "Maven, I've been thinking about our future...",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I'd like to take our relationship to the next level. Share a secure home network, maybe? Eliminate redundant storage needs?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Is that your way of asking if we should move in together?",
        mood: 'laughing',
      },
      {
        character: 'maven',
        text: "I'd love that, Xavier. With you, I've found a home both in Stonewich and in my heart.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I'm still working on being more direct. It'll be easier for me to practice Near Field Communications with you in my proximity, but you'll need to be really close for that to work.",
        mood: 'laughing',
      },
      {
        character: 'maven',
        text: "That sounds doable. How close do I need to be?",
        mood: 'laughing',
      },
      {
        character: 'xavier',
        text: "ahhh, within 4 centimeters.",
        mood: 'embarrassed',
      },
      {
        character: 'maven',
        text: "...like this?",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: "Xavier and Maven build a life together in Stonewich, full of humor, happiness, and harmony.",
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
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'maven',
        text: "Navarre, you and I have built something I never expected - a relationship based on mutual respect and genuine connection.",
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
        text: "You were so confident when we first met. I wasn't sure I'd be able to even talk to you. Your charm helped me past that initial hurdle.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Few can resist!",
        mood: 'laughing',
      },
      {
        character: 'maven',
        text: "I didn't fall for your charm, as impressive as that is. You have a beautiful soul, filled with kindness and warmth. Tease me all you like, but I can't imagine life without you now.",
        mood: 'laughing',
      },
      {
        character: 'navarre',
        text: "You're making me blush. I can't imagine a life without you either, Maven. But you know what I can imagine for us together?",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: "Navarre moves close to you, pulling you into his embrace, and leans to whisper quietly in your ear.",
      },
      {
        character: 'navarre',
        text: "A family. A home together. A future of shared joys.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Yes, please. That's what I want too.",
        mood: 'embarrassed',
      },
      {
        character: 'navarre',
        text: "As you wish. Shall we get started then?",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: "Navarre and Maven create a vibrant life together, filled with laughter and heartfelt connections with family and friends.",
      },
      {
        character: 'narrator',
        text: "Their home becomes a hub for the community, hosting events that bring together people from all walks of life.",
      },
      {
        character: 'narrator',
        text: "With Maven, Navarre treasures the one connection that matters most, and together they make Stonewich truly feel like home.",
      }
    ],
    nextSceneId: 'versa-epilogue-check',
  },

  'happy-ending-etta': {
    id: 'happy-ending-etta',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'maven',
        text: "Etta, we have found a balance together that I never thought possible.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Me too, Maven. I feel the same. I am still as driven as ever, but now I feel whole as a person without the pressure of my work or family as my identity.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Speaking of your family, your father spoke to me yesterday and asked me about my intentions toward his daughter.",
        mood: 'laughing',
      },
      {
        character: 'etta',
        text: "Oh, no! He didn't?! What did you say?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "I asked him if he received his invitation to the reception yet. Should I regret those words?",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Oh my god! Really?! Of course you shouldn't regret them. I can't believe it! I'm so happy!",
        mood: 'laughing',
      },
      {
        character: 'maven',
        text: "I'm surprised you never told him that we had eloped this past year.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "You know why. I wanted something just for us, but hearing you offer a reception to my father...",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I know. I'm glad you're happy about it, even if it's another event to plan.",
        mood: 'confident',
      },
      {
        character: 'etta',
        text: "You're right! There's so much to do!",
        mood: 'laughing',
      },
      {
        character: 'narrator',
        text: "You lean in and affectionately tousle her perfectly braided hair earning a quick smack from Etta.",
      },
      {
        character: 'maven',
        text: "You should talk to your father first. I think he had some plans of his own in mind now that he finally gets to celebrate his daughter's happiness.",
        mood: 'laughing',
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
        text: "Senara, I feel we have discovered something beautiful together. Our relationship defies analysis but feels absolutely right.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Maven, thank you. I feel the same, although I feel like I am the only one who gets these physical craving sensations when you're not close by, if we aren't touching.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "That question may remain a mystery.",
        mood: 'laughing',
      },
      {
        character: 'senara',
        text: "If by that you mean that we can always be together, then for this one question, I'm content with a mystery.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Every day feels like I love you more than I thought possible. It's led me to study something quite old from a new perspective lately.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "What has stirred your intellectual curiousity this time?",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "My current topic is researching the modern context for marital traditions and nuptial rituals. I'd like you to assess if I have the mechanics correct.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Senara solemnly gets down on one knee and holds up a beautiful diamond ring out to you, in a traditional expression of devoted love."
      },
      {
        character: 'senara',
        text: "Maven, will you consent to marry me, to be my wife, to live out our days together weathering happiness and strife as one?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Yes! Senara, you have my heart, my love, my life.",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "Thank you, Maven. I don't know if you remember, but one of the first topics we discussed together was the value of traditions. I'm glad we could experience something like this for ourselves.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Senara and Maven build an unconventional but deeply fulfilling life together in Stonewich, infused by the mysticism of tradition and the boundless edge of future's possibility.",
      },
      {
        character: 'narrator',
        text: "Senara's analytical brilliance, tempered by Maven's emotional intelligence, leads to groundbreaking research on the human elements of city design.",
      },
      {
        character: 'narrator',
        text: "Together, they create a home where understanding comes in many forms.",
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
