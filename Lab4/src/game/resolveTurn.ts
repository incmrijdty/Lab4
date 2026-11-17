import { OPPONENTS } from '../enemies';
import { beats, MOVES, PLAYER_STRENGTH, rollDamage } from './moves';
import { GameState, Move } from './types';

export function resolveTurn(game: GameState, enemyMove: Move): GameState {
  if (game.phase !== 'enemyTurn' || !game.playerMove) return game;

  if (enemyMove === game.playerMove) {
    return {
      ...game,
      phase: 'playerTurn',
      playerMove: null,
      enemyMove: null,
      message: `Remis — obie strony wykonały ruch „${MOVES[enemyMove].label.toLowerCase()}”. Nikt nie traci wytrzymałości; wybierz kolejny ruch w tej rundzie.`,
    };
  }

  if (beats(game.playerMove, enemyMove)) {
    const damage = rollDamage(PLAYER_STRENGTH);
    const enemyStamina = Math.max(0, game.enemyStamina - damage);
    const defeated = enemyStamina <= 0;
    return {
      ...game,
      phase: defeated ? 'finished' : 'ready',
      enemyMove,
      enemyStamina,
      outcome: defeated ? 'victory' : null,
      message: defeated
        ? `Zadajesz ${damage} obrażeń. ${OPPONENTS[game.opponentId].name} nie może już walczyć.`
        : `Twoje ${MOVES[game.playerMove].label.toLowerCase()} wygrywa z ruchem przeciwnika! Zadajesz ${damage} obrażeń.`,
    };
  }

  const damage = rollDamage(OPPONENTS[game.opponentId].strength);
  const playerStamina = Math.max(0, game.playerStamina - damage);
  const defeated = playerStamina <= 0;
  return {
    ...game,
    phase: defeated ? 'finished' : 'ready',
    enemyMove,
    playerStamina,
    outcome: defeated ? 'defeat' : null,
    message: defeated
      ? `Otrzymujesz ${damage} obrażeń. Nie możesz już walczyć. Porażka…`
      : `Przeciwnik wygrywa wymianę i zadaje ${damage} obrażeń.`,
  };
}
