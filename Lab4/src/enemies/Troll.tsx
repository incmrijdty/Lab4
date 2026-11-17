import { EnemyCard } from '../components/EnemyCard';
import { EnemyProps, OpponentInfo } from './types';

export const trollInfo: OpponentInfo = {
  id: 'troll',
  name: 'Troll',
  title: 'Strażnik przełęczy',
  strength: 4,
  image: require('../../assets/enemies/troll.png'),
};

export function Troll({ stamina }: EnemyProps) {
  return <EnemyCard {...trollInfo} stamina={stamina} />;
}
