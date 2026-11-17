import { ComponentType } from 'react';
import { Goblin, goblinInfo } from './Goblin';
import { Orc, orcInfo } from './Orc';
import { Troll, trollInfo } from './Troll';
import { EnemyProps, OpponentId, OpponentInfo } from './types';

export const OPPONENTS: Record<OpponentId, OpponentInfo> = {
  orc: orcInfo,
  goblin: goblinInfo,
  troll: trollInfo,
};

export const ENEMY_COMPONENTS: Record<OpponentId, ComponentType<EnemyProps>> = {
  orc: Orc,
  goblin: Goblin,
  troll: Troll,
};

export function randomOpponent(previousOpponentId?: OpponentId): OpponentInfo {
  const opponents = Object.values(OPPONENTS).filter((opponent) => opponent.id !== previousOpponentId);
  const availableOpponents = opponents.length > 0 ? opponents : Object.values(OPPONENTS);
  return availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
}
