import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttendanceById } from '../services/attendanceService';

function AttendanceDetails() {
  const { id } = useParams();

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getAttendanceById(id);

        setAttendance(data);
      } catch (error) {
        console.error(
          'Failed to fetch attendance:',
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
  }, [id]);

  if (loading) {
    return <p>Loading attendance...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!attendance) {
    return <p>Attendance record not found.</p>;
  }

  return (
    <div>
      <h1>Attendance Details</h1>

      <p>
        <strong>Employee:</strong>{' '}
        {attendance.employeeName}
      </p>

      <p>
        <strong>Employee Code:</strong>{' '}
        {attendance.employeeCode}
      </p>

      <p>
        <strong>Date:</strong>{' '}
        {attendance.attendanceDate}
      </p>

      <p>
        <strong>Check In:</strong>{' '}
        {attendance.checkIn || '-'}
      </p>

      <p>
        <strong>Check Out:</strong>{' '}
        {attendance.checkOut || '-'}
      </p>

      <p>
        <strong>Status:</strong>{' '}
        {attendance.status}
      </p>

      <p>
        <strong>Remarks:</strong>{' '}
        {attendance.remarks || '-'}
      </p>
    </div>
  );
}

export default AttendanceDetails;