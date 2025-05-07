import { Scene } from '@/types/game';
import { CharacterId } from '@/types/game';

export const generateSeasonCharacterSelections = (
  season: string,
  characters: CharacterId[],
  openingText: string,
  followupText: string
): Record<string, Scene> => {
  const sceneMap: Record<string, Scene> = {};

  // Generate suffix like -1, -12, -123 for sceneId
  const generateSceneId = (visited: CharacterId[]): string => {
    if (visited.length === 0) return `${season}-character-selection`;
    const suffix = visited
      .map(c => (characters.indexOf(c) + 1).toString())
      .join('');
    return `${season}-character-selection-${suffix}`;
  };

  // Generate a Scene object for a given visited character combo
  const getScene = (visited: CharacterId[]): Scene => ({
    id: generateSceneId(visited),
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: visited.length > 0 ? followupText : openingText,
      }
    ],
  });

  // Generate all subsets of characters (powerset)
  const powerSet = (arr: CharacterId[]): CharacterId[][] =>
    arr.reduce<CharacterId[][]>(
      (acc, val) => acc.concat(acc.map(set => [...set, val])),
      [[]]
    );

  // Build all scene variants
  for (const visitedCombo of powerSet(characters)) {
    sceneMap[generateSceneId(visitedCombo)] = getScene(visitedCombo);
  }

  return sceneMap;
};
