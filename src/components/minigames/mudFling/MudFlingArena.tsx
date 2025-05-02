import React from 'react';
import styled from 'styled-components';

// Define styled components
const Arena = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  background: url('/img/mud-arena-background.png');
  background-size: cover;
  border: 2px dashed brown;
  margin: 20px auto;
  overflow: hidden;
`;

const MudBallImage = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const CharacterImage = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${props => props.borderColor || 'white'};
  cursor: pointer;
`;

const Fountain = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(101, 67, 33, 0.7);
  border-radius: 50%;
  border: 2px solid saddlebrown;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
`;

// Define types
export interface MudBall {
  id: string;
  x: number;
  y: number;
}

export interface Character {
  id: string;
  name: string;
  x: number;
  y: number;
}

// Update the props interface to include the ref property
export interface MudFlingArenaProps {
  mudBalls: MudBall[];
  characters: Character[];
  selectedMudBall: string | null;
  fountainIntensity: 'low' | 'medium' | 'high';
  characterColors: Record<string, string>;
  onMudBallClick: (ballId: string) => void;
  onGameAreaClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// Create a forwardRef component
const MudFlingArena = React.forwardRef<HTMLDivElement, MudFlingArenaProps>(
  ({
    mudBalls,
    characters,
    selectedMudBall,
    fountainIntensity,
    characterColors,
    onMudBallClick,
    onGameAreaClick
  }, ref) => {
    return (
      <Arena ref={ref} onClick={onGameAreaClick}>
        <Fountain>Fountain</Fountain>
        {mudBalls.map(ball => (
          <MudBallImage
            key={ball.id}
            src="/img/mudball.png"
            alt="Mud Ball"
            style={{ left: ball.x, top: ball.y }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from propagating to the arena
              onMudBallClick(ball.id);
            }}
            className={selectedMudBall === ball.id ? 'selected' : ''}
          />
        ))}
        {characters.map(character => (
          <CharacterImage
            key={character.id}
            src={`/img/character-neutral.png`} // Replace with actual character image
            alt={character.name}
            style={{ left: character.x, top: character.y }}
            borderColor={characterColors[character.id]}
          />
        ))}
      </Arena>
    );
  }
);

MudFlingArena.displayName = 'MudFlingArena';

export default MudFlingArena;
