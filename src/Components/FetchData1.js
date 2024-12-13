import React, { useState, useEffect } from 'react';

const FetchData1 = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Fetch Data 1: Users</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* List of Users */}
        <ul style={{ flex: '1' }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => handleUserClick(user)}
            >
              {user.name} - {user.email}
            </li>
          ))}
        </ul>

        {/* User Details */}
        {selectedUser && (
          <div style={{ flex: '1', border: '1px solid #ccc', padding: '10px' }}>
            <h3>User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <p><strong>Address:</strong> {`${selectedUser.address.street}, ${selectedUser.address.city}`}</p>
            <p><strong>Company:</strong> {selectedUser.company.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchData1;
