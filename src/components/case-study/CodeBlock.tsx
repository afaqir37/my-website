import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains('light'));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto"
    >
      <div className="relative group overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/30">
        <div className="absolute top-0 left-0 right-0 h-10 bg-background-subtle border-b border-border flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-amber-500/60" />
            <span className="w-3 h-3 rounded-full bg-accent-green/60" />
          </div>
          <span className="ml-auto text-xs text-foreground-muted font-mono uppercase tracking-wider">
            {language}
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-14 right-4 p-2 rounded-lg bg-background-subtle/80 backdrop-blur-sm border border-border hover:border-accent/50 transition-all opacity-0 group-hover:opacity-100 hover:bg-accent/10 z-10"
          aria-label="Copy code"
        >
          <motion.div
            initial={false}
            animate={{ scale: copied ? 0 : 1, opacity: copied ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {!copied && <Copy className="w-4 h-4 text-foreground-muted" />}
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{ scale: copied ? 1 : 0, opacity: copied ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {copied && <Check className="w-4 h-4 text-accent-green" />}
          </motion.div>
        </button>

        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : oneLight}
          customStyle={{
            borderRadius: '0',
            padding: '24px',
            paddingTop: '56px',
            margin: 0,
            background: isDark ? 'hsl(220, 33%, 9%)' : 'hsl(40, 6%, 96%)',
            fontSize: '0.875rem',
            lineHeight: '1.7',
          }}
          codeTagProps={{
            style: {
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
