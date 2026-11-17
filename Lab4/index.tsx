import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BattleResult } from './src/components/BattleResult';
import { BattleScreen } from './src/components/BattleScreen';
import { ENEMY_COMPONENTS, OPPONENTS, randomOpponent } from './src/enemies';
import { beats, MOVES, randomMove, SOUND_EFFECTS } from './src/game/moves';
import { createGame, PLAYER_MAX_STAMINA, restoreGame, STORAGE_KEY } from './src/game/gameState';
import { GameState, Move } from './src/game/types';
import { resolveTurn } from './src/game/resolveTurn';

function App() {
  const [game, setGame] = useState<GameState>(() => createGame());
  const [hydrated, setHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState ?? 'active');
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  const opponent = OPPONENTS[game.opponentId];
  const Enemy = ENEMY_COMPONENTS[game.opponentId];

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!active) return;
        if (saved) {
          const restored = restoreGame(saved);
          if (restored) {
            setGame(restored);
          } else {
            setErrorMessage('Zapis gry jest nieprawidłowy. Rozpoczynam nową walkę.');
          }
        }
      })
      .catch(() => {
        if (active) setErrorMessage('Nie udało się odczytać zapisu gry. Postęp tej walki nie będzie dostępny.');
      })
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const snapshot = JSON.stringify(game);
    saveQueue.current = saveQueue.current
      .then(() => AsyncStorage.setItem(STORAGE_KEY, snapshot))
      .catch(() => {
        setErrorMessage('Nie udało się zapisać postępu. Sprawdź dostępne miejsce w urządzeniu.');
      });
  }, [game, hydrated]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setAppState);
    return () => subscription.remove();
  }, []);

  const playSound = useCallback(async (effect: keyof typeof SOUND_EFFECTS) => {
    try {
      const { sound } = await Audio.Sound.createAsync(SOUND_EFFECTS[effect], { shouldPlay: true });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) void sound.unloadAsync();
      });
    } catch {
      setErrorMessage('Nie udało się odtworzyć efektu dźwiękowego.');
    }
  }, []);

  useEffect(() => {
    if (game.phase !== 'enemyTurn' || appState !== 'active') return;
    const timeout = setTimeout(() => {
      if (!game.playerMove) return;
      const enemyMove = randomMove();
      void playSound(
        enemyMove === game.playerMove ? 'block' : beats(game.playerMove, enemyMove) ? 'clash' : 'impact',
      );
      setGame((current) => resolveTurn(current, enemyMove));
    }, 850);
    return () => clearTimeout(timeout);
  }, [appState, game.phase, game.playerMove, playSound]);

  const startRound = () => {
    setErrorMessage(null);
    setGame((current) => {
      if (current.phase !== 'ready') return current;
      return {
        ...current,
        phase: 'playerTurn',
        round: current.round + 1,
        playerMove: null,
        enemyMove: null,
        message: 'Wykonaj gest: pchnięcie, zamaszysty cios albo blok.',
      };
    });
  };

  const startNewFight = () => {
    setErrorMessage(null);
    setGame((current) => createGame(randomOpponent(current.opponentId).id));
    void playSound('clash');
  };

  const chooseMove = useCallback((move: Move) => {
    if (game.phase !== 'playerTurn') return;
    void playSound(move === 'block' ? 'block' : 'clash');
    setGame((current) =>
      current.phase === 'playerTurn'
        ? {
            ...current,
            phase: 'enemyTurn',
            playerMove: move,
            message: appState === 'active'
              ? `Wybrano „${MOVES[move].label}”. Przeciwnik szykuje odpowiedź…`
              : 'Przeciwnik zaczeka, aż wrócisz do aplikacji.',
          }
        : current,
    );
  }, [appState, game.phase, playSound]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />
          {!hydrated ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingTitle}>Pojedynek</Text>
              <Text style={styles.loadingText}>Wczytuję zapis walki…</Text>
            </View>
          ) : game.phase === 'finished' && game.outcome ? (
            <BattleResult
              outcome={game.outcome}
              opponentName={opponent.name}
              opponentImage={opponent.image}
              onRestart={startNewFight}
            />
          ) : (
            <BattleScreen
              game={game}
              opponent={opponent}
              Enemy={Enemy}
              appState={appState}
              errorMessage={errorMessage}
              onStartRound={startRound}
              onChooseMove={chooseMove}
            />
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111714' },
  safeArea: { flex: 1, backgroundColor: '#111714' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingTitle: { color: '#f5f0e2', fontSize: 27, fontWeight: '800' },
  loadingText: { color: '#b7a56c', fontSize: 12, marginTop: 9 },
});

registerRootComponent(App);
