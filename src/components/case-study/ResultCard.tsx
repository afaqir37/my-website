import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ResultCardProps {
  value: string;
  label: string;
  index?: number;
}

const ResultCard = ({ value, label, index = 0 }: ResultCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}
      className="p-6 bg-accent/10 border border-accent/30 rounded-xl text-center transition-all hover:bg-accent/15 hover:border-accent/50 hover:-translate-y-0.5"
    >
      <div className="font-serif text-3xl md:text-4xl text-accent mb-2 font-medium">{value}</div>
      <div className="text-xs text-foreground-muted uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

export default ResultCard;
