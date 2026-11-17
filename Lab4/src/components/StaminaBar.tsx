import { StyleSheet, Text, View } from 'react-native';

type StaminaBarProps = {
  label: string;
  value: number;
  maximum: number;
};

export function StaminaBar({ label, value, maximum }: StaminaBarProps) {
  const percentage = Math.max(0, Math.min(1, value / maximum));
  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.ceil(value)} / {maximum}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 1 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  label: { color: '#c4cbbd', fontSize: 10, fontWeight: '600' },
  value: { color: '#e3e7d9', fontSize: 10, fontWeight: '800' },
  track: { height: 7, borderRadius: 5, backgroundColor: '#121814', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5, backgroundColor: '#a0b96f' },
});
