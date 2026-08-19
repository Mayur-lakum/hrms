import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartmentById } from '../services/departmentService';

function DepartmentDetails() {
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getDepartmentById(id);

        setDepartment(data);
      } catch (error) {
        console.error(
          'Failed to fetch department:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load department.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) {
    return <p>Loading department...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!department) {
    return <p>Department not found.</p>;
  }

  return (
    <div>
      <h1>Department Details</h1>

      <p>
        <strong>ID:</strong> {department.id}
      </p>

      <p>
        <strong>Name:</strong> {department.name}
      </p>

      <p>
        <strong>Description:</strong>{' '}
        {department.description}
      </p>
    </div>
  );
}

export default DepartmentDetails;   