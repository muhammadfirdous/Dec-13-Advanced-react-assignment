import React, { useState, useEffect } from 'react';

function SearchablePosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Searchable Posts</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by title"
      />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchablePosts;
