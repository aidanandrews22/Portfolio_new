import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // Custom components for markdown elements
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-[var(--color-primary)] hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          code: ({ node, inline, ...props }) => (
            <code
              {...props}
              className={`${inline ? 'bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] px-1.5 py-0.5 rounded' : ''}`}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] p-4 rounded-lg overflow-x-auto"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 