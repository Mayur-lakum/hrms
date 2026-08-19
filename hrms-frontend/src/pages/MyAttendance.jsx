import { useEffect, useState } from 'react';
import { getMyProfile } from '../services/employeeService';
import { getEmployeeAttendance } from '../services/attendanceService';

function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError('');

        // Get the currently logged-in employee
        const employee = await getMyProfile();

        // Get attendance for that employee
        const data = await getEmployeeAttendance(employee.id);

        setAttendance(data);
      } catch (error) {
        console.error(
          'Failed to load attendance:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load attendance.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <p>Loading attendance...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Attendance</h1>

      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{record.attendanceDate}</td>

                <td>
                  {record.checkIn || '-'}
                </td>

                <td>
                  {record.checkOut || '-'}
                </td>

                <td>{record.status}</td>

                <td>
                  {record.remarks || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAttendance;