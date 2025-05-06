
import { Scene } from '@/types/game';

const versaEpilogueScenes: Record<string, Scene> = {
  'versa-epilogue-intro': {
    id: 'versa-epilogue-intro',
    background: 'cybaton-special',
    dialogue: [
      {
        character: 'narrator',
        text: "After experiencing all possible paths and relationships in Stonewich, a special ending is revealed...",
      },
      {
        character: 'narrator',
        text: "Six months after the team's continued assignment to Stonewich, Maven receives a private message from Dr. Voss.",
      },
      {
        character: 'maven',
        text: "Dr. Voss wants to meet with me privately? That's unusual.",
        mood: 'surprised',
      }
    ],
    nextSceneId: 'versa-epilogue-revelation',
  },

  'versa-epilogue-revelation': {
    id: 'versa-epilogue-revelation',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: "Dr. Voss: Maven, thank you for meeting with me. I have something important to discuss with you regarding the 'Versa' experiment.",
      },
      {
        character: 'maven',
        text: "Of course, Dr. Voss. I've been curious about that since you mentioned it at our annual review.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The 'Versa' role was more than just an additional team member. It was an experiment in adaptability and empathy.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: What makes you unique, Maven, is your ability to connect with different personality types and bring out the best in them.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your influence on your teammates has been remarkable. Each of them has grown in ways we couldn't have predicted.",
      },
      {
        character: 'maven',
        text: "I'm not sure I understand. Are you saying I was intentionally placed on the team as some kind of catalyst?",
        mood: 'surprised',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: In a way, yes. But the experiment has revealed something even more interesting.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: We're creating a new division at Cybaton focused on human-centric city management, and we want you to lead it.",
      },
      {
        character: 'maven',
        text: "Me? Lead a division?",
        mood: 'shocked',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your unique perspective and ability to understand different viewpoints makes you ideal for this role.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The 'Versa' experiment was designed to identify individuals with exceptional adaptability. You've exceeded all expectations.",
      }
    ],
    nextSceneId: 'versa-epilogue-decision',
  },

  'versa-epilogue-decision': {
    id: 'versa-epilogue-decision',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "This is a lot to take in. What about my team in Stonewich?",
        mood: 'thoughtful',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: They would remain there, of course. But you would visit regularly, implementing your new methodologies.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The choice is yours, Maven. You've earned the right to decide your own path forward.",
      }
    ],
    choices: [
      {
        text: "I accept the new role. I can make a wider impact while still supporting my team.",
        nextSceneId: 'versa-epilogue-accept'
      },
      {
        text: "I appreciate the offer, but my place is with my team in Stonewich.",
        nextSceneId: 'versa-epilogue-decline'
      }
    ]
  },

  'versa-epilogue-accept': {
    id: 'versa-epilogue-accept',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "I accept the position. I believe I can make a wider impact while still supporting my team in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Excellent. We'll begin preparations immediately. Congratulations, Maven.",
      },
      {
        character: 'maven',
        text: "Thank you for this opportunity, Dr. Voss. I won't let you down.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "With this decision, Maven steps into a new role, bringing her unique perspective to city management across Cybaton's territories.",
      },
      {
        character: 'narrator',
        text: "While maintaining her connections in Stonewich, she now has the opportunity to influence city administration on a global scale.",
      },
      {
        character: 'narrator',
        text: "This is just the beginning of a new chapter in Maven's journey...",
      }
    ],
    nextSceneId: 'versa-epilogue-complete',
  },

  'versa-epilogue-decline': {
    id: 'versa-epilogue-decline',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "I appreciate the offer, Dr. Voss, but my place is with my team in Stonewich. We've built something special there.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: I understand. Your loyalty is admirable, and in its own way, confirms that our experiment was a success.",
      },
      {
        character: 'maven',
        text: "Thank you for understanding. I believe I can make the most difference by continuing my work with my team.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The offer remains open, should you change your mind. In the meantime, we'll provide additional resources to support your work in Stonewich.",
      },
      {
        character: 'narrator',
        text: "Maven returns to Stonewich with renewed purpose, knowing that her choice to stay with her team was respected and valued.",
      },
      {
        character: 'narrator',
        text: "With new resources and support from Cybaton, the team's influence in Stonewich continues to grow...",
      }
    ],
    nextSceneId: 'versa-epilogue-complete',
  },

  'versa-epilogue-complete': {
    id: 'versa-epilogue-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Congratulations! You've completed the Versa epilogue and experienced the full story of Jericho Bricks.",
      },
      {
        character: 'narrator',
        text: "Thank you for playing!",
      }
    ],
    choices: [
      {
        text: "Return to Main Menu",
        nextSceneId: 'start'
      },
      {
        text: "About Jericho Bricks",
        nextSceneId: 'about'
      }
    ]
  },
};

export default versaEpilogueScenes;
