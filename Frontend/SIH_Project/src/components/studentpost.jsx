import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlumniPost = () => {
  const [posts, setPosts] = useState([
    { id: 1, content: 'Excited to share our new project milestone! 🎉' },
  { id: 2, content: 'Looking for feedback on my latest research paper. 📚' },
  { id: 3, content: 'Great networking opportunity at the upcoming conference. Join us! 🌟' }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'api url'; // Replace with backend api

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/alumni/posts`);
      setPosts([...posts,response.data]);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts. Please try again later.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="alumni-post bg-white shadow-xl rounded-lg p-6 mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Alumni Posts</h3>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alumni-post bg-white shadow-xl rounded-lg p-6 mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Alumni Posts</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="alumni-post bg-white shadow-xl rounded-lg p-6 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Alumni Posts</h3>

      {/* Display the posts */}
      <div className="mt-6">
        <h4 className="text-xl font-bold mb-2">Recent Posts</h4>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p>{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on: {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlumniPost;