interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div className="flex flex-col group">
      <span className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-foreground transition-colors group-hover:text-accent">
        {value}
      </span>
      <span className="text-xs text-foreground-muted tracking-wider uppercase mt-2">
        {label}
      </span>
    </div>
  );
};

export default StatCard;
