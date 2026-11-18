import { ImageSourcePropType } from 'react-native';

export type OpponentId = 'orc' | 'goblin' | 'troll';

export type OpponentInfo = {
  id: OpponentId;
  name: string;
  title: string;
  strength: number;
  maxStamina: number;
  image: ImageSourcePropType;
};

export type EnemyProps = {
  stamina: number;
};
