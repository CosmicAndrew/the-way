# The Way — CrazyGames Publishing Checklist

## Done (this branch)
- [x] Renders clean: 0 console errors across all 7 chapters (PlayCanvas 2.x fixes)
- [x] Scroll-driven chapter navigation works (was completely broken — no scroll height)
- [x] Code-split bundle: playcanvas / react / vendor chunks (was one 2MB index.js)
- [x] Save progress: scroll fraction persisted to localStorage, restored on load
- [x] 3-bus audio (narration/score/ambience), lazy-loaded, mute toggle
- [x] Reduced-motion fallback (static chapter 1, no scroll spacer)

## Required before submission
- [ ] **CrazyGames SDK** — add `https://sdk.crazygames.com/crazygames-sdk-v3.js`,
      call `CrazyGames.SDK.game.loadingStart()/loadingStop()` around PlayCanvas init,
      `gameplayStart()/gameplayStop()` on first scroll / tab blur.
      Docs: https://docs.crazygames.com/sdk/html5-v3/
- [ ] **Iframe-safe storage** — CrazyGames runs games in an iframe; localStorage can throw.
      Already try/catch'd; optionally switch to `CrazyGames.SDK.data` module for cloud saves.
- [ ] **Audio assets** — drop mp3s into `public/audio/{narration,score,ambience}/chapter-N.mp3`.
- [ ] **No external links / branding** (CrazyGames QA requirement).
- [ ] **Responsive check** — portrait mobile: verify overlay text scales (Tailwind breakpoints),
      canvas FILLMODE_FILL_WINDOW already handles resize.
- [ ] **Loading time** — target < 10s on 4G. Current JS ~2.2MB total split into parallel chunks;
      consider `playcanvas` ESM tree-shaking if more is needed.
- [ ] **QA pass** — test in https://developer.crazygames.com/ preview tool (iframe sandbox).

## Submission
- [ ] Build: `npm run build` → upload `dist/` zip on developer portal.
- [ ] Metadata: title, description, 16:9 cover (1920×1080), category: Casual/Art.
