import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ClapButton from './ClapButton';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  slug: string;
  tags: string[] | string;
  content: string;
  type?: 'md' | 'pdf';
}

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
  compact?: boolean;
}

export default function BlogPostCard({ post, index = 0, compact = false }: BlogPostCardProps) {
  const handlePostClick = (post: BlogPost) => {
    if (post.type === 'pdf') {
      // For PDF posts, open the content URL in a new tab
      window.open(`https://aidanandrews22.github.io/${post.content}`, '_blank', 'noopener noreferrer');
      return false; // Prevent default navigation
    }
    // For markdown posts, continue with normal navigation
    return true;
  };

  const formattedDate = (() => {
    try {
      return new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      console.error('Error formatting date:', post.date, err);
      return post.date;
    }
  })();

  // Process tags to ensure they're in array format
  const getTags = (): string[] => {
    if (!post.tags) return [];
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags === 'string') {
      try {
        // Try to parse if it's a JSON string
        return JSON.parse(post.tags);
      } catch {
        // If not parseable, treat as a single tag
        return [post.tags];
      }
    }
    return [];
  };

  const tags = getTags();

  // Render PDF post card
  if (post.type === 'pdf') {
    return (
      <div
        onClick={() => handlePostClick(post)}
        className="block group cursor-pointer"
      >
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-lg border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg transition-all"
        >
          <div className="flex flex-col space-y-4 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div className="flex flex-wrap items-center gap-2 pr-4">
                <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{post.title || 'Untitled Post'}</h2>
                <span className="px-2 py-0.5 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] flex items-center gap-1 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  PDF
                </span>
              </div>
              {post.date && (
                <time className="text-sm shrink-0" dateTime={post.date}>
                  {formattedDate}
                </time>
              )}
            </div>
            
            <p className="text-sm/relaxed">{compact ? `${post.summary?.substring(0, 100)}${post.summary?.length > 100 ? '...' : ''}` : post.summary || 'No description available'}</p>
            
            <div className="flex items-center gap-2 flex-wrap">
              {tags.map((tag, tagIndex) => (
                tag && typeof tag === 'string' ? (
                  <span
                    key={`${tag}-${tagIndex}`}
                    className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                  >
                    {tag}
                  </span>
                ) : null
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-2 mt-auto">
              <span className="inline-flex items-center text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                Open PDF in new tab
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
              
              <div onClick={(e) => e.stopPropagation()}>
                <ClapButton postId={post.id} />
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    );
  }

  // Render markdown post card
  return (
    <Link
      to={`/blog/${post.id}`}
      className="block group"
    >
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="p-6 rounded-lg border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg transition-all"
      >
        <div className="flex flex-col space-y-4 h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <div className="flex flex-wrap items-center gap-2 pr-4">
              <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{post.title || 'Untitled Post'}</h2>
              {post.type === 'md' && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] shrink-0">
                  MD
                </span>
              )}
            </div>
            {post.date && (
              <time className="text-sm shrink-0" dateTime={post.date}>
                {formattedDate}
              </time>
            )}
          </div>
          
          <p className="text-sm/relaxed">{compact ? `${post.summary?.substring(0, 100)}${post.summary?.length > 100 ? '...' : ''}` : post.summary || 'No description available'}</p>
          
          <div className="flex items-center gap-2 flex-wrap">
            {tags.map((tag, tagIndex) => (
              tag && typeof tag === 'string' ? (
                <span
                  key={`${tag}-${tagIndex}`}
                  className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                >
                  {tag}
                </span>
              ) : null
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2 mt-auto">
            <span className="inline-block text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              Read more →
            </span>
            
            <div className="z-10" onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}>
              <ClapButton postId={post.id} />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
} 