import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import BlogPostCard, { BlogPost } from '../components/BlogPostCard';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedType, setSelectedType] = useState('');

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

  const availableTypes = useMemo(() => {
    try {
      const types = new Set<string>();
      posts.forEach(post => {
        if (post.type && typeof post.type === 'string') {
          types.add(post.type.toUpperCase());
        }
      });
      return Array.from(types).sort();
    } catch (err) {
      console.error('Error generating available types:', err);
      return [];
    }
  }, [posts]);

  const filteredPosts = useMemo(() => {
    try {
      return posts.filter(post => {
        // Filter by tag if selected
        const matchesTag = !selectedTag || 
          (post.tags && Array.isArray(post.tags) && post.tags.includes(selectedTag));
        
        // Filter by type if selected
        const matchesType = !selectedType || 
          (post.type && post.type.toUpperCase() === selectedType);
        
        return matchesTag && matchesType;
      });
    } catch (err) {
      console.error('Error filtering posts:', err);
      return posts; // Return all posts if filtering fails
    }
  }, [posts, selectedTag, selectedType]);

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="flex flex-wrap gap-3">
          {availableTags.length > 0 && (
            <FilterDropdown
              options={availableTags}
              selectedOption={selectedTag}
              onSelect={setSelectedTag}
              label="Tag"
            />
          )}
          {availableTypes.length > 0 && (
            <FilterDropdown
              options={availableTypes}
              selectedOption={selectedType}
              onSelect={setSelectedType}
              label="Type"
            />
          )}
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <p>No posts found{selectedTag ? ` with tag "${selectedTag}"` : ''}{selectedType ? ` of type "${selectedType}"` : ''}.</p>
          {(selectedTag || selectedType) && (
            <button 
              onClick={() => {
                setSelectedTag('');
                setSelectedType('');
              }}
              className="mt-4 px-4 py-2 text-sm rounded-lg bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post, index) => (
            <BlogPostCard 
              key={post.id || index} 
              post={post} 
              index={index} 
            />
          ))}
        </div>
      )}
    </motion.div>
  );
} 