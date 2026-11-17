import { StyleSheet, Text, View } from 'react-native';
import { PLAYER_MAX_STAMINA } from '../game/gameState';
import { PLAYER_STRENGTH } from '../game/moves';
import { StaminaBar } from './StaminaBar';

export function PlayerCard({ stamina }: { stamina: number }) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.icon}><Text style={styles.iconText}>⚔</Text></View>
        <View style={styles.details}>
          <Text style={styles.name}>Wędrowczyni</Text>
          <Text style={styles.title}>Obrończyni królestwa</Text>
        </View>
        <View style={styles.strengthBadge}>
          <Text style={styles.strengthLabel}>SIŁA</Text>
          <Text style={styles.strengthValue}>{PLAYER_STRENGTH}</Text>
        </View>
      </View>
      <StaminaBar label="Twoja wytrzymałość" value={stamina} maximum={PLAYER_MAX_STAMINA} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#202923', borderColor: '#465643', borderWidth: 1, borderRadius: 18, padding: 16 },
  heading: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3e4c37' },
  iconText: { color: '#e5c76f', fontSize: 23 },
  details: { flex: 1, marginLeft: 12 },
  name: { color: '#f4f0e5', fontSize: 17, fontWeight: '800' },
  title: { color: '#aeb8ac', fontSize: 11, marginTop: 3 },
  strengthBadge: { width: 43, height: 43, borderRadius: 13, backgroundColor: '#303b31', alignItems: 'center', justifyContent: 'center' },
  strengthLabel: { color: '#a9b39f', fontSize: 7, fontWeight: '800', letterSpacing: 0.7 },
  strengthValue: { color: '#e5c76f', fontSize: 17, fontWeight: '800' },
});
