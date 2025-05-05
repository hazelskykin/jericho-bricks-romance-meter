
import { Scene } from '@/types/game';

const relationshipScenes: Record<string, Scene> = {
  // Xavier's autumn route
  'autumn-xavier-path': {
    id: 'autumn-xavier-path',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "I've been spending a lot of time with Xavier lately. He's been working on something in his free time, but he seems hesitant to share it.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "Hey Maven, do you have a minute? I've been meaning to show you something.",
        mood: 'nervous',
      },
      {
        character: 'maven',
        text: "Of course, Xavier. What is it?",
        mood: 'curious',
      },
      {
        character: 'xavier',
        text: "I've been developing a new communications system for the city. It's more efficient and accessible than what we currently have.",
        mood: 'nervous',
      },
      {
        character: 'xavier',
        text: "But I'm worried that it might not be good enough. Or that it might disrupt the existing systems too much.",
        mood: 'sad',
      }
    ],
    choices: [
      {
        text: "Your work is always thoughtful and considerate. I'd love to see what you've created.",
        affectionChanges: { xavier: 1 },
        nextSceneId: 'autumn-xavier-support'
      },
      {
        text: "Change can be scary, but it's often necessary for progress. Let's look at it together.",
        affectionChanges: { xavier: 0.5 },
        nextSceneId: 'autumn-xavier-support'
      }
    ]
  },
  'autumn-xavier-support': {
    id: 'autumn-xavier-support',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'xavier',
        text: "You really think so? That means a lot coming from you.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I do. You're brilliant at what you do, Xavier. And you always consider the human element in your technology.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's what I've been focusing on with this project. Making sure it's not just efficient but also user-friendly for everyone in Stonewich.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "I've been struggling with this for months. Balancing innovation with stability is hard.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-xavier-resolution',
  },
  'autumn-xavier-resolution': {
    id: 'autumn-xavier-resolution',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "Maybe we could present it to the team first? Get their feedback before taking it to the city council?",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "That's a great idea. A smaller test group would help refine it before a larger rollout.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "You know, I've been so caught up in the technical aspects that I forgot about the importance of collaboration.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "Working with you... it reminds me why I got into this field in the first place. To help people connect.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-introduction',
  },

  // Navarre's autumn route
  'autumn-navarre-path': {
    id: 'autumn-navarre-path',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "Navarre has been unusually quiet lately. He's usually so outgoing and social.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "Hey Maven, fancy a walk? I could use some fresh air.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Sure, Navarre. Is everything okay?",
        mood: 'concerned',
      },
      {
        character: 'navarre',
        text: "I received a job offer from a competing corporation. It's a significant promotion with more influence and a higher salary.",
        mood: 'conflicted',
      },
      {
        character: 'navarre',
        text: "But it would mean leaving Stonewich... leaving the team... leaving you.",
        mood: 'sad',
      }
    ],
    choices: [
      {
        text: "That's a big opportunity, but only you can decide what will truly make you happy.",
        affectionChanges: { navarre: 0.5 },
        nextSceneId: 'autumn-navarre-dilemma'
      },
      {
        text: "I understand, but I'd miss you terribly if you left. The team wouldn't be the same without you.",
        affectionChanges: { navarre: 1 },
        nextSceneId: 'autumn-navarre-dilemma'
      }
    ]
  },
  'autumn-navarre-dilemma': {
    id: 'autumn-navarre-dilemma',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'navarre',
        text: "That's just it. I've built my career on always taking the next step up, always chasing the next big opportunity.",
        mood: 'conflicted',
      },
      {
        character: 'navarre',
        text: "But for the first time, I'm hesitating. I've never felt so connected to a place... or to people... before.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "What's holding you back the most?",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "I've always defined success by my career achievements. But being here in Stonewich, working with the team, spending time with you...",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "I'm starting to wonder if there's more to success than just climbing the corporate ladder.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-navarre-resolution',
  },
  'autumn-navarre-resolution': {
    id: 'autumn-navarre-resolution',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "Maybe success is also about finding where you truly belong and what makes you genuinely happy.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "You know, that's exactly what I've been thinking. My whole life has been about moving forward, never staying in one place too long.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "But Stonewich feels different. For the first time, I'm considering what it might mean to put down roots.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Thank you for listening, Maven. You've given me a lot to think about.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-introduction',
  },

  // Etta's autumn route
  'autumn-etta-path': {
    id: 'autumn-etta-path',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'maven',
        text: "Etta's been working even longer hours than usual lately. I'm getting worried about her.",
        mood: 'concerned',
      },
      {
        character: 'etta',
        text: "Maven, could you look over these reports for me? I need to make sure they're perfect before I submit them to headquarters.",
        mood: 'stressed',
      },
      {
        character: 'maven',
        text: "Etta, these reports look fine. But you seem exhausted. When was the last time you took a break?",
        mood: 'concerned',
      },
      {
        character: 'etta',
        text: "Breaks are inefficient. There's too much at stake. The annual review is coming up, and our performance here determines everything.",
        mood: 'stressed',
      }
    ],
    choices: [
      {
        text: "Even the most efficient machines need maintenance. You can't keep pushing yourself like this.",
        affectionChanges: { etta: 1 },
        nextSceneId: 'autumn-etta-burnout'
      },
      {
        text: "What are you afraid will happen if you take a break?",
        affectionChanges: { etta: 0.5 },
        nextSceneId: 'autumn-etta-burnout'
      }
    ]
  },
  'autumn-etta-burnout': {
    id: 'autumn-etta-burnout',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "I... I can't fail, Maven. I've never failed at anything in my life.",
        mood: 'vulnerable',
      },
      {
        character: 'maven',
        text: "Taking care of yourself isn't failure, Etta. It's necessary.",
        mood: 'concerned',
      },
      {
        character: 'etta',
        text: "You don't understand. My entire identity is built around success and achievement. If I'm not the best, then what am I?",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "You're Etta. You're brilliant and driven and passionate. That doesn't change whether you're working or resting.",
        mood: 'sincere',
      }
    ],
    nextSceneId: 'autumn-etta-resolution',
  },
  'autumn-etta-resolution': {
    id: 'autumn-etta-resolution',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "No one's ever... seen me that way before. Just for who I am, not what I achieve.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Maybe it's time you started seeing yourself that way too.",
        mood: 'sincere',
      },
      {
        character: 'etta',
        text: "I don't know if I can change overnight. But... maybe I could try taking a short break. Just a small one.",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "Would you... would you come with me? To make sure I actually relax?",
        mood: 'embarrassed',
      },
      {
        character: 'maven',
        text: "I'd be happy to, Etta.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-introduction',
  },

  // Senara's autumn route
  'autumn-senara-path': {
    id: 'autumn-senara-path',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'maven',
        text: "I found Senara in the library again. She seems troubled about something.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "Maven. I didn't hear you come in.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Sorry, I didn't mean to startle you. What are you researching?",
        mood: 'curious',
      },
      {
        character: 'senara',
        text: "I've discovered some concerning data in the city's historical records. There are patterns suggesting that Cybaton's involvement in Stonewich goes back further than the official contract.",
        mood: 'serious',
      },
      {
        character: 'senara',
        text: "I'm torn between my loyalty to the company and my commitment to truth and knowledge.",
        mood: 'conflicted',
      }
    ],
    choices: [
      {
        text: "The truth matters, even when it's uncomfortable. What have you found exactly?",
        affectionChanges: { senara: 1 },
        nextSceneId: 'autumn-senara-truth'
      },
      {
        text: "That sounds concerning. Do you think there could be another explanation for what you've found?",
        affectionChanges: { senara: 0.5 },
        nextSceneId: 'autumn-senara-truth'
      }
    ]
  },
  'autumn-senara-truth': {
    id: 'autumn-senara-truth',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "There are indications that Cybaton may have had a hand in some of the 'natural' technological evolutions of Stonewich decades before the official contract.",
        mood: 'serious',
      },
      {
        character: 'senara',
        text: "Nothing illegal, per se. But there's evidence of subtle influence, guiding the city toward technologies that would eventually be compatible with Cybaton systems.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "That would mean the relationship between Stonewich and Cybaton isn't quite what everyone believes.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "Precisely. And now I'm facing an ethical dilemma. Do I pursue this line of inquiry? Do I report it to headquarters? Or do I let sleeping dogs lie?",
        mood: 'conflicted',
      }
    ],
    nextSceneId: 'autumn-senara-resolution',
  },
  'autumn-senara-resolution': {
    id: 'autumn-senara-resolution',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'maven',
        text: "What does your heart tell you is the right thing to do?",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "My heart? I usually rely on my mind for such matters.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Sometimes ethical questions need more than just logical analysis.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "You... might be right. I've always prided myself on my objectivity, but perhaps some matters require a different approach.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "Thank you, Maven. You've given me a new perspective to consider. I need to reflect on this further.",
        mood: 'grateful',
      }
    ],
    nextSceneId: 'autumn-festival-introduction',
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
        mood: 'thoughtful',
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
};

export default relationshipScenes;
