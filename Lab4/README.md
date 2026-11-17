# Pojedynek — Laboratorium 4

Aplikacja Expo / React Native demonstrująca `useState`, gesty, zapis stanu oraz
obsługę `AppState`.

Każdy nowy pojedynek losuje orka, goblina albo trolla; ten sam przeciwnik nie
pojawia się dwa razy z rzędu. Stan wytrzymałości obu stron jest aktualizowany
po każdym trafieniu, a po zakończeniu walki wyświetla się osobny ekran wyniku.
Komponenty przeciwników znajdują się w `src/enemies/`.

Logika gry jest w `src/game/` (`moves.ts`, `gameState.ts`, `resolveTurn.ts`).
Widok pojedynku składa się z komponentów w `src/components/`, a każdy z nich
trzyma własne style `StyleSheet`. React Native nie używa zwykłych plików CSS
dla natywnych widoków.

## Uruchomienie

```sh
npm install
npm run web
```

Aplikacja otworzy się w przeglądarce. Jeśli chcesz uruchomić ją na telefonie,
wykonaj `npx expo start`, a następnie zeskanuj kod QR w Expo Go.

Nie otwieraj bezpośrednio portu Metro `8081` w trakcie sesji mobilnej — może
zwrócić manifest Expo w formacie JSON zamiast strony aplikacji. Do web użyj
`npm run web` (albo uruchom `npx expo start` i naciśnij `w` w terminalu).

## Sterowanie

1. Naciśnij **Rozpocznij rundę**.
2. W polu walki przesuń palcem w górę (pchnięcie), w prawo (zamaszysty cios)
   albo przytrzymaj palec (blok).
3. Poczekaj na ruch przeciwnika. Jeśli aplikacja przejdzie w tło, jego tura
   zostanie wznowiona po powrocie.

Postęp rundy zapisuje się automatycznie na urządzeniu i jest przywracany przy
ponownym uruchomieniu aplikacji.
