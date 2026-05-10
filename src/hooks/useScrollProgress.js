import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId;

    const handleScroll = () => {
      target = window.scrollY;
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
    };
  }, []);

  return { progress, scrollY };
}
