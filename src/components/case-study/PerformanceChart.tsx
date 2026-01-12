import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PerformanceChart = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      setIsAnimating(true);
    }
  }, [isInView]);

  const metrics = [
    {
      label: 'Query Time',
      before: 500,
      after: 95,
      unit: 'ms',
      color: 'accent',
    },
    {
      label: 'API Calls',
      before: 100,
      after: 20,
      unit: 'calls',
      color: 'accent-green',
    },
  ];

  const maxValue = 500;

  return (
    <div ref={ref} className="border border-border rounded-xl overflow-hidden bg-background-subtle">
      <div className="border-b border-border p-4">
        <h4 className="text-sm font-medium text-foreground">Performance Impact</h4>
        <p className="text-xs text-foreground-muted mt-1">
          Before and after PostGIS optimization
        </p>
      </div>

      <div className="p-6 space-y-8">
        {metrics.map((metric, idx) => (
          <div key={metric.label} className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{metric.label}</span>
              <div className="flex items-baseline gap-4 text-xs">
                <span className="text-foreground-muted">
                  Before: <span className="font-mono">{metric.before}{metric.unit}</span>
                </span>
                <span className={`text-${metric.color} font-medium`}>
                  After: <span className="font-mono">{metric.after}{metric.unit}</span>
                </span>
              </div>
            </div>

            {/* Before bar */}
            <div className="space-y-2">
              <div className="relative h-8 bg-background border border-border rounded-lg overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-destructive/20 border-r border-destructive/40"
                  initial={{ width: 0 }}
                  animate={isAnimating ? { width: `${(metric.before / maxValue) * 100}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: idx * 0.3, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-foreground-muted"
                  initial={{ opacity: 0 }}
                  animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.3 + 0.5 }}
                >
                  {metric.before}{metric.unit}
                </motion.span>
              </div>

              {/* After bar */}
              <div className="relative h-8 bg-background border border-border rounded-lg overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 bg-${metric.color}/20 border-r border-${metric.color}/40`}
                  initial={{ width: 0 }}
                  animate={isAnimating ? { width: `${(metric.after / maxValue) * 100}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: idx * 0.3 + 0.2, ease: 'easeOut' }}
                />
                <motion.span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-${metric.color}`}
                  initial={{ opacity: 0 }}
                  animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.3 + 0.7 }}
                >
                  {metric.after}{metric.unit}
                </motion.span>
              </div>
            </div>

            {/* Improvement badge */}
            <motion.div
              className="flex items-center justify-end"
              initial={{ opacity: 0, y: -10 }}
              animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: idx * 0.3 + 1 }}
            >
              <div className={`inline-flex items-center gap-1 px-2 py-1 bg-${metric.color}/10 border border-${metric.color}/30 rounded-full`}>
                <svg className={`w-3 h-3 text-${metric.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className={`text-xs font-medium text-${metric.color}`}>
                  {Math.round(((metric.before - metric.after) / metric.before) * 100)}% improvement
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-border p-4 bg-accent/5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground-muted">
              GIST spatial indexes reduced query complexity from O(n) to O(log n),
              enabling sub-100ms responses even with thousands of washmen in the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
