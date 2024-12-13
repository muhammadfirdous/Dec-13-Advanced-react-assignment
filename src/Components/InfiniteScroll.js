import React, { useState, useEffect, useCallback } from 'react';

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Function to load posts
  const loadPosts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // Load initial posts
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Scroll event listener
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Attach and detach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, hasMore, loading]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h2>Infinite Scroll - Posts</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* List of Posts */}
        <ul style={{ flex: '1', maxHeight: '500px', overflowY: 'auto' }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{ cursor: 'pointer', color: 'blue', marginBottom: '10px' }}
              onClick={() => handlePostClick(post)}
            >
              {post.title}
            </li>
          ))}
        </ul>

        {/* Post Details */}
        {selectedPost && (
          <div
            style={{
              flex: '1',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h3>Post Details</h3>
            <p>
              <strong>Title:</strong> {selectedPost.title}
            </p>
            <p>
              <strong>Body:</strong> {selectedPost.body}
            </p>
            <p>
              <strong>User ID:</strong> {selectedPost.userId}
            </p>
          </div>
        )}
      </div>

      {loading && <div>Loading more posts...</div>}
      {!hasMore && <div>No more posts to load.</div>}

      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back to Top
      </button>
    </div>
  );
};

export default InfiniteScroll;
