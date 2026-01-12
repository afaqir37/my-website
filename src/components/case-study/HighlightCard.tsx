import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface HighlightCardProps {
  icon: string;
  text: string;
  index?: number;
}

const HighlightCard = ({ icon, text, index = 0 }: HighlightCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="flex items-start gap-4 p-5 bg-background-subtle border border-border rounded-xl transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-0.5 group"
    >
      <span className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110">{icon}</span>
      <p className="text-sm text-foreground-muted leading-relaxed">{text}</p>
    </motion.div>
  );
};

export default HighlightCard;
