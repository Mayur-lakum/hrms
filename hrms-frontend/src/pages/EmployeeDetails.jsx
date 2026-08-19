import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/employeeService';

function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getEmployeeById(id);

        setEmployee(data);
      } catch (error) {
        console.error('Failed to fetch employee:', error);

        setError(
          error.response?.data?.message ||
          'Failed to load employee.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <p>Loading employee...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  return (
    <div>
      <h1>Employee Details</h1>

      <p>
        <strong>Employee Code:</strong>{' '}
        {employee.employeeCode}
      </p>

      <p>
        <strong>Name:</strong>{' '}
        {employee.firstName} {employee.lastName}
      </p>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <p>
        <strong>Phone:</strong> {employee.phone}
      </p>

      <p>
        <strong>Gender:</strong> {employee.gender}
      </p>

      <p>
        <strong>Date of Birth:</strong>{' '}
        {employee.dateOfBirth}
      </p>

      <p>
        <strong>Joining Date:</strong>{' '}
        {employee.joiningDate}
      </p>

      <p>
        <strong>Designation:</strong>{' '}
        {employee.designation}
      </p>

      <p>
        <strong>Salary:</strong> {employee.salary}
      </p>

      <p>
        <strong>Department:</strong>{' '}
        {employee.departmentName}
      </p>

      <p>
        <strong>Manager:</strong>{' '}
        {employee.managerName || 'Not assigned'}
      </p>

      <p>
        <strong>Status:</strong> {employee.status}
      </p>

      <p>
        <strong>User ID:</strong> {employee.userId}
      </p>
    </div>
  );
}

export default EmployeeDetails;