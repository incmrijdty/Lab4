import { EnemyCard } from '../components/EnemyCard';
import { EnemyProps, OpponentInfo } from './types';

export const goblinInfo: OpponentInfo = {
  id: 'goblin',
  name: 'Goblin',
  title: 'Zwinny rabuś',
  strength: 2,
  maxStamina: 64,
  image: require('../../assets/enemies/goblin.png'),
};

export function Goblin({ stamina }: EnemyProps) {
  return <EnemyCard {...goblinInfo} stamina={stamina} />;
}
