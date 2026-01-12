import { cn } from "../../lib/utils";

interface StoryBoxProps {
  icon: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning';
}

const StoryBox = ({ icon, children, variant = 'default' }: StoryBoxProps) => {
  return (
    <div className={cn(
      "flex gap-5 p-6 rounded-xl border-l-4",
      variant === 'warning' 
        ? "bg-amber-500/5 border-amber-500/60 dark:border-amber-400/60" 
        : "bg-accent/5 border-accent"
    )}>
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <p className="text-foreground-muted leading-relaxed">{children}</p>
    </div>
  );
};

export default StoryBox;
