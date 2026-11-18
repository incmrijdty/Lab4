import { EnemyCard } from '../components/EnemyCard';
import { EnemyProps, OpponentInfo } from './types';

export const orcInfo: OpponentInfo = {
  id: 'orc',
  name: 'Ork',
  title: 'Wojownik z północy',
  strength: 3,
  maxStamina: 72,
  image: require('../../assets/enemies/orc.png'),
};

export function Orc({ stamina }: EnemyProps) {
  return <EnemyCard {...orcInfo} stamina={stamina} />;
}
