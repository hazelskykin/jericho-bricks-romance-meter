
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
    background: 'autumn-transition',
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
    background: 'autumn-transition',
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
        character: 'narrator',
        text: "The next day you catch Navarre when he stops by the office.",
        mood: 'neutral',
      },
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
        mood: 'sad',
      },
      {
        character: 'etta',
        text: "Maven, could you look over these reports for me? I need to make sure they're perfect before I submit them to headquarters.",
        mood: 'angry',
      },
      {
        character: 'maven',
        text: "Etta, these reports look fine. But you seem exhausted. When was the last time you took a break?",
        mood: 'sad',
      },
      {
        character: 'etta',
        text: "There's too much at stake. The annual review is coming up, and our performance here determines everything.",
        mood: 'angry',
      }
    ],
    choices: [
      {
        text: "You can't keep pushing yourself like this. Let's go!",
        affectionChanges: { etta: 1 },
        nextSceneId: 'autumn-etta-burnout'
      },
      {
        text: "What are you afraid will happen if you take a break? Let's find out if it's as bad you think.",
        affectionChanges: { etta: 0.5 },
        nextSceneId: 'autumn-etta-burnout'
      }
    ]
  },
  'autumn-etta-burnout': {
    id: 'autumn-etta-burnout',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "There! I have dragged you outside without your consent. Now tell me what's going on with you.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I... I can't fail, Maven. I've never failed at anything in my life.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "Why fear failure? It's just part of the process to get better.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "You don't understand. My entire identity, my family's reputation are built around success and achievement.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "You're Etta. You're brilliant and driven and passionate. That doesn't change whether you're working or resting, whether you've achieved a benchmark or missed the mark.",
        mood: 'neutral',
      }
      {
        character: 'etta',
        text: "I chose this path for myself, but if I can't be successful, then...my family is ready with an alternative.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What do you mean? You don't have to follow a different life path just because things might get rocky.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I think you might remember that my family owns Watanabe Enterprises? My father considers this job for Cybaton as a prelude to my career there.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Is that what you want?",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I don't know. It's not just the job though. They also have a suitor lined up for me.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "What? No one does arranged marriages in these modern times.",
        mood: 'surprised',
      },
      {
        character: 'etta',
        text: "Unfortunately, they do. And before Stonewich, I had agreed to the arrangement as a compromise with my father so I could work here.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Are you still thinking to go through with it?",
        mood: 'surprised',
      },
      {
        character: 'etta',
        text: "I'm not sure. I think part of the reason I've been so stressed and focused on work is because, well, I've been distracted by that.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Distracted? That would be news to me. I've never seen you anything but focused and determined.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Don't be dense. I'm talking about you. I have been distracted thinking about you instead of the one my father has arranged for me.",
        mood: 'embarrassed',
      },
      {
        character: 'etta',
        text: "Thanks for bringing me out for a break today, Maven, but I need to get back.",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: "Etta rushed back to the office before you had a chance to respond to her surprising revelations.",
      },
    ],
    nextSceneId: 'autumn-etta-resolution',
  },
  'autumn-etta-resolution': {
    id: 'autumn-etta-resolution',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'maven',
        text: "Hi, Etta. I've been thinking about what you said. You don't need to feel pressured to succeed to impress me. Just do what's right for you, be yourself.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "No one's ever... seen me that way before. Just for who I am, not what I achieve or the connections I represent. But you do.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Maybe it's time you started seeing yourself that way too.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I don't know. But... maybe I could try.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Would you... would you want to get to know one another more, in a more personal way?",
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
        character: 'narrator',
        text: "Senara had requested that you join him on a trip back to the Cybaton HQ library.",
      },
      {
        character: 'senara',
        text: "Maven. thanks for coming with me today.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Of course, although I'm not sure what we are doing here? Is there something I can help with?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Just being here with me is comforting in an unexpected way. I am scheduled to interface with the Cybaton oracle periodically.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The experience is a bit tedious, but more than that, it's rather dehumanizing.",
        mood: 'sad',
      }
    ],
    choices: [
      {
        text: "Who you are matters, as a person and not just a collection of data. Never forget that.",
        affectionChanges: { senara: 1 },
        nextSceneId: 'autumn-senara-truth'
      },
      {
        text: "That sounds concerning. Is this something you're forced to do in some way?",
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
        text: "Thank you for the concern. These sessions are not mandatory, but they offer a benefit that seems illogical to refuse.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Oh? What is that?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "Others can have access to the data I've collected, curated, and analyzed in my mind in a way that's unique for me to share.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Yes, I can see the benefit is hard to deny for others, but what do you get out of it?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Nothing tangible, if that's what you're asking. I do get to see what analysis others have done. Even with my processing powers, I do not have the interest or bandwidth in pursuing every line of inquiry.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I mean, we share information all the time. What makes this different to you?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Sharing in more conventional ways allows me to filter the information, just feels more natural. Sharing this way leaves me open without a filter, but I have nothing to hide so why not?",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "Anyone would feel vulnerable if others were privy to every data point and thought in their head.",
        mood: 'sad',
      },
      {
        character: 'senara',
        text: "Are you suggesting that others would find this objectionable, that they would refuse to do it?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "I can't speak for everyone, but if it doesn't feel right to you, then that's your answer.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "You've given me more to think about, Maven. Would you mind staying at my side while I complete the session today?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Of course. I'm here with you. I'm glad you felt you could ask me to support you like this.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "The interface time seemed brief to you, but Senara's usual calm expression showed subtle signs of weariness.",
      },
    ],
    nextSceneId: 'autumn-senara-resolution',
  },
  'autumn-senara-resolution': {
    id: 'autumn-senara-resolution',
    background: 'cybaton-shuttle',
    dialogue: [
      {
        character: 'senara',
        text: "Thank you once again for coming with me today.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Senara, are you alright? That seemed to take a lot out of you.",
        mood: 'sad',
      },
      {
        character: 'senara',
        text: "You can tell? I did not think others had such an acute level of neuroperceptor sensitivity.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Sometimes ethical questions need more than just logical analysis. After seeing what this does to you, are you certain you're not feeling pressured into it?",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "What does your heart tell you is the right thing to do?"
        mood: 'sad'
      },
      {
        character: 'senara',
        text: "My heart? Not my conscience or the logical conclusion? You ask the most difficult questions sometimes.",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "You... might be right. I've always prided myself on my objectivity, but perhaps some matters require a different approach.",
        mood: 'sad',
      },
      {
        character: 'senara',
        text: "I've been doing these interface sessions routinely without assessing it in the context of a consenting human adult.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "And now that you have?"
        mood: 'neutral'
      },
      {
        character: 'senara',
        text: "You surprise me again. Most people would back off to give the person time, but you realize that's not what I need."
        mood: 'surprised'
      },
      {
        character: 'senara',
        text: "I will not be doing the interface sessions going forward. I want the privacy of my thoughts to be sancrosanct."
        mood: 'neutral'
      },
      {
        character: 'maven',
        text: "How does that decision make you feel?"
        mood: 'neutral'
      },
      {
        character: 'senara',
        text: "Like a weight has been lifted. I never realized how oppressive I found that experience before."
        mood: 'happy'
      },
      {
        character: 'maven',
        text: "I've never seen you smile like that before."
        mood: 'happy'
      },
      {
        character: 'senara',
        text: "May I share a personal insight with you? This experience, today with you, has been a turning point for me, and I feel a closeness to you I have never felt with anyone else."
        mood: 'happy'
      },
      {
        character: 'maven',
        text: "I'm glad."
        mood: 'embarrassed'
      },
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
};

export default relationshipScenes;
