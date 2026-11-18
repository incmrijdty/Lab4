import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { StaminaBar } from './StaminaBar';

type EnemyCardProps = {
  name: string;
  title: string;
  strength: number;
  maxStamina: number;
  stamina: number;
  image: ImageSourcePropType;
};

export function EnemyCard({ name, title, strength, maxStamina, stamina, image }: EnemyCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.portraitFrame}>
        <Image source={image} style={styles.portrait} resizeMode="cover" />
      </View>
      <View style={styles.info}>
        <View style={styles.heading}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.strengthBadge}>
            <Text style={styles.strengthLabel}>SIŁA</Text>
            <Text style={styles.strengthValue}>{strength}</Text>
          </View>
        </View>
        <StaminaBar label="Wytrzymałość" value={stamina} maximum={maxStamina} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 13, backgroundColor: '#241f1c', borderColor: '#56423a', borderWidth: 1, borderRadius: 18 },
  portraitFrame: { width: 82, height: 82, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#735744', backgroundColor: '#44352c' },
  portrait: { width: '100%', height: '100%' },
  info: { flex: 1, marginLeft: 13 },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  name: { color: '#f5e9dd', fontSize: 18, fontWeight: '800' },
  title: { color: '#b3a298', fontSize: 10, marginTop: 3 },
  strengthBadge: { width: 43, height: 43, borderRadius: 13, backgroundColor: '#303b31', alignItems: 'center', justifyContent: 'center' },
  strengthLabel: { color: '#a9b39f', fontSize: 7, fontWeight: '800', letterSpacing: 0.7 },
  strengthValue: { color: '#e5c76f', fontSize: 17, fontWeight: '800' },
});
