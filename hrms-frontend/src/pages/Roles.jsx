import { useEffect, useState } from 'react';
import {
  getRoles,
  createRole,
  deleteRole,
} from '../services/roleService';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getRoles();

        setRoles(data);
      } catch (error) {
        console.error(
          'Failed to fetch roles:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load roles.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  const refreshRoles = async () => {
    try {
      const data = await getRoles();

      setRoles(data);
    } catch (error) {
      console.error(
        'Failed to refresh roles:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to load roles.'
      );
    }
  };

  const handleCreateRole = async (event) => {
    event.preventDefault();

    const trimmedRoleName = roleName.trim();

    if (!trimmedRoleName) {
      setError('Role name is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      await createRole({
        roleName: trimmedRoleName,
      });

      setRoleName('');
      setSuccess('Role created successfully!');

      await refreshRoles();
    } catch (error) {
      console.error(
        'Failed to create role:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to create role.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this role?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      await deleteRole(id);

      setSuccess('Role deleted successfully!');

      await refreshRoles();
    } catch (error) {
      console.error(
        'Failed to delete role:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to delete role.'
      );
    }
  };

  if (loading) {
    return <p>Loading roles...</p>;
  }

  return (
    <div>
      <h1>Roles</h1>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}

      <form onSubmit={handleCreateRole}>
        <div>
          <label>Role Name</label>

          <input
            type="text"
            value={roleName}
            onChange={(event) =>
              setRoleName(event.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Creating...'
              : 'Create Role'}
          </button>
        </div>
      </form>

      <br />

      {roles.length === 0 ? (
        <p>No roles found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Role Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>

                <td>{role.roleName}</td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(role.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Roles;

