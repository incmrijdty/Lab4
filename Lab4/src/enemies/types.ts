import { ImageSourcePropType } from 'react-native';

export const ENEMY_MAX_STAMINA = 72;

export type OpponentId = 'orc' | 'goblin' | 'troll';

export type OpponentInfo = {
  id: OpponentId;
  name: string;
  title: string;
  strength: number;
  image: ImageSourcePropType;
};

export type EnemyProps = {
  stamina: number;
};
