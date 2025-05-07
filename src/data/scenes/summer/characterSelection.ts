const generateCharacterSelectionScenes = (): Record<string, Scene> => {
  const characterOrder: CharacterId[] = ['xavier', 'navarre', 'etta', 'senara'];
  const sceneMap: Record<string, Scene> = {};

  const generateSceneId = (visited: CharacterId[]): string => {
    if (visited.length === 0) return 'summer-character-selection';
    const suffix = visited.map(c => (characterOrder.indexOf(c) + 1).toString()).join('');
    return `summer-character-selection-${suffix}`;
  };

  const getScene = (visited: CharacterId[]): Scene => ({
    id: generateSceneId(visited),
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: visited.length > 0
          ? "Who would you like to visit next to learn more about their role in the festival preparations?"
          : "As summer begins in Stonewich, take time to connect with your teammates before the festival.",
      }
    ],
  });

  const powerSet = (arr: CharacterId[]) => 
    arr.reduce((acc, val) => acc.concat(acc.map(set => [...set, val])), [[]]);

  for (const combo of powerSet(characterOrder)) {
    sceneMap[generateSceneId(combo)] = getScene(combo);
  }

  return sceneMap;
};

const summerCharacterSelections = generateCharacterSelectionScenes();
export default summerCharacterSelections;

