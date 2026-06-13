import { useEffect, useRef } from 'react';

// Thin wrapper over the CrazyGames HTML5 SDK v3. The SDK global is injected by the
// <script> in index.html; off-platform (local dev) it runs in "disabled" mode and
// every call is a safe no-op, so the game behaves identically with or without it.
export function useCrazyGames() {
  const gameplayActive = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const SDK = window.CrazyGames?.SDK;
      if (!SDK) return;
      try {
        await SDK.init();
      } catch (e) {
        if (!cancelled) console.warn('[crazygames] init failed:', e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const apiRef = useRef({
    loadingStart: () => { try { window.CrazyGames?.SDK?.game?.loadingStart(); } catch { /* no-op off-platform */ } },
    loadingStop: () => { try { window.CrazyGames?.SDK?.game?.loadingStop(); } catch { /* no-op */ } },
    gameplayStart: () => {
      if (gameplayActive.current) return;
      gameplayActive.current = true;
      try { window.CrazyGames?.SDK?.game?.gameplayStart(); } catch { /* no-op */ }
    },
    gameplayStop: () => {
      if (!gameplayActive.current) return;
      gameplayActive.current = false;
      try { window.CrazyGames?.SDK?.game?.gameplayStop(); } catch { /* no-op */ }
    },
    // Saved-progress bridge: cloud sync on-platform, localStorage fallback off it.
    getData: (key) => {
      try { return window.CrazyGames?.SDK?.data?.getItem(key) ?? localStorage.getItem(key); }
      catch { return null; }
    },
    setData: (key, value) => {
      try { window.CrazyGames?.SDK?.data?.setItem(key, value); } catch { /* no-op */ }
      try { localStorage.setItem(key, value); } catch { /* no-op */ }
    },
  });

  return apiRef.current;
}
