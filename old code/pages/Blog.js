import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import { useDataReload } from '../hooks/useDataReload';
import PostList from '../components/blog/PostList';
import PostView from '../components/blog/PostView';
import GraphView from '../components/common/GraphView';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Blog = () => {
  const dataContext = useDataContext();
  const posts = dataContext?.posts || [];
  const loading = dataContext?.loading || false;
  const error = dataContext?.error || null;

  const reloadData = useDataReload();
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lastViewedPost, setLastViewedPost] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedLastViewedPost = localStorage.getItem('lastViewedPost');
    if (storedLastViewedPost) {
      setLastViewedPost(JSON.parse(storedLastViewedPost));
    }
  }, []);

  const updateLastViewedPost = useCallback((postId) => {
    if (postId && posts) {
      const currentPost = posts.find(post => post.id === postId);
      if (currentPost) {
        setLastViewedPost(currentPost);
        localStorage.setItem('lastViewedPost', JSON.stringify(currentPost));
      }
    }
  }, [posts]);

  useEffect(() => {
    const postId = location.pathname.split('/').pop();
    updateLastViewedPost(postId);
  }, [location, updateLastViewedPost]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const graphData = {
    nodes: [
      ...['Misc', 'CS', 'ML', 'Physics'].map(category => ({ id: category, name: category, isCategory: true })),
      ...filteredPosts.map(post => ({ id: post.id, name: post.title, isCategory: false }))
    ],
    links: filteredPosts.map(post => ({ source: post.category, target: post.id, distance: 50 }))
  };

  const isListView = location.pathname === '/blog';

  return (
    <div className="container mx-auto px-4">
      {isListView && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0">Blog Posts</h2>
            {/* <div className="flex flex-wrap gap-2">
              <button
                onClick={reloadData}
                className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
              >
                Reload Data
              </button>
              <button
                onClick={() => setShowGraph(!showGraph)}
                className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
              >
                {showGraph ? 'Show List' : 'Show Graph'}
              </button>
            </div> */}
          </div>
          {lastViewedPost && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Last Viewed Post:</h3>
              <Link to={`/blog/${lastViewedPost.id}`} className="text-primary hover:underline">
                {lastViewedPost.title}
              </Link>
            </div>
          )}
          <div className="mb-4 flex flex-wrap gap-2">
            {['All', 'Misc', 'CS', 'ML', 'Physics'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-text-secondary hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      )}
      {showGraph && isListView ? (
        <GraphView data={graphData} type="blog" />
      ) : (
        <Routes>
          <Route index element={<PostList posts={filteredPosts} />} />
          <Route path=":postId" element={<PostView />} />
        </Routes>
      )}
    </div>
  );
};

export default Blog;