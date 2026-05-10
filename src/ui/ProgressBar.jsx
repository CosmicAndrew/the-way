export function ProgressBar({ current, total, progress }) {
  const dots = Array.from({ length: total }, (_, i) => i);
  const fill = Math.min(1, Math.max(0, progress * total - current));

  return (
    <div className="overlay flex flex-col justify-center pointer-events-none" style={{ right: 0, width: 32, left: 'auto' }}>
      <div className="flex flex-col gap-4 items-end pr-3">
        {dots.map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? 'bg-gold-400 shadow-[0_0_8px_rgba(212,168,67,0.6)] scale-125'
                  : i < current
                    ? 'bg-gold-600/40'
                    : 'bg-white/10'
              }`}
            />
            {i === current && (
              <div className="w-0.5 bg-gold-500/30 rounded" style={{ height: `${fill * 24}px`, transition: 'height 0.3s' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
