import React, { useState, useEffect } from 'react';

const FetchData2 = () => {
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const usersPerPage = 2;

  const fetchPosts = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredPosts.slice(page * usersPerPage, (page + 1) * usersPerPage);

  return (
    <div>
      <h2>Fetch Data 2: Dynamic Data</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {paginatedUsers.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
        Previous
      </button>
      <button
        disabled={(page + 1) * usersPerPage >= filteredPosts.length}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default FetchData2;
