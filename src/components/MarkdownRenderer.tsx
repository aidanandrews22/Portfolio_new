import { type ComponentPropsWithoutRef, useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom hook for dark mode detection
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial color scheme
    const checkColorScheme = () => {
      const isDark = 
        document.documentElement.classList.contains('force-dark') || 
        (document.documentElement.classList.contains('color-scheme-adaptive') && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
    };

    // Check on mount
    checkColorScheme();

    // Set up listeners for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => checkColorScheme();
    mediaQuery.addEventListener('change', handleChange);

    // Observer for class changes on html element
    const observer = new MutationObserver(checkColorScheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  return isDarkMode;
}

function CodeBlock({ children, language }: { children: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const isDarkMode = useDarkMode();

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
        style={isDarkMode ? oneDark : oneLight}
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

// Function to extract YouTube video ID from various YouTube URL formats
function extractYoutubeVideoId(url: string): string | null {
  try {
    if (!url || typeof url !== 'string') return null;
    
    // Handle youtu.be format
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || null;
    }
    
    // Handle youtube.com/watch?v= format
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1] || '');
      return urlParams.get('v');
    }
    
    // Handle youtube.com/embed/ format
    if (url.includes('youtube.com/embed/')) {
      return url.split('youtube.com/embed/')[1]?.split('?')[0] || null;
    }
    
    return null;
  } catch (err) {
    console.error('Error extracting YouTube video ID:', err);
    return null;
  }
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-adaptive max-w-none ${className}`}>
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
          a: (props) => {
            // Check if this is a YouTube link
            const videoId = extractYoutubeVideoId(props.href || '');
            
            if (videoId) {
              return (
                <div className="aspect-video w-full my-6 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    title="YouTube video"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            
            // Regular link handling
            return (
              <a
                {...props}
                className="text-[var(--color-primary)] hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
            );
          },
          pre: ({ node, children, ...rest }) => (
            <pre
              {...rest}
              className="bg-background !p-0 !m-0 overflow-hidden"
            >
              {children}
            </pre>
          ),
          // Handle img tags to check if they contain YouTube links in alt text
          img: (props) => {
            // Check if alt text contains a YouTube marker
            if (props.alt?.toLowerCase().includes('youtube:')) {
              const videoUrl = props.alt.split('youtube:')[1]?.trim();
              const videoId = extractYoutubeVideoId(videoUrl);
              
              if (videoId) {
                return (
                  <div className="aspect-video w-full my-6 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      title="YouTube video"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              }
            }
            
            // Regular image
            return <img {...props} className="rounded-lg" />;
          },
          // Add custom component for summary tags
          summary: (props) => (
            <summary
              {...props}
              className="cursor-pointer"
            />
          ),
          // Add custom component for details tags
          details: ({ node, children, ...rest }) => {
            // Find the summary element
            const childrenArray = Array.isArray(children) ? children : [children];
            const summaryIndex = childrenArray.findIndex(
              (child: any) => child?.props?.node?.tagName === 'summary'
            );
            
            // Separate summary from content
            const summary = summaryIndex !== -1 ? childrenArray[summaryIndex] : null;
            
            // Extract the actual text content
            // We need to recursively extract text from the content
            const extractTextContent = (node: any): string => {
              if (typeof node === 'string') return node;
              if (!node) return '';
              
              // If it's a React element with children
              if (node.props && node.props.children) {
                if (Array.isArray(node.props.children)) {
                  return node.props.children.map(extractTextContent).join('');
                } else {
                  return extractTextContent(node.props.children);
                }
              }
              
              return '';
            };
            
            // Get all content except the summary
            const contentNodes = childrenArray.filter((_, i) => i !== summaryIndex);
            const textContent = contentNodes.map(extractTextContent).join('');
            
            // Render content as a code block
            return (
              <details {...rest}>
                {summary}
                <div className="mt-2">
                  <CodeBlock language="text">
                    {textContent}
                  </CodeBlock>
                </div>
              </details>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
} 