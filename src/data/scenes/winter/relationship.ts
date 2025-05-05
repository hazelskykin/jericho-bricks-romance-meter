
import { Scene } from '@/types/game';

const relationshipScenes: Record<string, Scene> = {
  // Confession scenes for each character
  'winter-confession': {
    id: 'winter-confession',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "With the annual review approaching, I can't help but think about what happens next... and about us.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-character-confession',
  },

  // Xavier's confession
  'winter-xavier-confession': {
    id: 'winter-xavier-confession',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "Maven, before we get our assignments from the annual review, there's something I need to tell you.",
        mood: 'nervous',
      },
      {
        character: 'xavier',
        text: "This year in Stonewich has changed me in ways I never expected. I came here focused on technology and systems, but I found something more important.",
        mood: 'sincere',
      },
      {
        character: 'xavier',
        text: "I found someone who understands me, who sees beyond the technical expertise to the person underneath.",
        mood: 'sincere',
      },
      {
        character: 'xavier',
        text: "Maven, I've fallen in love with you. And whatever happens with the review, I want you to know that.",
        mood: 'nervous',
      }
    ],
    choices: [
      {
        text: "I love you too, Xavier. You've shown me what it means to care deeply about others.",
        affectionChanges: { xavier: 2 },
        nextSceneId: 'winter-xavier-happy'
      },
      {
        text: "I care about you deeply, Xavier. Let's see what the future holds for us.",
        affectionChanges: { xavier: 1 },
        nextSceneId: 'winter-xavier-hopeful'
      }
    ]
  },
  'winter-xavier-happy': {
    id: 'winter-xavier-happy',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "You... you love me too? I was so nervous to tell you.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Whatever happens with the review, knowing how you feel gives me confidence that we'll face it together.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },
  'winter-xavier-hopeful': {
    id: 'winter-xavier-hopeful',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "That means a lot to me, Maven. I'm hopeful for our future, whatever form it takes.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Let's focus on the review for now, and then we can talk more about us.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },

  // Navarre's confession
  'winter-navarre-confession': {
    id: 'winter-navarre-confession',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'navarre',
        text: "Maven, I've been thinking a lot about what I told you during the autumn festival. About that job offer.",
        mood: 'serious',
      },
      {
        character: 'navarre',
        text: "I turned it down. And not just because of the team or Stonewich.",
        mood: 'sincere',
      },
      {
        character: 'navarre',
        text: "For the first time in my life, I've found someone who makes me want to stay. Who makes me think that all the networking and connections in the world don't compare to one real, meaningful connection.",
        mood: 'sincere',
      },
      {
        character: 'navarre',
        text: "I love you, Maven. And I want to see where this goes, beyond our assignment here.",
        mood: 'sincere',
      }
    ],
    choices: [
      {
        text: "I love you too, Navarre. You've shown me there's more to life than just following a predetermined path.",
        affectionChanges: { navarre: 2 },
        nextSceneId: 'winter-navarre-happy'
      },
      {
        text: "I care about you deeply, Navarre. Let's see where our paths take us.",
        affectionChanges: { navarre: 1 },
        nextSceneId: 'winter-navarre-hopeful'
      }
    ]
  },
  'winter-navarre-happy': {
    id: 'winter-navarre-happy',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'navarre',
        text: "You love me too? I was worried that my reputation might make you doubt my sincerity.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "This is the happiest I've been, Maven. And I promise, whatever happens with the review, we'll face it together.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },
  'winter-navarre-hopeful': {
    id: 'winter-navarre-hopeful',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'navarre',
        text: "I understand. Taking things slowly is probably wise. But know that my feelings for you are genuine.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "For now, let's focus on the upcoming review. We can talk more about us afterwards.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },

  // Etta's confession
  'winter-etta-confession': {
    id: 'winter-etta-confession',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "Maven, could I speak with you privately? It's about something important.",
        mood: 'nervous',
      },
      {
        character: 'etta',
        text: "I'm not good at this. Expressing... feelings. It's not something I've had much practice with.",
        mood: 'nervous',
      },
      {
        character: 'etta',
        text: "But I've learned so much from you this year. About balance. About seeing value beyond just achievement.",
        mood: 'sincere',
      },
      {
        character: 'etta',
        text: "What I'm trying to say is... I love you, Maven. And that terrifies me because it's not something I can control or optimize or perfect.",
        mood: 'vulnerable',
      }
    ],
    choices: [
      {
        text: "I love you too, Etta. You don't have to be perfect with me. Just be yourself.",
        affectionChanges: { etta: 2 },
        nextSceneId: 'winter-etta-happy'
      },
      {
        text: "I care about you deeply, Etta. Let's take things one step at a time.",
        affectionChanges: { etta: 1 },
        nextSceneId: 'winter-etta-hopeful'
      }
    ]
  },
  'winter-etta-happy': {
    id: 'winter-etta-happy',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "You... love me? Despite all my flaws and obsessions?",
        mood: 'surprised',
      },
      {
        character: 'etta',
        text: "I don't know what I did to deserve you, Maven. But I promise I'll try to be worthy of your love.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Let's get through this review together. Whatever comes next, we'll face it as a team.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },
  'winter-etta-hopeful': {
    id: 'winter-etta-hopeful',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "That's... a logical approach. Taking things step by step.",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "Thank you for being honest with me, Maven. I appreciate your care and consideration.",
        mood: 'sincere',
      },
      {
        character: 'etta',
        text: "For now, we should focus on the upcoming review. We can revisit this conversation afterwards.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },

  // Senara's confession
  'winter-senara-confession': {
    id: 'winter-senara-confession',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "Maven, I've been researching something quite different lately. Something I never expected to encounter in my analytical work.",
        mood: 'nervous',
      },
      {
        character: 'senara',
        text: "I've been studying my own emotional responses. Particularly those I experience in your presence.",
        mood: 'nervous',
      },
      {
        character: 'senara',
        text: "My conclusion, after thorough analysis, is that I've developed deep feelings for you. What most would call love.",
        mood: 'sincere',
      },
      {
        character: 'senara',
        text: "This isn't a subject I have expertise in. But I know what I feel is real and significant.",
        mood: 'sincere',
      }
    ],
    choices: [
      {
        text: "I love you too, Senara. Your mind and heart are equally beautiful to me.",
        affectionChanges: { senara: 2 },
        nextSceneId: 'winter-senara-happy'
      },
      {
        text: "I care about you deeply, Senara. Let's explore these feelings together.",
        affectionChanges: { senara: 1 },
        nextSceneId: 'winter-senara-hopeful'
      }
    ]
  },
  'winter-senara-happy': {
    id: 'winter-senara-happy',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "You... love me too? My analysis didn't account for this outcome.",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "This feeling is... overwhelming, in the best possible way.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Whatever the review brings, knowing that you share my feelings gives me a sense of peace I've never known before.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },
  'winter-senara-hopeful': {
    id: 'winter-senara-hopeful',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "A measured approach. Yes, that makes sense. Emotions are complex and deserve careful consideration.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "Thank you for your honesty, Maven. I value that greatly.",
        mood: 'sincere',
      },
      {
        character: 'senara',
        text: "For now, we should prepare for the review. But I look forward to our continued exploration of these feelings.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-review-preparation',
  },

  // Annual Review Preparation
  'winter-review-preparation': {
    id: 'winter-review-preparation',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "The annual review is tomorrow. It's hard to believe our year in Stonewich is coming to an end.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "We've accomplished so much together. The systems we've implemented have significantly improved city operations.",
        mood: 'proud',
      },
      {
        character: 'etta',
        text: "Our efficiency metrics are exceptional. I've compiled all the data for the presentation.",
        mood: 'confident',
      },
      {
        character: 'navarre',
        text: "And the community feedback has been overwhelmingly positive. We've built real relationships here.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've analyzed our performance against historical data. We've exceeded expectations in every measurable category.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-annual-review',
  },

  // Annual Review Scene
  'winter-annual-review': {
    id: 'winter-annual-review',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'drvoss',
        text: "Good morning, team. It's time for your annual review and future assignments.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "I've reviewed your reports and the data from Stonewich. Your team has performed admirably this year.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "The inclusion of Maven as a fifth 'Versa' role was experimental. We wanted to see how adaptability would influence team dynamics.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "The results have been... surprising. The team's performance has exceeded our projections by a significant margin.",
        mood: 'impressed',
      }
    ],
    nextSceneId: 'winter-future-assignments',
  },

  // Future Assignments Scene
  'winter-future-assignments': {
    id: 'winter-future-assignments',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'drvoss',
        text: "Now, for your future assignments. Cybaton has several options for your team.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "Option one: You remain together as a team and continue your work in Stonewich. The city has requested to extend your contract.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "Option two: The team is disbanded, and each of you is assigned to different projects where your individual skills are needed.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "Option three: You remain together as a team but are reassigned to a new city that could benefit from your collaborative approach.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "The decision will be based on company needs, but I'd like to hear your preferences.",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'd like to stay in Stonewich. We've built something special here.",
        affectionChanges: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
        nextSceneId: 'winter-team-responses'
      },
      {
        text: "I believe our team works well together. We should stay together, wherever we're needed.",
        affectionChanges: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
        nextSceneId: 'winter-team-responses'
      },
      {
        text: "I trust Cybaton to place us where we can be most effective.",
        nextSceneId: 'winter-team-responses'
      }
    ]
  },

  'winter-team-responses': {
    id: 'winter-team-responses',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'xavier',
        text: "I believe we've only scratched the surface of what we can accomplish in Stonewich. I'd prefer to stay and continue our work here.",
        mood: 'sincere',
      },
      {
        character: 'navarre',
        text: "The connections we've built in Stonewich are valuable. But ultimately, I want us to stay together as a team, wherever that may be.",
        mood: 'sincere',
      },
      {
        character: 'etta',
        text: "From an efficiency standpoint, keeping the team together makes the most sense. We've developed effective collaborative methods.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "My analysis suggests that our team's unique dynamics would be beneficial in any setting, but there's value in the continuity of remaining in Stonewich.",
        mood: 'thoughtful',
      },
      {
        character: 'drvoss',
        text: "Thank you for your input. I'll take your preferences into consideration. The final decision will be announced shortly.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-conclusion',
  },

  'winter-conclusion': {
    id: 'winter-conclusion',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'drvoss',
        text: "After reviewing all factors, I've made a decision regarding your team's future.",
        mood: 'neutral',
      },
      {
        character: 'drvoss',
        text: "Given your exceptional performance and the positive feedback from Stonewich, your team will remain together and continue your assignment there.",
        mood: 'pleased',
      },
      {
        character: 'drvoss',
        text: "Additionally, the 'Versa' role experiment has been deemed a success. Maven, you will continue as a permanent member of the team.",
        mood: 'pleased',
      },
      {
        character: 'drvoss',
        text: "Congratulations to all of you. Your work this year has set a new standard for Cybaton's city management teams.",
        mood: 'pleased',
      },
      {
        character: 'maven',
        text: "Thank you, Dr. Voss. We're honored to continue our work in Stonewich.",
        mood: 'grateful',
      }
    ],
    nextSceneId: 'winter-epilogue-check',
  },

  'winter-epilogue-check': {
    id: 'winter-epilogue-check',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'maven',
        text: "As Dr. Voss leaves the room, I catch the eye of my teammate. This next year in Stonewich promises to be even more exciting than the last.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'epilogue-intro',
  },
};

export default relationshipScenes;
