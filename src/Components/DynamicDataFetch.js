import React, { useState, useEffect } from 'react';

function DynamicDataFetch() {
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Example: Fetch default posts when the component loads
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data.slice(0, 5))) // Fetch and display first 5 posts by default
      .catch((error) => console.error('Error fetching default posts:', error));
  }, []);

  const fetchPosts = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleChange = (e) => setUserId(e.target.value);

  const handleFetch = () => {
    if (userId) fetchPosts(userId);
  };

  return (
    <div>
      <h1>Fetch Posts by User</h1>
      <input
        type="number"
        value={userId}
        onChange={handleChange}
        placeholder="Enter User ID"
      />
      <button onClick={handleFetch}>Fetch Posts</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicDataFetch;
