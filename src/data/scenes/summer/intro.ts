import { Scene } from '../../../types/game';

const summerIntroScenes: Record<string, Scene> = {
  'summer-intro': {
    id: 'summer-intro',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'The heat of summer arrives in Stonewich, bringing with it the excitement of the Summer Songs & Sips Festival.',
      },
      {
        character: 'navarre',
        text: "Summer in Stonewich is magical! The social energy is absolutely perfect for seeing and being seen.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The increased foot traffic and tourism during summer will be a good stress test for our systems.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I've upgraded the cooling systems in all the public squares to keep everyone comfortable during the outdoor events. Cool, bug-free zones!",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The musical lyrics of the city's oldest folksongs read like beautiful, timeless poetry. I'm interested to see how new music trends may be inspired by them.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Sampling summer flavors in different drinks sounds like it'll be a lot of fun.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "A dark cloud passes across the bright summer sun momentarily darkening the room, and Dr. Voss's words bubble up to darken your mood.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Ah, has anyone had any clues as to what Dr. Voss might have been referring to at our spring report meeting?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Don't you think she just hints vaguely at doom and gloom to all the teams as a work hard motivation speech?",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Definitely! I haven't given it another thought. I run diagnostics and systems checks all the time, and this city is in fine shape.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I agree. Anything expressed so vaguely is not worth investing time or thought to worry over when there's concrete tasks that need my attention.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Dr. Voss seemed rather serious when she talked about it, but I suppose you must be right.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You still feel a bit uneasy about the state of Stonewich given what Dr.Voss said, but you take the cue from your team and focus on more practical tasks for now.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Maven, are you planning to shadow us all again?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Is that an invitation? Yes, I'd love to!",
        mood: 'happy',
      },
    ],
    // This would typically point to a summer character selection or planning scene
    nextSceneId: 'summer-visit-character',
  },
};

export default summerIntroScenes;
