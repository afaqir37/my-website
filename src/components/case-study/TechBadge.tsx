interface TechBadgeProps {
  children: React.ReactNode;
}

const TechBadge = ({ children }: TechBadgeProps) => {
  return (
    <span className="inline-block text-xs text-foreground-muted px-3 py-1.5 bg-background-subtle border border-border rounded-full transition-all hover:border-accent/40 hover:text-accent">
      {children}
    </span>
  );
};

export default TechBadge;
