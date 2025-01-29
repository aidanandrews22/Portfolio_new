import { type ComponentPropsWithoutRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function CodeBlock({ children, language }: { children: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy code:', err);
    });
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] px-2 py-1 rounded text-sm hover:opacity-80 transition-opacity"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        className="!rounded-lg !m-0"
        customStyle={{
          borderRadius: '0.5rem',
          margin: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code(props: ComponentPropsWithoutRef<'code'> & { inline?: boolean; className?: string }) {
            const match = /language-(\w+)/.exec(props.className || '');
            if (!props.inline && match) {
              return (
                <CodeBlock language={match[1]}>
                  {String(props.children).replace(/\n$/, '')}
                </CodeBlock>
              );
            }
            return (
              <code
                className={`${props.inline ? 'bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] px-1.5 py-0.5 rounded' : ''} ${props.className || ''}`}
                {...props}
              >
                {props.children}
              </code>
            );
          },
          a: (props) => (
            <a
              {...props}
              className="text-[var(--color-primary)] hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          pre: ({ node, children, ...rest }) => (
            <pre
              {...rest}
              className="bg-background !p-0 !m-0 overflow-hidden"
            >
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
} 