import { ComponentType } from 'react';
import { AppStateStatus, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EnemyProps, OpponentInfo } from '../enemies/types';
import { GameState, Move } from '../game/types';
import { BattleStatus } from './BattleStatus';
import { DuelHeader } from './DuelHeader';
import { MoveSelector } from './MoveSelector';
import { PlayerCard } from './PlayerCard';

type BattleScreenProps = {
  game: GameState;
  opponent: OpponentInfo;
  Enemy: ComponentType<EnemyProps>;
  appState: AppStateStatus;
  errorMessage: string | null;
  onStartRound: () => void;
  onChooseMove: (move: Move) => void;
};

export function BattleScreen({
  game,
  opponent,
  Enemy,
  appState,
  errorMessage,
  onStartRound,
  onChooseMove,
}: BattleScreenProps) {
  const playerCanMove = game.phase === 'playerTurn';

  return (
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <DuelHeader round={game.round} />
      <PlayerCard stamina={game.playerStamina} />
      <View style={styles.versusRow}>
        <View style={styles.versusLine} />
        <View style={styles.versusBadge}><Text style={styles.versusText}>VS</Text></View>
        <View style={styles.versusLine} />
      </View>
      <Enemy stamina={game.enemyStamina} />
      <BattleStatus
        message={game.message}
        playerMove={game.playerMove}
        enemyMove={game.enemyMove}
        opponentName={opponent.name}
      />

      {playerCanMove ? <MoveSelector onChooseMove={onChooseMove} /> : null}

      {game.phase === 'enemyTurn' ? (
        <View style={styles.waitingCard}>
          <View style={styles.pulseDot} />
          <Text style={styles.waitingText}>
            {appState === 'active' ? `${opponent.name} odpowiada…` : 'Walka wstrzymana — przeciwnik poczeka na Twój powrót.'}
          </Text>
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: game.phase !== 'ready' }}
        disabled={game.phase !== 'ready'}
        onPress={onStartRound}
        style={({ pressed }) => [
          styles.primaryButton,
          game.phase !== 'ready' && styles.disabledButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={styles.primaryButtonText}>
          {game.phase === 'ready' ? 'Rozpocznij rundę' : 'Runda w toku'}
        </Text>
      </Pressable>

      <View style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>Zasady pojedynku</Text>
        <Text style={styles.rulesText}>Pchnięcie pokonuje zamaszysty cios  •  Zamaszysty cios pokonuje blok  •  Blok pokonuje pchnięcie</Text>
        <Text style={styles.rulesText}>Obrażenia = ⌊(wynik k6 − ½) × siła⌋</Text>
      </View>

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      <Text style={styles.saveNote}>Postęp walki zapisuje się automatycznie na tym urządzeniu.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { width: '100%', maxWidth: 620, alignSelf: 'center', paddingHorizontal: 22, paddingTop: 16, paddingBottom: 36 },
  versusRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 11, paddingHorizontal: 18 },
  versusLine: { height: 1, flex: 1, backgroundColor: '#303a33' },
  versusBadge: { borderWidth: 1, borderColor: '#39463b', borderRadius: 20, width: 38, height: 30, alignItems: 'center', justifyContent: 'center', marginHorizontal: 12, backgroundColor: '#19211b' },
  versusText: { color: '#c2b578', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  waitingCard: { flexDirection: 'row', alignItems: 'center', marginTop: 17, padding: 14, backgroundColor: '#242b25', borderRadius: 13, borderWidth: 1, borderColor: '#475344' },
  pulseDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#e1be5f', marginRight: 10 },
  waitingText: { flex: 1, color: '#d8d7c8', fontSize: 11, fontWeight: '600', lineHeight: 17 },
  primaryButton: { backgroundColor: '#c7a84c', borderRadius: 13, paddingVertical: 15, alignItems: 'center', justifyContent: 'center', marginTop: 19, minHeight: 52 },
  disabledButton: { backgroundColor: '#44483d' },
  pressedButton: { opacity: 0.82 },
  primaryButtonText: { color: '#171a12', fontSize: 13, fontWeight: '900', letterSpacing: 0.3 },
  rulesCard: { backgroundColor: '#191f1a', borderRadius: 14, padding: 14, marginTop: 15 },
  rulesTitle: { color: '#d5c887', fontSize: 10, fontWeight: '900', marginBottom: 7 },
  rulesText: { color: '#9ca799', fontSize: 9, lineHeight: 15, marginTop: 3 },
  errorCard: { marginTop: 12, backgroundColor: '#3a2421', borderColor: '#8a5548', borderWidth: 1, borderRadius: 12, padding: 12 },
  errorText: { color: '#f0c4b8', fontSize: 11, lineHeight: 16 },
  saveNote: { color: '#768176', textAlign: 'center', fontSize: 9, marginTop: 15 },
});
