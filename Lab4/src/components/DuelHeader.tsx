import { StyleSheet, Text, View } from 'react-native';

export function DuelHeader({ round }: { round: number }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>ARENA • LABORATORIUM 4</Text>
        <Text style={styles.title}>Pojedynek</Text>
      </View>
      <View style={styles.roundBadge}>
        <Text style={styles.roundLabel}>RUNDA</Text>
        <Text style={styles.roundValue}>{String(round).padStart(2, '0')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  eyebrow: { color: '#b7a56c', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  title: { color: '#f5f0e2', fontSize: 32, fontWeight: '800', letterSpacing: 0.2, marginTop: 3 },
  roundBadge: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#202923', borderColor: '#39473d', borderWidth: 1, borderRadius: 13, width: 61, height: 58 },
  roundLabel: { color: '#9eaa9f', fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  roundValue: { color: '#e5c76f', fontSize: 21, fontWeight: '800', marginTop: 1 },
});
