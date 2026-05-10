import { useState } from 'react';

export function MuteButton({ onToggle }) {
  const [muted, setMuted] = useState(false);

  const handleClick = () => {
    const next = onToggle();
    setMuted(next);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-gold-500/30 transition-colors cursor-pointer"
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
    >
      {muted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
