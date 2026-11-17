import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MOVES } from '../game/moves';
import { Move } from '../game/types';

type MoveSelectorProps = {
  onChooseMove: (move: Move) => void;
};

export function MoveSelector({ onChooseMove }: MoveSelectorProps) {
  const gesture = useMemo(() => {
    const swipe = Gesture.Pan()
      .activeOffsetX([-35, 35])
      .activeOffsetY([-35, 35])
      .onEnd((event) => {
        if (event.translationY < -55 && Math.abs(event.translationY) > Math.abs(event.translationX)) {
          onChooseMove('thrust');
        } else if (event.translationX > 55 && Math.abs(event.translationX) > Math.abs(event.translationY)) {
          onChooseMove('swing');
        }
      })
      .runOnJS(true);
    const hold = Gesture.LongPress()
      .minDuration(550)
      .maxDistance(24)
      .onStart(() => onChooseMove('block'))
      .runOnJS(true);
    return Gesture.Race(swipe, hold);
  }, [onChooseMove]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Wybierz swój ruch</Text>
        <Text style={styles.sectionHint}>Użyj gestu na polu poniżej</Text>
      </View>
      <GestureDetector gesture={gesture}>
        <View style={styles.gesturePad}>
          <Text style={styles.gesturePadTitle}>Wykonaj gest, aby zaatakować lub się bronić</Text>
          <View style={styles.movesRow}>
            {(Object.keys(MOVES) as Move[]).map((move) => (
              <View key={move} style={styles.moveCard}>
                <Image source={MOVES[move].image} style={styles.moveImage} resizeMode="cover" />
                <Text style={styles.moveName}>{MOVES[move].label}</Text>
                <Text style={styles.moveGesture}>{MOVES[move].gesture}</Text>
              </View>
            ))}
          </View>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 21 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { color: '#f0ebdd', fontSize: 15, fontWeight: '800' },
  sectionHint: { color: '#879387', fontSize: 9 },
  gesturePad: { backgroundColor: '#1b231e', borderWidth: 1, borderColor: '#37463a', borderStyle: 'dashed', borderRadius: 16, padding: 12 },
  gesturePadTitle: { color: '#b5c0af', fontSize: 10, textAlign: 'center', marginBottom: 11 },
  movesRow: { flexDirection: 'row', gap: 8 },
  moveCard: { flex: 1, alignItems: 'center', minWidth: 0 },
  moveImage: { width: '100%', height: 74, borderRadius: 10, backgroundColor: '#3e4035' },
  moveName: { color: '#eee8d8', fontSize: 9, fontWeight: '800', textAlign: 'center', marginTop: 7 },
  moveGesture: { color: '#93a18f', fontSize: 8, textAlign: 'center', marginTop: 3 },
});
