import React, { useState, useEffect, useRef } from "react";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const observerRef = useRef(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Post List */}
      <div style={{ width: "60%" }}>
        <h2 style={{ textAlign: "center" }}>Infinite Scroll - Posts</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                margin: "10px 0",
                cursor: "pointer",
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => handlePostClick(post)}
            >
              {post.title}
            </li>
          ))}
        </ul>
        <div
          ref={observerRef}
          style={{
            height: "20px",
            backgroundColor: "transparent",
          }}
        />
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      </div>

      {/* Post Details */}
      <div
        style={{
          width: "35%",
          marginLeft: "20px",
          backgroundColor: "#e8f5e9",
          padding: "15px",
          borderRadius: "5px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {selectedPost ? (
          <>
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
              Post Details
            </h3>
            <p>
              <strong>Title:</strong> {selectedPost.title}
            </p>
            <p>
              <strong>Body:</strong> {selectedPost.body}
            </p>
            <p>
              <strong>User ID:</strong> {selectedPost.userId}
            </p>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>
            Click on a post to view its details.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
