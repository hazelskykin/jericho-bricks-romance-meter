
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
        character: 'etta',
        text: "Dr. Voss, despite the unusual heatwave, the Summer Songs & Sips festival garnered higher attendance than the last few years. All stated objectives were met or exceeded.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "The new environmental cooling drones created a zone of relief against the heat in the rest of the city. There's room to expand their use with greater scale.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Despite competitive attempts at undermining our reputation, local musicians and tourism related businesses have reported great results from the festival and a commitment to future engagements.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Linguistic competency skills among the general public improved by 17% on average from festival activities, and higher results of 61% were achieved among performers.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Everyone at the event seemed to be having fun and relaxing.",
        mood: 'happy',
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
        text: "Dr. Voss is a commanding presence with silver-streaked hair and piercing eyes that seem to evaluate everything.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss speaks with a measured tone, each word precisely chosen.",
      },
      {
        character: 'narrator',
        text: "\"Each of you has demonstrated excellence in your respective domains again this past Summer season.\"",
      },
      {
        character: 'narrator',
        text: "\"Perhaps that's all you can achieve, all you are looking to achieve, although I believe there's potential for more.\"",
      },
      {
        character: 'narrator',
        text: "Dr. Voss paces slowly before continuing.",
      },
      {
        character: 'narrator',
        text: "\"At the end of spring I left you with what may have seemed like vague feedback. Let me be more explicit now.\"",
      },
      {
        character: 'narrator',
        text: "\"Look at the city below the surface. Social metrics like marriages and families are on the decline. Even if more people attend the festival, it has become more of an individual experience.\"",
      },
      {
        character: 'narrator',
        text: "\"Cybaton has done an impressive job managing the city, but competitive services are gaining traction there for siloed operations.\"",
      },
      {
        character: 'narrator',
        text: "\"Cybaton's efforts are being scrutinized to downgrade its involvement as fewer services overall are required as more citizens are able to use self-service utilities for things that the municipality managed.\"",
      },
      {
        character: 'narrator',
        text: "\"What this implies is that while you are achieving results, the city overall is stagnating or slowly breaking apart at critical junctures. Discuss this amongst yourselves and have a response ready at the next seasonal report.\"",
      },
      {
        character: 'narrator',
        text: "Dr. Voss nods firmly, a clear dismissal.",
      },
      {
        character: 'narrator',
        text: "As the team files out, uncertainty and foreboding settle on their shoulders. What they had generally dismissed as empty motivational words have now taken on clearer shape and focus.",
      }
    ],
    nextSceneId: 'summer-conclusion-fallout',
  },
  
  'summer-conclusion-fallout': {
    id: 'summer-conclusion-fallout',
    background: 'cybaton-shuttle',
    dialogue: [
      {
        character: 'narrator',
        text: "The air in the shuttle was very different on the way back to Stonewich. Where there had been jubiliation and accomplishment on the way to the meeting, the fallout afterward was contemplative and gloomy.",
      },
      {
        character: 'maven',
        text: "Let's talk about what Dr. Voss said. The tension is too thick to breathe in here, so let's clear the air and talk it over.",
      },
      {
        character: 'etta',
        text: "Fine. I'm angry. We are meeting the objectives stated for the task, but she's measuring us against a different standard altogether. Marriage and family statistics? Where did that come from?",
        mood: 'angry',      
      },
      {
        character: 'navarre',
        text: "I thought the competitor issues were just from Morgan's efforts. Is Cybaton really losing ground?",
        mood: 'sad',
      },
      {
        character: 'xavier',
        text: "I thought my efforts at automating systems were helping the people of Stonewich. Did I unintentionally destabilize central control functions when I distributed micro systems for people to control for themselves?",
        mood: 'sad',
      },
      {
        character: 'senara',
        text: "There are only speculative simulations for situations where the social fabric frays as Dr. Voss described. This is a new phase of societal development, unique due to technology enabled sufficiency.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You think about the responses each of your team members gave for a moment before offering an opinion of your own.",
      },
      {
        character: 'maven',
        text: "I think I see what Dr. Voss is trying to point out to us. I didn't really understand it when she was talking, but hearing how you all responded just now makes it clearer to  me.",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "Well, spit it out. Is there a master plan somewhere with more topline metrics we're supposed to focus on?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I haven't seen any master architecture plans or integration reuqirements that would govern the implementation of the new systems I've been building though.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Xavier, Etta was likely expressing exasperation via a rhetorical question, not an actual inquiry. We have been privy to any city plans, architectures, and negotations involving Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Senara is well informed, as expected. The situation and feedback are not necessarily in concrete terms.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Yes and no. I do think there's data and indications of what Dr. Voss was talking about. She wouldn't just say all that on unfounded speculation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "However, we are not looking at the whole picture together as a team. Instead, each of us are focused on one aspect.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "We should try to align our efforts with a vision.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "When you say it like that, I feel like it's more motivational than practical. We are already coordinating efforts efficiently",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Maven, if you feel you are able to see a pattern that the rest of us do not, then perhaps you should take a more direct role in the next season.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "That's a great idea! Maven has shown she brings good perspective to projects.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "There's only so much time in a day, however, so she won't be free to help everyone out like she did before.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "If it means that we can finally get recognition from Dr. Voss for our results, let's give it a try.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Alright, I'll consider carefully how I can proceed from here for the team to have the impact Dr. Voss is looking for.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "The transport comes into view of Stonewich as the conversation winds down. You wonder if you can really make the impact that your team has entrusted to you.",
      },
    ],
    nextSceneId: 'summer-conclusion',
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
