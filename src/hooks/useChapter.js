import { useState, useEffect, useRef } from 'react';

const CHAPTER_COUNT = 7;
const HIT_AREA = 0.5 / CHAPTER_COUNT; // dead zone between chapters

export function useChapter(progress) {
  const [chapter, setChapter] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const prevRef = useRef(0);

  useEffect(() => {
    const rawChapter = progress * CHAPTER_COUNT;
    const chapterIdx = Math.min(CHAPTER_COUNT - 1, Math.max(0, Math.floor(rawChapter + HIT_AREA)));

    if (chapterIdx !== prevRef.current && !transitioning) {
      setTransitioning(true);
      prevRef.current = chapterIdx;
      setChapter(chapterIdx);

      const timer = setTimeout(() => setTransitioning(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [progress, transitioning]);

  return { chapter, transitioning };
}
