import { OpponentId } from '../enemies/types';

export type Move = 'thrust' | 'swing' | 'block';
export type Phase = 'ready' | 'playerTurn' | 'enemyTurn' | 'finished';
export type Outcome = 'victory' | 'defeat';

export type GameState = {
  opponentId: OpponentId;
  playerStamina: number;
  enemyStamina: number;
  round: number;
  phase: Phase;
  outcome: Outcome | null;
  playerMove: Move | null;
  enemyMove: Move | null;
  message: string;
};
