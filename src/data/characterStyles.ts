
import { CharacterId } from '@/types/game';

interface CharacterStyle {
  characterId: CharacterId;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  outfit: string;
  hairstyle: string;
  accessories: string;
  specialFeatures: string;
}

const characterStyles: Record<CharacterId, CharacterStyle> = {
  maven: {
    characterId: 'maven',
    primaryColor: '#0D98BA',
    secondaryColor: '#107D98',
    accentColor: '#5ECCE6',
    outfit: 'Casual but thoughtful clothing that adapts to different situations',
    hairstyle: 'Medium length, adaptable style that can be quickly adjusted',
    accessories: 'Minimal accessories with personal significance',
    specialFeatures: 'Observant eyes, adaptive posture'
  },
  xavier: {
    characterId: 'xavier',
    primaryColor: '#87CEEB',
    secondaryColor: '#6BB7D4',
    accentColor: '#A7DEF9',
    outfit: 'Practical but comfortable clothing with technological accessories',
    hairstyle: 'Neat but approachable style with soft edges',
    accessories: 'Tech-enhanced eyewear, support-themed elements',
    specialFeatures: 'Warm smile, tech-integrated elements'
  },
  navarre: {
    characterId: 'navarre',
    primaryColor: '#FFB347',
    secondaryColor: '#E89F30',
    accentColor: '#FFC875',
    outfit: 'Fashionable and slightly flamboyant clothing that stands out',
    hairstyle: 'Stylish with intentional styling, attention-grabbing',
    accessories: 'Statement jewelry or scarves that draw attention',
    specialFeatures: 'Charismatic expression, social confidence'
  },
  etta: {
    characterId: 'etta',
    primaryColor: '#FF5E5B',
    secondaryColor: '#E54542',
    accentColor: '#FF8A88',
    outfit: 'Structured, sharp outfit with clean lines and power elements',
    hairstyle: 'Precisely styled hair that never looks out of place',
    accessories: 'Minimal but striking accessories that convey authority',
    specialFeatures: 'Confident posture, focused expression'
  },
  senara: {
    characterId: 'senara',
    primaryColor: '#9C89FF',
    secondaryColor: '#8A77E2',
    accentColor: '#BAA9FF',
    outfit: 'Sophisticated but understated clothing with hidden complexity',
    hairstyle: 'Distinctive hairstyle that is both practical and unique',
    accessories: 'Subtle accessories that hint at an intellectual nature',
    specialFeatures: 'Gender-ambiguous styling, depth of character beyond first impressions'
  }
};

export default characterStyles;
