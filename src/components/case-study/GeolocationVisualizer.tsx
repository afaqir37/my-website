import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Washman {
  id: number;
  x: number;
  y: number;
  distance: number;
  found: boolean;
}

const GeolocationVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRadius, setCurrentRadius] = useState(0);
  const [queryTime, setQueryTime] = useState(0);
  const [foundCount, setFoundCount] = useState(0);

  // Generate washmen at various distances
  const washmen: Washman[] = [
    // Within 5km
    { id: 1, x: 120, y: 80, distance: 3.2, found: false },
    { id: 2, x: 80, y: 140, distance: 4.1, found: false },
    { id: 3, x: 160, y: 120, distance: 4.8, found: false },

    // 5-10km
    { id: 4, x: 50, y: 50, distance: 7.1, found: false },
    { id: 5, x: 180, y: 60, distance: 8.3, found: false },
    { id: 6, x: 70, y: 180, distance: 9.2, found: false },

    // 10-15km
    { id: 7, x: 30, y: 120, distance: 11.5, found: false },
    { id: 8, x: 190, y: 140, distance: 12.8, found: false },
    { id: 9, x: 120, y: 20, distance: 13.7, found: false },

    // 15-20km
    { id: 10, x: 20, y: 180, distance: 16.2, found: false },
    { id: 11, x: 200, y: 30, distance: 17.9, found: false },
    { id: 12, x: 180, y: 190, distance: 19.1, found: false },
  ];

  const radii = [
    { km: 5, time: 450 },
    { km: 10, time: 220 },
    { km: 15, time: 140 },
    { km: 20, time: 95 }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    let step = 0;
    const interval = setInterval(() => {
      if (step >= radii.length) {
        setIsPlaying(false);
        return;
      }

      const radius = radii[step];
      setCurrentRadius(radius.km);
      setQueryTime(radius.time);

      // Count washmen within this radius
      const found = washmen.filter(w => w.distance <= radius.km).length;
      setFoundCount(found);

      step++;
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    setCurrentRadius(0);
    setQueryTime(0);
    setFoundCount(0);
    setIsPlaying(true);
  };

  const scale = (km: number) => (km / 20) * 100; // Scale km to pixels

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background-subtle">
      {/* Control Panel */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-sm">
            <span className="text-foreground-muted">Search Radius: </span>
            <span className="text-accent font-medium">{currentRadius}km</span>
          </div>
          <div className="text-sm">
            <span className="text-foreground-muted">Query Time: </span>
            <span className="text-accent font-medium">{queryTime}ms</span>
          </div>
          <div className="text-sm">
            <span className="text-foreground-muted">Found: </span>
            <span className="text-accent-green font-medium">{foundCount} washmen</span>
          </div>
        </div>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? 'Playing...' : 'Run Search'}
        </button>
      </div>

      {/* Visualization Area */}
      <div className="relative w-full aspect-square max-w-md mx-auto p-8">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          {/* Grid lines for reference */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="240" height="240" fill="url(#grid)" />

          {/* Client location (center) */}
          <circle cx="120" cy="120" r="6" fill="currentColor" className="text-accent" />
          <text x="120" y="108" textAnchor="middle" className="text-xs fill-current text-foreground" fontWeight="500">
            Client
          </text>

          {/* Expanding search circles */}
          <AnimatePresence>
            {radii.map((radius) => (
              currentRadius >= radius.km && (
                <motion.circle
                  key={radius.km}
                  cx="120"
                  cy="120"
                  r={scale(radius.km)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: scale(radius.km), opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              )
            ))}
          </AnimatePresence>

          {/* Washmen */}
          {washmen.map((washman) => {
            const isFound = currentRadius >= washman.distance;
            return (
              <motion.g key={washman.id}>
                <motion.circle
                  cx={washman.x}
                  cy={washman.y}
                  r="4"
                  initial={{ fill: 'currentColor', scale: 1 }}
                  animate={{
                    fill: isFound ? 'currentColor' : 'currentColor',
                    scale: isFound ? 1.3 : 1,
                  }}
                  className={isFound ? 'text-accent-green' : 'text-foreground-muted'}
                  transition={{ duration: 0.3 }}
                />
                {isFound && (
                  <motion.circle
                    cx={washman.x}
                    cy={washman.y}
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent-green"
                    initial={{ r: 4, opacity: 0.8 }}
                    animate={{ r: 12, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-foreground-muted">Client Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-green"></div>
            <span className="text-foreground-muted">Online Washmen (found)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-foreground-muted"></div>
            <span className="text-foreground-muted">Not in range</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-border p-4 text-sm text-foreground-muted">
        <p>
          Progressive radius expansion: The system starts with a 5km search. If no washmen are found,
          it expands to 10km, then 15km, and finally 20km, optimizing for speed while maximizing matches.
        </p>
      </div>
    </div>
  );
};

export default GeolocationVisualizer;
