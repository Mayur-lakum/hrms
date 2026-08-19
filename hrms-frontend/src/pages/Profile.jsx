import { useEffect, useState } from 'react';
import { getMyProfile } from '../services/employeeService';

function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getMyProfile();

        setEmployee(data);
      } catch (error) {
        console.error('Failed to load profile:', error);

        setError(
          error.response?.data?.message ||
          'Failed to load profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>Profile not found.</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <div>
        <p>
          <strong>Employee Code:</strong>{' '}
          {employee.employeeCode}
        </p>

        <p>
          <strong>Name:</strong>{' '}
          {employee.firstName} {employee.lastName}
        </p>

        <p>
          <strong>Email:</strong>{' '}
          {employee.email}
        </p>

        <p>
          <strong>Phone:</strong>{' '}
          {employee.phone || '-'}
        </p>

        <p>
          <strong>Gender:</strong>{' '}
          {employee.gender || '-'}
        </p>

        <p>
          <strong>Date of Birth:</strong>{' '}
          {employee.dateOfBirth || '-'}
        </p>

        <p>
          <strong>Joining Date:</strong>{' '}
          {employee.joiningDate || '-'}
        </p>

        <p>
          <strong>Designation:</strong>{' '}
          {employee.designation || '-'}
        </p>

        <p>
          <strong>Department:</strong>{' '}
          {employee.departmentName || '-'}
        </p>

        <p>
          <strong>Manager:</strong>{' '}
          {employee.managerName || 'No Manager'}
        </p>

        <p>
          <strong>Status:</strong>{' '}
          {employee.status}
        </p>
      </div>
    </div>
  );
}

export default Profile;