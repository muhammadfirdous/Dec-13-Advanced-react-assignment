import React, { useState, useEffect } from 'react';

const MasterDetail = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const fetchUserDetails = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();
    setSelectedUser(data);
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => fetchUserDetails(user.id)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default MasterDetail;
