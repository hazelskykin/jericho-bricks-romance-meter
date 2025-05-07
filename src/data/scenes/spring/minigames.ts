
import { Scene } from '../../../types/game';

const springMinigameScenes: Record<string, Scene> = {
  // Brooms Away minigame intro
  'spring-brooms-away-intro': {
    id: 'spring-brooms-away-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You join Xavier and a group of volunteers for the community cleanup portion of the festival.",
      },
      {
        character: 'xavier',
        text: "Thanks for joining the cleanup crew, Maven! We're using a mix of traditional methods and my cleaning drones.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I've created a system to coordinate our efforts. We need to efficiently identify and clean problem spots around the plaza.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How can I help?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "You can operate the drone scanner interface! It'll show you where the problem spots are, and you can direct the cleanup teams.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Xavier hands you a tablet with the drone control interface.",
      },
      {
        character: 'narrator',
        text: "GAME INSTRUCTIONS: In 'Brooms Away', you'll need to scan the area for litter and direct the drones to clean it up.",
      }
    ],
    nextSceneId: 'spring-brooms-away-start',
  },
  
  // Scene that triggers the Brooms Away minigame
  'spring-brooms-away-start': {
    id: 'spring-brooms-away-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You prepare to coordinate the cleanup effort using Xavier's drone interface.",
      },
    ],
    // This scene will trigger the minigame via the GameSceneObserver
    nextSceneId: 'spring-brooms-away-complete',
  },
  
  // Scene after completing Brooms Away
  'spring-brooms-away-complete': {
    id: 'spring-brooms-away-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "With your coordination, the cleanup teams make excellent progress around the plaza.",
      },
      {
        character: 'xavier',
        text: "That was amazing work, Maven! The system worked perfectly with your guidance.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It was actually pretty fun. Your drone interface made it easy to spot where help was needed.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I'm glad you enjoyed it! This kind of technology-assisted community effort is exactly what Stonewich needs.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "By mid-afternoon, the plaza is spotless and ready for the next phase of the festival.",
      }
    ],
    nextSceneId: 'spring-festival-midway',
  },
  
  // Bloom With A View minigame intro
  'spring-bloom-view-intro': {
    id: 'spring-bloom-view-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You join Senara at the community gardens where volunteers are preparing to plant new flowers and vegetables.",
      },
      {
        character: 'senara',
        text: "Glad you chose to help with the gardens. Many overlook the importance of urban green spaces.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What's the plan for today?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "We need to locate all the supplies and tools scattered around the garden area. Some are well-hidden among existing plants.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Finding everything efficiently will allow us to maximize our planting time before the sun sets.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Senara hands you a checklist of items to find.",
      },
      {
        character: 'narrator',
        text: "GAME INSTRUCTIONS: In 'Bloom With A View', you'll need to locate gardening supplies hidden throughout the community garden.",
      }
    ],
    nextSceneId: 'spring-bloom-view-start',
  },
  
  // Scene that triggers the Bloom With A View minigame
  'spring-bloom-view-start': {
    id: 'spring-bloom-view-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You begin searching for the gardening supplies needed for the community planting.",
      },
    ],
    // This scene will trigger the minigame via the GameSceneObserver
    nextSceneId: 'spring-bloom-view-complete',
  },
  
  // Scene after completing Bloom With A View
  'spring-bloom-view-complete': {
    id: 'spring-bloom-view-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "With all the supplies located, the planting begins in earnest. By the end of the day, the community gardens are transformed with new life.",
      },
      {
        character: 'senara',
        text: "Impressive work. Your methodical approach saved us considerable time.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Thanks. It feels good to contribute to something that will grow and beautify the city.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Indeed. These gardens will provide both aesthetic and practical benefits. A thoughtful investment in the city's future.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "As evening approaches, you take a moment to appreciate the freshly planted gardens and the community's collaborative efforts.",
      }
    ],
    nextSceneId: 'spring-festival-midway',
  },
  
  // Mud Fling minigame intro
  'spring-mud-fling-intro': {
    id: 'spring-mud-fling-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Navarre organizing a group of children and adults for what appears to be a messy game in a sectioned-off area of the park.",
      },
      {
        character: 'navarre',
        text: "Maven! Perfect timing. We're about to start the traditional Spring Mud Festival games.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Mud Festival? That doesn't sound very... clean.",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "That's the point! Spring isn't just about cleanliness, it's about embracing new growth—which starts in the soil.",
        mood: 'laughing',
      },
      {
        character: 'navarre',
        text: "Besides, it's a great way to get the community to let loose and have fun. Will you join us for a round of Mud Fling?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I guess I can't say no to a local tradition...",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: "GAME INSTRUCTIONS: In 'Mud Fling', you'll participate in a friendly mud battle. Dodge incoming mud balls and try to hit your opponents!",
      }
    ],
    nextSceneId: 'spring-mud-fling-start',
  },
  
  // Scene that triggers the Mud Fling minigame
  'spring-mud-fling-start': {
    id: 'spring-mud-fling-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You step into the mud pit arena, ready for a messy but fun competition.",
      },
    ],
    // This scene will trigger the minigame via the GameSceneObserver
    nextSceneId: 'spring-mud-fling-complete',
  },
  
  // Scene after completing Mud Fling
  'spring-mud-fling-complete': {
    id: 'spring-mud-fling-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Covered in mud but laughing, you and the other participants finish the game to the cheers of onlookers.",
      },
      {
        character: 'navarre',
        text: "Now THAT is how you make a splash at a festival! Did you see how everyone was cheering?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I have to admit, that was more fun than I expected. Though I'll need a serious shower.",
        mood: 'laughing',
      },
      {
        character: 'navarre',
        text: "Worth it though, right? Sometimes you need to get a little dirty to really connect with people.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "As you clean up, several community members come to chat with you, the ice thoroughly broken by your participation in the messy festival game.",
      }
    ],
    nextSceneId: 'spring-festival-midway',
  },
  
  // Common midway point after any minigame
  'spring-festival-midway': {
    id: 'spring-festival-midway',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the day progresses, the Spring festival is in full swing across Stonewich.",
      },
      {
        character: 'maven',
        text: "I never expected to enjoy this quite so much. Everyone seems really into the festival spirit.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's what makes Stonewich special. The technology is just a tool—it's the community that brings everything to life.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "And speaking of community, I've been hearing great things about our team from the locals. We're making a good impression!",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The metrics are promising. Public approval ratings for the administration team are up 12% since this morning.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "More importantly, the festival is maintaining its traditional purpose: bringing people together while renewing the city.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "As evening approaches, you join your teammates to enjoy the rest of the festivities, feeling like you're truly becoming part of Stonewich.",
      }
    ],
    nextSceneId: 'spring-festival-end',
  },
  
  // Explicitly define spring-festival-end to avoid dead ends
  'spring-festival-end': {
    id: 'spring-festival-end',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Spring Blooms & Brooms Festival comes to a successful close as the sun begins to set.",
      },
      {
        character: 'maven',
        text: "That was quite a day. I think we all learned a lot about Stonewich and its traditions.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "And the people got to know us better too. That's important for establishing trust.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The festival was a strategic success. We should capitalize on this momentum for our future initiatives.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "As the festival wraps up, you feel a sense of accomplishment and deeper connection to your new home.",
      }
    ],
    // Connect back to the main story progression
    nextSceneId: 'spring-conclusion',
  },
};

export default springMinigameScenes;
