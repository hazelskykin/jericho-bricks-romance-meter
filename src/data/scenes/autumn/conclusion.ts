
import { Scene } from '../../../types/game';

const autumnConclusionScenes: Record<string, Scene> = {

  // Autumn conclusion with Dr. Voss
  'autumn-conclusion-meeting': {
    id: 'autumn-conclusion-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "Back at Cybaton headquarters, the team is once again ready to present, anxiously hoping their autumn results will have a better reception with Dr. Voss.",
      },
      {
        character: 'maven',
        text: "Dr. Voss, we considered your feedback carefully, and we'd like to discuss that with you after our operational review of the festival.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Alright, let's start with that then.",
      },
      {
        character: 'etta',
        text: "All stated objectives were met or exceeded. New metrics were implemented that assess the extent of social connectivity, focused on relationships and interactions. Thanks to Senara for his insight.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Systems performed flawlessly for the festival. Technology features that enabled inclusivity for all attendees were especially well received, boosting attendance. Thanks to Etta for her suggestions on underrepresented populations at festivals.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Artisans, fans and businesses alike drew inspiration from the experience. Thanks to Xavier's technology upgrades, accessibility to craft mastery became instantly achievable.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "A higher degree of social harmony was achieved as measured by reduced crime of 43%, elevated productivity levels of 61%, and economic confidence boost of a staggering 79%. Thanks to Nevarre for his personal magnetism that inspired the community and beyond in his friendly challenge.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "As you can see for yourself, Dr. Voss, the results were not achieved from outstanding individual talents but as a team.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss listens carefully, occasionally making notes as the team presents.",
      },
      {
        character: 'narrator',
        text: "After the presentation concludes, Dr. Voss stands and addresses the team.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss speaks with a pleased but cautious tone, each word precisely chosen.",
      },
      {
        character: 'narrator',
        text: "\"The collaborations you've shown in the autumn season are impressive, and they start to address critical issues facing Stonewich, methodically and thoughtfully.\"",
      },
      {
        character: 'narrator',
        text: "\"Don't lose this momentum as I believe there's potential for more.\"",
      },
      {
        character: 'narrator',
        text: "Dr. Voss paces slowly before continuing.",
      },
      {
        character: 'narrator',
        text: "\"What I said at the end of summer may have seemed harsh to you given the evidence of success earned.\"",
      },
      {
        character: 'narrator',
        text: "\"However, the stakes are too high to be complacent. Cybaton needs you. Stonewich needs you. Your best efforts are still ahead of you.\"",
      },
      {
        character: 'narrator',
        text: "\"Don't let familiarity and routine dull your hunger to excel for your own sakes and for those who are counting on you. Let Winter be your showcase.\"",
      },
      {
        character: 'narrator',
        text: "Dr. Voss nods firmly, a clear dismissal.",
      },
      {
        character: 'narrator',
        text: "Relief and a renewed sense of purpose fills your heart. You can tell the others on the team feel similarly.",
      }
    ],
    nextSceneId: 'summer-conclusion-fallout',
  },
  
  'autumn-conclusion-fallout': {
    id: 'autumn-conclusion-fallout',
    background: 'cybaton-shuttle',
    dialogue: [
      {
        character: 'narrator',
        text: "The shuttle ride back to Stonewich feels comforting after the recent report.",
      },
      {
        character: 'xavier',
        text: "That was the best response we've received from Dr. Voss, or was I dreaming?",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "She was definitely more receptive this time. What a relief!",
        mood: 'happy',      
      },
      {
        character: 'senara',
        text: "What we did differently this time made a big impact beyond Stonewich.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Let's give credit where it's due. It was thanks to Maven's insights that we got on the right path.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I didn't do much though. You're giving me too much credit.",
        mood: 'embarrassed',
      },
      {
        character: 'etta',
        text: "No, it is well deserved. Thanks for your efforts, Maven.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Dr. Voss seemed to think we could do something more. I wonder what?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "One logical extension would be to cross-collaborate in more ways.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "That's one, but maybe we should try to scale this concept beyond our team.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Let's give it some thought before we meet for the planning session.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "The transport comes into view of Stonewich as the conversation winds down. You wonder if your results from Autumn were a fluke or offered a solid foundation to build upon.",
      },
    ],
    nextSceneId: 'autumn-conclusion',
  },  
  
  'autumn-conclusion': {
    id: 'autumn-conclusion',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "Autumn in Stonewich has been a time of reflection and deeper connections. The Heritage & Handicrafts Festival was amazing.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "We've all grown so much since we first arrived here. It's hard to believe winter is already approaching.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "The annual review will be coming up at the end of winter. We should start preparing our reports.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Always thinking ahead, Etta! But you're right. The Winter Gala & Games will be here before we know it.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The winter festival is quite the spectacle, from what I've read. A formal gala, charity auction, and various winter games.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'season-transition-winter',
  },
  
  // Special scene to handle transition between seasons
  'season-transition-winter': {
    id: 'season-transition-winter',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "Winter, Chapter 4",
      },
    ], // Empty dialogue to trigger season transition
    nextSceneId: 'winter-intro', // Now points to summer content instead of main menu
  }
};

export default winterConclusionScenes;
