import React, { useState, useEffect } from 'react';

const FetchData3 = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const cachedData = localStorage.getItem('users');
      if (cachedData) {
        setUsers(JSON.parse(cachedData));
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        localStorage.setItem('users', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Fetch Data 3: Master-Detail & Caching</h2>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h3>User Details</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
        </div>
      )}
    </div>
  );
};

export default FetchData3;
