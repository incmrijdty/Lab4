import { ImageSourcePropType } from 'react-native';
import { Move } from './types';

export const PLAYER_STRENGTH = 3;

export const MOVES: Record<Move, { label: string; gesture: string; image: ImageSourcePropType }> = {
  thrust: {
    label: 'Pchnięcie',
    gesture: 'Przesuń w górę',
    image: require('../../assets/moves/push.jpg'),
  },
  swing: {
    label: 'Zamaszysty cios',
    gesture: 'Przesuń w prawo',
    image: require('../../assets/moves/swing.jpg'),
  },
  block: {
    label: 'Blok',
    gesture: 'Przytrzymaj',
    image: require('../../assets/moves/block.jpg'),
  },
};

export const SOUND_EFFECTS = {
  clash: require('../../assets/audio/clash.wav'),
  impact: require('../../assets/audio/impact.wav'),
  block: require('../../assets/audio/block.wav'),
};

export function isMove(value: unknown): value is Move {
  return value === 'thrust' || value === 'swing' || value === 'block';
}

export function rollDamage(strength: number): number {
  const dieRoll = Math.floor(Math.random() * 6) + 1;
  return Math.floor((dieRoll - 0.5) * strength);
}

export function beats(move: Move, other: Move): boolean {
  return (
    (move === 'thrust' && other === 'swing') ||
    (move === 'swing' && other === 'block') ||
    (move === 'block' && other === 'thrust')
  );
}

export function randomMove(): Move {
  const moves: Move[] = ['thrust', 'swing', 'block'];
  return moves[Math.floor(Math.random() * moves.length)];
}
