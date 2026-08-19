import { useEffect, useState } from 'react';
import {
  getDepartments,
  deleteDepartment,
} from '../services/departmentService';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.error(
        'Failed to fetch departments:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to load departments.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this department?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      await deleteDepartment(id);

      await fetchDepartments();
    } catch (error) {
      console.error(
        'Failed to delete department:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to delete department.'
      );
    }
  };

  if (loading) {
    return <p>Loading departments...</p>;
  }

  return (
    <div>
      <h1>Departments</h1>

      {error && <p>{error}</p>}

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.id}</td>

                <td>{department.name}</td>

                <td>{department.description}</td>

                <td>
                  {department.active
                    ? 'Active'
                    : 'Inactive'}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(department.id)
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

export default Departments;

