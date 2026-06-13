import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { chapters } from '../data/chapters.js';

export function Overlay({ chapter, visible, transitioning }) {
  const containerRef = useRef(null);
  const verseRef = useRef(null);
  const refRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (visible) {
      gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    } else if (transitioning) {
      gsap.to(el, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' });
    }
  }, [visible, transitioning, chapter]);

  const data = chapters[chapter];

  return (
    <div className="overlay flex items-center justify-center" ref={containerRef} aria-live="polite">
      <div className="text-center px-4 sm:px-6 max-w-2xl">
        <p
          ref={verseRef}
          className="font-cinzel text-gold-400 text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide drop-shadow-[0_0_20px_rgba(212,168,67,0.3)]"
        >
          {data.scripture}
        </p>
        <p
          ref={refRef}
          className="font-inter text-gold-500/60 text-xs sm:text-sm md:text-base mt-4 sm:mt-6 tracking-widest uppercase"
        >
          {data.reference}
        </p>
      </div>
    </div>
  );
}
