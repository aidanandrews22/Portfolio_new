import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[] | string;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts/${id}.md`);
        if (!response.ok) throw new Error('Post not found');
        const content = await response.text();
        
        // Fetch post metadata
        const metaResponse = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json');
        if (!metaResponse.ok) throw new Error('Failed to fetch post metadata');
        const posts = await metaResponse.json();
        const postMeta = posts.find((p: BlogPost) => p.id === id);
        
        if (!postMeta) throw new Error('Post metadata not found');
        
        // Ensure tags is an array
        let processedPostMeta = { ...postMeta };
        
        // Handle case where tags might be a string or missing
        if (typeof processedPostMeta.tags === 'string') {
          // If it's a comma-separated string, split it
          processedPostMeta.tags = processedPostMeta.tags.split(',').map((tag: string) => tag.trim());
        } else if (!processedPostMeta.tags) {
          processedPostMeta.tags = [];
        } else if (!Array.isArray(processedPostMeta.tags)) {
          // If it's neither a string nor an array, set to empty array
          processedPostMeta.tags = [];
        }
        
        setPost({ ...processedPostMeta, content });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch post');
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <p className="text-lg text-red-500">Error: {error || 'Post not found'}</p>
        <a href="/blog" className="text-sm hover:text-[var(--color-primary)] transition-colors">
          ← Back to Blog
        </a>
      </div>
    );
  }

  // Safely get tags as an array
  const getTags = (): string[] => {
    try {
      if (!post.tags) return [];
      if (Array.isArray(post.tags)) return post.tags;
      if (typeof post.tags === 'string') return post.tags.split(',').map(tag => tag.trim());
      return [];
    } catch (err) {
      console.error('Error processing tags:', err);
      return [];
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="space-y-4">
        <a href="/blog" className="text-sm hover:text-[var(--color-primary)] transition-colors">
          ← Back to Blog
        </a>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <time className="text-sm block" dateTime={post.date}>
            {(() => {
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
            })()}
          </time>
        </div>

        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {getTags().map((tag, index) => (
              tag && typeof tag === 'string' ? (
                <span
                  key={`${tag}-${index}`}
                  className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                >
                  {tag}
                </span>
              ) : null
            ))}
          </div>
        )}
      </div>

      <MarkdownRenderer 
        content={post.content}
        className="mt-8"
      />
    </motion.article>
  );
} 