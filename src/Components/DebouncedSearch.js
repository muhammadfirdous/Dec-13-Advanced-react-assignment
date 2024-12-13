import React, { useState, useEffect } from 'react';

const DebouncedSearch = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${searchTerm}`)
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
            setLoading(false);
          });
      } else {
        setPosts([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {loading && <div>Loading...</div>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedSearch;
