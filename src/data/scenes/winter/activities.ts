
import { Scene } from '@/types/game';

const activitiesScenes: Record<string, Scene> = {
  'winter-festival-activities': {
    id: 'winter-festival-activities',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "The Winter Gala & Games festival is in full swing. There's so much to explore!",
        mood: 'happy',
      }
    ],
    // This scene will be handled by the FestivalActivitiesScene component
    nextSceneId: 'winter-festival-completion',
  },

  // Charity Auction Minigame Introduction
  'winter-charity-auction-intro': {
    id: 'winter-charity-auction-intro',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "The charity auction looks interesting. I wonder if I could win something special.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "It's all about strategy! Timing your bids and knowing when to go all in.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Remember, the auction benefits the city's charities. It's for a good cause.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I'll keep an eye on the prizes and see if there's something worth bidding on.",
        mood: 'confident',
      }
    ],
    nextSceneId: 'winter-charity-auction-start',
  },

  // Trigger for Charity Auction minigame
  'winter-charity-auction-start': {
    id: 'winter-charity-auction-start',
    background: 'winter-transition',
    dialogue: [],
    nextSceneId: 'winter-charity-auction-complete',
  },

  // After Charity Auction minigame
  'winter-charity-auction-complete': {
    id: 'winter-charity-auction-complete',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "That was quite the bidding war! The auction raised a lot of money for charity.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Did you win anything?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It was exciting to participate, whether I won or not. The important thing is that it was for a good cause.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-midway',
  },

  // Gala Dance Minigame Introduction
  'winter-gala-dance-intro': {
    id: 'winter-gala-dance-intro',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "The winter gala is so elegant. Everyone's dressed up and the music is beautiful.",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Would you like to dance with me?",
        affectionChanges: { xavier: 1, navarre: 1, etta: 1, senara: 1 },
        nextSceneId: 'winter-gala-dance-invitation'
      },
      {
        text: "This is a beautiful event, isn't it?",
        nextSceneId: 'winter-gala-dance-conversation'
      }
    ]
  },

  'winter-gala-dance-invitation': {
    id: 'winter-gala-dance-invitation',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "Would you like to dance with me?",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-gala-dance-acceptance',
  },

  'winter-gala-dance-acceptance': {
    id: 'winter-gala-dance-acceptance',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "I'll try to follow your lead. It's been a while since I've danced formally.",
        mood: 'embarrassed',
      }
    ],
    nextSceneId: 'winter-gala-dance-start',
  },

  'winter-gala-dance-conversation': {
    id: 'winter-gala-dance-conversation',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "This is such a beautiful event. Stonewich really knows how to celebrate winter.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-gala-dance-invitation',
  },

  // Trigger for Gala Dance minigame
  'winter-gala-dance-start': {
    id: 'winter-gala-dance-start',
    background: 'winter-transition',
    dialogue: [],
    nextSceneId: 'winter-gala-dance-complete',
  },

  // After Gala Dance minigame
  'winter-gala-dance-complete': {
    id: 'winter-gala-dance-complete',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "That was wonderful! Thank you for the dance.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-midway',
  },

  // Looking for Signs Minigame Introduction
  'winter-looking-signs-intro': {
    id: 'winter-looking-signs-intro',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "Would you like to take a walk with me? I heard there's a tradition of looking for signs of fortune during the winter festival.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It's supposed to be fun! We look for symbols around us and interpret them as good or bad luck for the coming year.",
        mood: 'excited',
      }
    ],
    nextSceneId: 'winter-looking-signs-start',
  },

  // Trigger for Looking for Signs minigame
  'winter-looking-signs-start': {
    id: 'winter-looking-signs-start',
    background: 'winter-transition',
    dialogue: [],
    nextSceneId: 'winter-looking-signs-complete',
  },

  // After Looking for Signs minigame
  'winter-looking-signs-complete': {
    id: 'winter-looking-signs-complete',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "That was interesting! I wonder if any of those signs will come true.",
        mood: 'thoughtful',
      },
    ],
    nextSceneId: 'winter-festival-midway',
  },

  // Festival midway point - player can choose other activities
  'winter-festival-midway': {
    id: 'winter-festival-midway',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "There's still more to experience at the Winter Gala & Games. What should I do next?",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-activities',
  },
  
  // Festival completion scene
  'winter-festival-completion': {
    id: 'winter-festival-completion',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "The Winter Gala & Games was spectacular. It was the perfect way to end our year in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "It's hard to believe our year here is almost over. The annual review is coming up next week.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-confession',
  }
};

export default activitiesScenes;
