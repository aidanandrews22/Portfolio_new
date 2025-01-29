import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FilterDropdown from '../components/FilterDropdown';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
  tags?: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json')
      .then(res => res.json())
      .then(data => {
        // Sort posts by date, newest first
        const sortedPosts = data.sort((a: BlogPost, b: BlogPost) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });
  }, []);

  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach(post => {
      if (post.category) categories.add(post.category);
    });
    return Array.from(categories).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading posts...</div>;
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
        <FilterDropdown
          options={availableCategories}
          selectedOption={selectedCategory}
          onSelect={setSelectedCategory}
          label="Filter by Category"
        />
      </div>
      
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <Link
            key={post.id}
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
                <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{post.title}</h2>
                <time className="text-sm" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <p className="mb-4 text-sm/relaxed">{post.description}</p>
              
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                  {post.category}
                </span>
                {post.tags && post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <span className="inline-block mt-4 text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                Read more →
              </span>
            </motion.article>
          </Link>
        ))}
      </div>
    </motion.div>
  );
} 