import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FilterDropdown from '../components/FilterDropdown';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  slug: string;
  tags: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json')
      .then(res => res.json())
      .then(data => {
        try {
          // Sort posts by date, newest first
          const sortedPosts = data.sort((a: BlogPost, b: BlogPost) => {
            try {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            } catch (err) {
              console.error('Error sorting post dates:', err);
              return 0; // Keep original order if date comparison fails
            }
          });
          setPosts(sortedPosts);
        } catch (err) {
          console.error('Error processing posts data:', err);
          setPosts([]); // Set empty array to avoid undefined errors
        } finally {
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      });
  }, []);

  const availableTags = useMemo(() => {
    try {
      const tags = new Set<string>();
      posts.forEach(post => {
        try {
          if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
            post.tags.forEach(tag => {
              if (tag && typeof tag === 'string') {
                tags.add(tag);
              }
            });
          }
        } catch (err) {
          console.error('Error processing tags for post:', post.id, err);
        }
      });
      return Array.from(tags).sort();
    } catch (err) {
      console.error('Error generating available tags:', err);
      return [];
    }
  }, [posts]);

  const filteredPosts = useMemo(() => {
    try {
      if (!selectedTag) return posts;
      return posts.filter(post => {
        try {
          return post.tags && Array.isArray(post.tags) && post.tags.includes(selectedTag);
        } catch (err) {
          console.error('Error filtering post by tag:', post.id, err);
          return false;
        }
      });
    } catch (err) {
      console.error('Error filtering posts:', err);
      return posts; // Return all posts if filtering fails
    }
  }, [posts, selectedTag]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading posts...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[50vh] text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Blog</h1>
        {availableTags.length > 0 && (
          <FilterDropdown
            options={availableTags}
            selectedOption={selectedTag}
            onSelect={setSelectedTag}
            label="Filter by Tag"
          />
        )}
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <p>No posts found{selectedTag ? ` with tag "${selectedTag}"` : ''}.</p>
          {selectedTag && (
            <button 
              onClick={() => setSelectedTag('')}
              className="mt-4 px-4 py-2 text-sm rounded-lg bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.id || index}
              to={`/blog/${post.id}`}
              className="block group"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{post.title || 'Untitled Post'}</h2>
                  {post.date && (
                    <time className="text-sm" dateTime={post.date}>
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
                  )}
                </div>
                
                <p className="mb-4 text-sm/relaxed">{post.summary || 'No description available'}</p>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags && Array.isArray(post.tags) && post.tags.map((tag, tagIndex) => (
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
                
                <span className="inline-block mt-4 text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more →
                </span>
              </motion.article>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
} 