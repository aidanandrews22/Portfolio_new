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
          a: (props) => (
            <a
              {...props}
              className="text-[var(--color-primary)] hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          code: (props) => {
            const isInline = !props.className?.includes('language-');
            return (
              <code
                {...props}
                className={`${isInline ? 'bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] px-1.5 py-0.5 rounded' : ''} ${props.className || ''}`}
              />
            );
          },
          pre: (props) => (
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