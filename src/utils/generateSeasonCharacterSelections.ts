import { Scene } from '@/types/game';
import { CharacterId } from '@/types/game';

export const generateSeasonCharacterSelections = (
  season: string,
  characters: CharacterId[],
  openingText: string,
  followupText: string
): Record<string, Scene> => {
  const sceneMap: Record<string, Scene> = {};

  const generateSceneId = (visited: CharacterId[]): string => {
    if (visited.length === 0) return `${season}-selection`;
    const suffix = visited.sort().join('-');
    return `${season}-${suffix}`;
  };

  const getScene = (visited: CharacterId[]): Scene => ({
    id: generateSceneId(visited),
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: visited.length > 0 ? followupText : openingText,
      },
    ],
  });

  const powerSet = (arr: CharacterId[]): CharacterId[][] =>
    arr.reduce<CharacterId[][]>(
      (acc, val) => acc.concat(acc.map(set => [...set, val])),
      [[]]
    );

  for (const visitedCombo of powerSet(characters)) {
    sceneMap[generateSceneId(visitedCombo)] = getScene(visitedCombo);
  }

  return sceneMap;
};
