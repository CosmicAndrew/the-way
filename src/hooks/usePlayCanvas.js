import { useEffect, useRef, useCallback } from 'react';
import { Application, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas';

export function usePlayCanvas(canvasRef) {
  const appRef = useRef(null);
  const initializedRef = useRef(false);

  const init = useCallback(async () => {
    if (initializedRef.current || !canvasRef.current) return null;
    initializedRef.current = true;

    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(RESOLUTION_AUTO);

    app.start();

    const handleResize = () => app.resizeCanvas();
    window.addEventListener('resize', handleResize);

    appRef.current = { app, handleResize };
    return app;
  }, [canvasRef]);

  useEffect(() => {
    init();
    return () => {
      const ref = appRef.current;
      if (ref) {
        window.removeEventListener('resize', ref.handleResize);
        ref.app.destroy();
        appRef.current = null;
        initializedRef.current = false;
      }
    };
  }, [init]);

  return appRef;
}
