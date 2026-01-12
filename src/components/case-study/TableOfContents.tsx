import { cn } from "../../lib/utils";
import { useState, useEffect, useRef } from "react";

interface Section {
  id: string;
  title: string;
  number: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const TableOfContents = ({ sections, activeSection, onSectionClick }: TableOfContentsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const firstSectionPassedRef = useRef(false);
  const lastSectionScrolledPastRef = useRef(false);

  useEffect(() => {
    const firstSection = document.getElementById(sections[0]?.id);
    const lastSection = document.getElementById(sections[sections.length - 1]?.id);

    if (!firstSection || !lastSection) return;

    const checkVisibility = () => {
      // Show TOC when first section passed 10% AND we haven't scrolled completely past last section
      setIsVisible(firstSectionPassedRef.current && !lastSectionScrolledPastRef.current);
    };

    // Observer for first section (top 10% threshold)
    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const tenPercentFromTop = window.innerHeight * 0.1;

        firstSectionPassedRef.current = rect.top <= tenPercentFromTop;
        checkVisibility();
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    );

    // Observer for last section (check if scrolled past it)
    const lastObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        // If last section is above viewport (negative top + full height scrolled past), hide TOC
        lastSectionScrolledPastRef.current = !entry.isIntersecting && rect.bottom < 0;
        checkVisibility();
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    firstObserver.observe(firstSection);
    lastObserver.observe(lastSection);

    return () => {
      firstObserver.disconnect();
      lastObserver.disconnect();
    };
  }, [sections]);

  return (
    <aside
      className={cn(
        "hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
      )}
    >
      <div className="text-[10px] text-foreground-muted uppercase tracking-[0.2em] mb-5 font-medium">
        Contents
      </div>
      <nav className="flex flex-col gap-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "flex items-center gap-3 text-left text-sm py-1.5 transition-all group",
              activeSection === section.id
                ? "text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            <span className={cn(
              "w-6 text-[10px] font-mono transition-colors",
              activeSection === section.id ? "text-accent" : "text-foreground-muted/50 group-hover:text-accent"
            )}>
              {section.number}
            </span>
            <span className="relative inline-block">
              {section.title}
              <span className={cn(
                "absolute -bottom-0.5 left-0 h-0.5 bg-accent rounded-full transition-all duration-300",
                activeSection === section.id ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default TableOfContents;
