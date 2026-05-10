import { useState, useEffect, useRef, useCallback } from 'react';
import { Application, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas';
import { SceneManager } from './engine/SceneManager.js';
import { AudioManager } from './audio/AudioManager.js';
import { useScrollProgress } from './hooks/useScrollProgress.js';
import { useChapter } from './hooks/useChapter.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';
import { Overlay } from './ui/Overlay.jsx';
import { ProgressBar } from './ui/ProgressBar.jsx';
import { MuteButton } from './ui/MuteButton.jsx';

export default function App() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const sceneManagerRef = useRef(null);
  const audioRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const settleTimerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { progress } = useScrollProgress();
  const { chapter, transitioning } = useChapter(reducedMotion ? 0 : progress);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const app = new Application(canvas);
    app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(RESOLUTION_AUTO);
    app.start();

    const handleResize = () => app.resizeCanvas();
    window.addEventListener('resize', handleResize);

    appRef.current = app;
    audioRef.current = new AudioManager();
    sceneManagerRef.current = new SceneManager(app);

    app.on('update', (dt) => {
      sceneManagerRef.current?.update(dt);
    });

    setReady(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      app.destroy();
    };
  }, []);

  useEffect(() => {
    if (!sceneManagerRef.current || !audioRef.current) return;

    sceneManagerRef.current.activateChapter(chapter);
    audioRef.current.playChapter(chapter);

    setShowOverlay(false);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);

    settleTimerRef.current = setTimeout(() => {
      setShowOverlay(true);
    }, 1000);

    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, [chapter]);

  const handleMute = useCallback(() => {
    return audioRef.current?.toggleMute() ?? false;
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="playcanvas" />
      <ProgressBar current={chapter} total={7} progress={progress} />
      <MuteButton onToggle={handleMute} />
      {ready && (
        <Overlay
          chapter={chapter}
          visible={showOverlay}
          transitioning={transitioning}
        />
      )}
      <div className="scroll-spacer" />
    </>
  );
}
