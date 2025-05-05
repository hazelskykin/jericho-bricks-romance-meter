
import { Scene } from '@/types/game';

const relationshipScenes: Record<string, Scene> = {
  // Xavier's autumn route
  'autumn-xavier-path': {
    id: 'autumn-xavier-path',
    background: 'stonewich-office',
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
        text: "I've been developing a new communications system for the city. It incorporates the latest Cybaton technology, but I wanted your perspective.",
        mood: 'nervous',
      },
      {
        character: 'xavier',
        text: "I'm worried that it might just be another way that people will be able to self-isolate rather than connect.",
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
        text: "Self-sufficiency isn't necessarily self-isolating. Let's look at it together.",
        affectionChanges: { xavier: 0.5 },
        nextSceneId: 'autumn-xavier-support'
      }
    ]
  },
  'autumn-xavier-support': {
    id: 'autumn-xavier-support',
    background: 'stonewich-office',
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
        text: "That's what I've been focusing on with this project. Making sure it's not just efficient and a good UI but does actual good for everyone in Stonewich.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "What inspired you to work on this? How did you come up with the idea for the design?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "You did, at least in part. Remember that day that we worked on synching the drones together?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Yes, of course, for the summer festival.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I was feeling pretty lonely that day, like I was just another drone fulfilling my presequenced actions.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "And then after hearing what Dr. Voss said, I thought about that day again. Systems can be efficient, but when wwe worked on it together, the result was much better.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I've been struggling with this for months. Balancing innovation with social adaptability is hard.",
        mood: 'thoughtful',
      }
      {
        character: 'maven',
        text: "Yes, it's a very thorny issue. Tell me more about your new system, Xavier. How do you envision that it'll make it better for Stonewich?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "At a high level, it takes social forums to a new engagement level. Let me give you a demonstration.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "For the next hour, Xavier takes you on a deep dive of his proposed new system and how it can foster new social connections and make communication in general more inclusive.",
      },
    ],
    nextSceneId: 'autumn-xavier-resolution',
  },
  'autumn-xavier-resolution': {
    id: 'autumn-xavier-resolution',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "Maybe we could present it to the team first as a small scale pilot? Get their feedback before taking it to the city council?",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "That's a great idea. A smaller test group would help refine it before a larger rollout.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "We can also see for ourselves if we're able to leverage the functionality to generate new connections like you envision.",
        mood: 'thoughtful',
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
      },
      {
        character: 'maven',
        text: "Are you still feeling lonely?",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "I've been working on resolving that feeling with a therapist, and it's been getting better. The time we've spent together has also helped me feel supported.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I'm glad you are finding ways to cope. I think your new communications system may be the catalyst for others in Stonewich to get that feeling of support too.",
        mood: 'happy',
      },
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
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "But it would mean leaving Stonewich... leaving the team... leaving you.",
        mood: 'sad',
      }
    ],
    choices: [
      {
        text: "That's a big opportunity, but the timing seems too perfect for coincidence.",
        affectionChanges: { navarre: 0.5 },
        nextSceneId: 'autumn-navarre-dilemma'
      },
      {
        text: "I'd miss you terribly if you left. But, it makes me wonder why now?",
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
        text: "That's just it. We countered their competitive pressure moves in the summer, so now they're taking a more aggressive approach.",
        mood: 'angry',
      },
      {
        character: 'navarre',
        text: "Before, I would have accepted it and happily moved on. But now, I am hesitating. Am I being played like a pawn? Do I have loyalties at stake?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What's holding you back the most?",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "Being here in Stonewich, working with the team, spending time with you...",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I'm starting to think about where I want to be and how my impact can shape that place for the better.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "How did you get this offer? Did they just send you a message? It doesn't seem like something you'd take so seriously from a corporate communication.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Good instincts. Morgan met me for dinner to bury the hatchet from the summer. She extended it to me person.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Morgan Thornfield? She seems even more interested in you than before.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "Jealous? It was a lovely dinner with a view of the water and soft lighting. She picked a great spot to soften me for her offer.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Maybe, I mean, no! Of course not.",
        mood: 'embarrassed',
      },
      {
        character: 'navarre',
        text: "Maybe I'll have to take Morgan to a nicer place to let her down easy, in the spirit of fostering good relationships.",
        mood: 'laughing',
      },
    ],
    nextSceneId: 'autumn-navarre-resolution',
  },
  'autumn-navarre-resolution': {
    id: 'autumn-navarre-resolution',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "Hi Navarre. How did Morgan take the news?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Like I would if I really wanted something to happen.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "...what does that mean?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Worried?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "That you'll leave for the competition? No, not really. That you and Morgan might reconcile and both leave to do something amazing together? Yes, definitely.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "You do have a wild imagination!",
        mood: 'laughing',
      },
      {
        character: 'maven',
        text: "So where do things really stand then?",
        mood: 'angry',
      },
      {
        character: 'navarre',
        text: "I've turned down the offer, but Morgan was ready to pitch an alternative as a way to continue a close collaboration.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How do you feel about that?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I'm where I want to be for now, and I'd like to see how things will unfold, here in Stonewich...and with you.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Oh, that's good, I mean, me too.",
        mood: 'embarrassed',
      },
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
