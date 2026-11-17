import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

type BattleResultProps = {
  outcome: 'victory' | 'defeat';
  opponentName: string;
  opponentImage: ImageSourcePropType;
  onRestart: () => void;
};

export function BattleResult({ outcome, opponentName, opponentImage, onRestart }: BattleResultProps) {
  const victory = outcome === 'victory';
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>POJEDYNEK ZAKOŃCZONY</Text>
      <Image source={opponentImage} style={styles.portrait} resizeMode="cover" />
      <Text style={[styles.title, victory ? styles.victory : styles.defeat]}>
        {victory ? 'Zwycięstwo!' : 'Porażka…'}
      </Text>
      <Text style={styles.message}>
        {victory
          ? `${opponentName} został pokonany. Czas na kolejne wyzwanie.`
          : `${opponentName} wygrał pojedynek. Spróbuj ponownie.`}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRestart}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Nowy pojedynek</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: '#111714' },
  eyebrow: { color: '#b7a56c', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  portrait: { width: 190, height: 190, borderRadius: 30, marginTop: 30, borderWidth: 1, borderColor: '#735744' },
  title: { fontSize: 34, fontWeight: '900', marginTop: 24 },
  victory: { color: '#d8c775' },
  defeat: { color: '#dc8d77' },
  message: { color: '#c0c6b8', fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 320, marginTop: 12 },
  button: { backgroundColor: '#c7a84c', borderRadius: 13, paddingVertical: 15, paddingHorizontal: 28, marginTop: 34 },
  pressed: { opacity: 0.82 },
  buttonText: { color: '#171a12', fontSize: 13, fontWeight: '900' },
});
