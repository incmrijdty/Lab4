import { StyleSheet, Text, View } from 'react-native';
import { Move } from '../game/types';
import { MOVES } from '../game/moves';

type BattleStatusProps = {
  message: string;
  playerMove: Move | null;
  enemyMove: Move | null;
  opponentName: string;
};

export function BattleStatus({ message, playerMove, enemyMove, opponentName }: BattleStatusProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>PRZEBIEG WALKI</Text>
      <Text style={styles.message}>{message}</Text>
      {playerMove || enemyMove ? (
        <Text style={styles.moves}>
          {playerMove ? `Ty: ${MOVES[playerMove].label}` : ''}
          {playerMove && enemyMove ? '   •   ' : ''}
          {enemyMove ? `${opponentName}: ${MOVES[enemyMove].label}` : ''}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 17, padding: 16, backgroundColor: '#1b231d', borderRadius: 15, borderWidth: 1, borderColor: '#354337' },
  eyebrow: { color: '#aeb89c', fontSize: 8, fontWeight: '900', letterSpacing: 1.4 },
  message: { color: '#f2eee2', fontSize: 14, fontWeight: '700', lineHeight: 20, marginTop: 6 },
  moves: { color: '#b7c0ad', fontSize: 10, marginTop: 8 },
});
