import React, { useState, useEffect } from 'react';

function PaginatedUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const usersPerPage = 2;
  const paginatedUsers = users.slice(page * usersPerPage, (page + 1) * usersPerPage);

  const handleNext = () => {
    if ((page + 1) * usersPerPage < users.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h1>Paginated Users</h1>
      <ul>
        {paginatedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={handlePrevious} disabled={page === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={(page + 1) * usersPerPage >= users.length}>
        Next
      </button>
    </div>
  );
}

export default PaginatedUsers;
