import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlumniPost = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    {id:1,content:'Excited to share our new project milestone! 🎉'},
    { id: 2, content: 'Looking for feedback on my latest research paper. 📚' },
    { id: 3, content: 'Great networking opportunity at the upcoming conference. Join us! 🌟' }
  ]);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'api url'; // Replace with your backend api

  useEffect(() => {
    // fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/alumni/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setFeedback('Failed to fetch posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (!postContent.trim()) {
      setFeedback('Post content cannot be empty!');
      return;
    }

    setIsLoading(true);
    setFeedback('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/alumni/posts`, { content: postContent });
      setPosts([response.data, ...posts]); // Add the new post to the beginning of the list
      setPostContent(''); // Clear the textarea
      setFeedback('Post added successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      setFeedback('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="alumni-post bg-white shadow-xl rounded-lg p-6 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Create a Post</h3>
      
      <textarea
        className="w-full h-32 p-4 mb-4 bg-gray-100 rounded-lg text-gray-800"
        placeholder="Write something here..."
        value={postContent}
        onChange={e => setPostContent(e.target.value)}
      />
      
      <div className="flex justify-end">
        <button
          className={`${
            isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold py-2 px-6 rounded-lg`}
          onClick={handlePost}
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </div>

      {/* Feedback message */}
      {feedback && (
        <p className={`mt-4 font-semibold ${feedback.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          {feedback}
        </p>
      )}

      {/* Display the posts */}
      <div className="mt-6">
        <h4 className="text-xl font-bold mb-2">Recent Posts</h4>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={post.id || index} className="bg-gray-100 p-4 rounded-lg mb-4">
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