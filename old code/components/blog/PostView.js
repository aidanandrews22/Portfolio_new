import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchContent } from '../../services/DataService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Preview from '../markdown/Preview';

const PostView = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchContent('post', postId);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div>
      <Link to="/blog" className="text-primary hover:underline mb-10 inline-block">&larr; Back to all posts</Link>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-600">
          <span>Created on: {new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">|</span>
          <span>Category: {post.category}</span>
        </div>
      </div>
      <hr />
      <div className="mt-10 prose max-w-none">
        <Preview doc={post.content} />
      </div>
    </div>
  );
};

export default PostView;