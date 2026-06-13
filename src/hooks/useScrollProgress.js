import { useState, useEffect } from 'react';

const SAVE_KEY = 'the-way:progress';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId;
    let saveTimer = null;

    // Restore last position (saved as a fraction so it survives layout changes).
    try {
      const saved = parseFloat(localStorage.getItem(SAVE_KEY));
      if (saved > 0 && saved <= 1) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, saved * maxScroll);
        target = current = window.scrollY;
      }
    } catch { /* storage unavailable (private mode / iframe) */ }

    const handleScroll = () => {
      target = window.scrollY;
      if (!saveTimer) {
        saveTimer = setTimeout(() => {
          saveTimer = null;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          try {
            localStorage.setItem(SAVE_KEY, String(maxScroll > 0 ? target / maxScroll : 0));
          } catch { /* ignore */ }
        }, 500);
      }
    };

    const tick = () => {
      current += (target - current) * 0.08;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? current / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, p)));
      setScrollY(current);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      if (saveTimer) clearTimeout(saveTimer);
    };
  }, []);

  return { progress, scrollY };
}
