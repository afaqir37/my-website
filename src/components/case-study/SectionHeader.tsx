interface SectionHeaderProps {
  number: string;
  title: string;
}

const SectionHeader = ({ number, title }: SectionHeaderProps) => {
  return (
    <div className="flex items-baseline gap-4 mb-10">
      <span className="font-mono text-accent text-xs font-medium tracking-widest bg-accent/10 px-2 py-1 rounded">
        {number}
      </span>
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
