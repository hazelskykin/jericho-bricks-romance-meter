
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
        text: "Maven receives a private message from Dr. Voss a few days after the team assignments were revealed.",
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
    background: 'cybaton-meeting-room',
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
        text: "Dr. Voss: The 'Versa' role was more than just an additional team member. There have been many experiements related to optimizing team configurations, after all. Versa was an experiment in adaptability and empathy.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: As with any experiment, an environment was carefully constructed to minimize the impact to the stimuli under study.",
      },
      {
        character: 'maven',
        text: "Stonewich? Yes, it seemed ideal for us as a learning environment for a new team with an established position and stability.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Almost too stable for the purposes of the experiment. Fortunately, Cybaton could adjust those factors easily - as it was an entirely artificial environment.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss waited patiently for a moment while Maven absorbed the meaning of this revelation.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: I can see you understand the situation now. The Stonewich and experiences with the deployed team this past year have been a simulation run with your participation to determine the viability of the Versa role.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Let me say again, your performance was exceptional. What makes you unique, Maven, is your ability for insight to people and empathetic motivations.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The predicted impact of your influence on your teammates has been remarkable. Each of them has grown in ways we couldn't have predicted but nonetheless hoped to see achieved.",
      },
      {
        character: 'maven',
        text: "I'm not sure I understand. Are you saying I was tested as team catalyst in an artifical environment and that nothing from I experienced in the past year was in reality?",
        mood: 'shocked',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Yes, in part. Your team members were also in the experiment with you. Your interactions with them were real as that was the point of the experiment. Our simulated environment could not have predicted these results.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Although there may be some discrepancies in experience, your team members will be transitioning to their new roles to the real city of Stonewich. Memories are flexible constructs, and they likely won't remember it wasn't real within a short time.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: As for you, we're creating a new division at Cybaton focused on human-centric city management, and we want you to lead it.",
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
      },
    ],
    nextSceneId: 'versa-epilogue-decision',
  },

  'versa-epilogue-decision': {
    id: 'versa-epilogue-decision',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "This is a lot to take in. Just how long was the experiment?",
        mood: 'surprised',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Today is the seventh day, approximately one day for transition at beginning and end, one day for each season, and today.",
      },
      {
        character: 'maven',
        text: "Do you mean that I'm still in the simulation experiment right now?",
        mood: 'shocked',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Yes, of course. We needed to know your decision before we transition you.",
      },
      {
        character: 'maven',
        text: "What if I don't want to lead the division?",
        mood: 'sad',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: You'll be released.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: I do hope we do not have to say our farewells. If you agree, you'll be transitioned back into the divison lead role.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: You'll be based here at the Cybaton HQ. The Cybaton shuttle is available for your convenience.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The choice is yours, Maven. You've earned the right to decide your own path forward.",
      },
    ],
    choices: [
      {
        text: "I accept the new role. I can make a wider impact. I believe in the team to move on and excel.",
        nextSceneId: 'versa-epilogue-accept'
      },
      {
        text: "I appreciate the offer, but my place is in Stonewich.",
        nextSceneId: 'versa-epilogue-decline'
      },
    ]
  },

  'versa-epilogue-accept': {
    id: 'versa-epilogue-accept',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'maven',
        text: "I accept the position. I believe I can make a wider impact for Cybaton like my team was able to achieve in Stonewich.",
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
        text: "Her connections in Stonewich fostered new connections elsewhere. She influences city administration on a global scale as she had for Stonewich.",
      },
      {
        character: 'narrator',
        text: "This is just the beginning of a new chapter in Maven's journey...",
      },
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
        text: "Dr. Voss: Certainly, I understand. It's disappointing, but your loyalty is admirable, and in its own way, confirms that our experiment was a success.",
      },
      {
        character: 'maven',
        text: "Thank you for understanding. I believe I can make the most difference by continuing my work with my team.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: We won't be able to extend this offer again to you unless you agree to another simulation environment. In the meantime, we'll provide additional resources to support the team in Stonewich.",
      },
      {
        character: 'narrator',
        text: "Maven is returned to reality with more self-awareness and confidence, but the inescapable feeling that she has forgotten something important.",
      },
      {
        character: 'narrator',
        text: "Over the next few years, Maven finds career success in a number of successive roles. A restlessness in her soul makes it hard to fully appreciate her accomplishments.",
      },
      {
        character: 'narrator',
        text: "A rare break in her demanding schedule has left her with a few days to spend in a charming port city during one of their seasonal festivals.",
      },
      {
        character: 'narrator',
        text: "Coming full circle at Stonewich, Maven at last feels at peace as if she has come home again. She suddenly recalls a poem she knew not from where, 'I am the master of my fate: I am the captain of my soul'.",
      },
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
      },
    ],
    choices: [
      {
        text: "Return to Main Menu",
        nextSceneId: 'start'
      },
      {
        text: "About Jericho Bricks",
        nextSceneId: 'about'
      },
    ]
  },
};

export default versaEpilogueScenes;
