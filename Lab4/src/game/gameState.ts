import { ENEMY_MAX_STAMINA, OpponentId } from '../enemies/types';
import { OPPONENTS, randomOpponent } from '../enemies';
import { GameState, Move, Outcome, Phase } from './types';
import { isMove } from './moves';

export const STORAGE_KEY = 'lab4-fantasy-duel-v1';
export const PLAYER_MAX_STAMINA = 100;

export function createGame(opponentId = randomOpponent().id): GameState {
  return {
    opponentId,
    playerStamina: PLAYER_MAX_STAMINA,
    enemyStamina: ENEMY_MAX_STAMINA,
    round: 0,
    phase: 'ready',
    outcome: null,
    playerMove: null,
    enemyMove: null,
    message: 'Przeciwnik czeka. Rozpocznij rundę, aby wybrać swój ruch.',
  };
}

export function restoreGame(value: string): GameState | null {
  try {
    const saved: unknown = JSON.parse(value);
    if (typeof saved !== 'object' || saved === null) return null;
    const data = saved as Omit<Partial<GameState>, 'phase'> & {
      phase?: Phase | 'enemyHit';
      pendingDamage?: { id: number; amount: number } | null;
    };
    const validOpponent = data.opponentId === 'orc' || data.opponentId === 'goblin' || data.opponentId === 'troll';
    const validPhase =
      data.phase === 'ready' ||
      data.phase === 'playerTurn' ||
      data.phase === 'enemyTurn' ||
      data.phase === 'enemyHit' ||
      data.phase === 'finished';
    const validOutcome = data.outcome === null || data.outcome === 'victory' || data.outcome === 'defeat';
    const validDamage =
      (data.phase !== 'enemyHit' && data.pendingDamage === undefined) ||
      data.pendingDamage === null ||
      (typeof data.pendingDamage === 'object' &&
        data.pendingDamage !== null &&
        Number.isInteger(data.pendingDamage.id) &&
        Number.isFinite(data.pendingDamage.amount) &&
        data.pendingDamage.amount >= 0);

    if (
      !validOpponent ||
      !validPhase ||
      !validOutcome ||
      !validDamage ||
      !Number.isFinite(data.playerStamina) ||
      !Number.isFinite(data.enemyStamina) ||
      !Number.isInteger(data.round) ||
      typeof data.message !== 'string' ||
      !(data.playerMove === null || isMove(data.playerMove)) ||
      !(data.enemyMove === null || isMove(data.enemyMove))
    ) {
      return null;
    }

    const enemyStamina =
      data.phase === 'enemyHit' && data.pendingDamage
        ? Math.max(0, data.enemyStamina! - data.pendingDamage.amount)
        : data.enemyStamina!;
    const outcome: Outcome | null = data.phase === 'enemyHit' && enemyStamina <= 0 ? 'victory' : data.outcome!;

    return {
      opponentId: data.opponentId! as OpponentId,
      playerStamina: data.playerStamina!,
      enemyStamina,
      round: data.round!,
      phase: data.phase === 'enemyHit' ? (outcome ? 'finished' : 'ready') : data.phase!,
      outcome,
      playerMove: data.playerMove! as Move | null,
      enemyMove: data.enemyMove! as Move | null,
      message: data.phase === 'enemyHit'
        ? outcome
          ? `${OPPONENTS[data.opponentId!].name} pada na ziemię. Zwycięstwo!`
          : 'Trafienie! Przeciwnik traci wytrzymałość.'
        : data.message!,
    };
  } catch {
    return null;
  }
}
