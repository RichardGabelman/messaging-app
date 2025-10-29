import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers(token);

        const otherUsers = data.filter(u => u.id !== user.id);
        setUsers(otherUsers);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, user.id]);

  if (loading) return <div>Loading users...</div>
  if (error) return <div>{error}</div>;
  if (users.length === 0) return <div>No other users found.</div>

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <button onClick={() => onSelectUser(u.id)}>
              {u.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;