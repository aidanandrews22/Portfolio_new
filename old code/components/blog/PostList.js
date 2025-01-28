import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-4">
          <Link to={`/blog/${post.id}`} className="text-lg font-semibold text-primary">
            {post.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(post.date).toLocaleDateString()} - {post.category}
          </p>
          <p className="text-sm text-gray-700 mt-2">{post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;