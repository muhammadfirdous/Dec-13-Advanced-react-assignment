import React, { useState } from 'react';

const HandleError = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/invalid-endpoint')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Error Handling</h2>
      {loading && <div className="loading-spinner"></div>}
      {error && (
        <div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchData}>
            Retry
          </button>
        </div>
      )}
      {!loading && !error && data && <p>Data fetched successfully!</p>}
      {!loading && !error && !data && (
        <button className="retry-button" onClick={fetchData}>
          Fetch Data
        </button>
      )}
    </div>
  );
};

export default HandleError;
