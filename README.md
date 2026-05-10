# The Way — The Life of Jesus Christ

An immersive browser-based 3D scroll experience telling the life of Jesus Christ through seven chapters of WebGL scenes.

**Tech:** PlayCanvas + React + Vite + GSAP + Howler.js + TailwindCSS

## Setup

```bash
npm install
npm run dev
```

## Structure

| Directory | Purpose |
|-----------|---------|
| `src/engine/chapters/` | 7 WebGL scene builders |
| `src/engine/particles/` | Starfield, dove, crowd, red rain |
| `src/engine/shaders/` | GLSL shaders (water ripple) |
| `src/hooks/` | Scroll, chapter, motion detection |
| `src/ui/` | Overlay text, progress bar, mute button |
| `src/audio/` | Howler.js audio manager |
| `src/data/chapters.js` | Central scripture + scene config |

## Chapters

1. **In the Beginning** — Deep space starfield
2. **The Manger** — Bethlehem stable
3. **The Baptism** — Water ripple + dove
4. **The Ministry** — Sermon on the mount
5. **The Last Supper** — Candlelit upper room
6. **The Cross** — Golgotha + red rain
7. **The Resurrection** — Empty tomb + blinding light

## Audio

Place ambient MP3 files in `public/audio/`:
- `chapter-1.mp3` through `chapter-7.mp3`

## Deploy

```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or any static host
```
