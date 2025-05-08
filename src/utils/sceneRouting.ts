// src/utils/sceneRouting.ts
export function getCharacterSceneId(prefix: string, characterId: string): string {
  // Ensure there's no trailing hyphen in the prefix
  const cleanedPrefix = prefix.endsWith('-') ? prefix.slice(0, -1) : prefix;
  return `${cleanedPrefix}-${characterId}`;
}
