import { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import { getEmployeeAttendance } from '../services/attendanceService';
import { Link } from 'react-router-dom';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [attendance, setAttendance] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoadingEmployees(true);
        setError('');

        const data = await getEmployees(
          0,
          100,
          'id',
          'asc'
        );

        setEmployees(data.content);
      } catch (error) {
        console.error(
          'Failed to fetch employees:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load employees.'
        );
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = async (event) => {
    const employeeId = event.target.value;

    setSelectedEmployeeId(employeeId);
    setAttendance([]);
    setError('');

    if (!employeeId) {
      return;
    }

    try {
      setLoadingAttendance(true);

      const data = await getEmployeeAttendance(
        employeeId
      );

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
      setLoadingAttendance(false);
    }
  };

  if (loadingEmployees) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <h1>Attendance</h1>

      {error && <p>{error}</p>}

      <div>
        <label>Employee</label>

        <select
          value={selectedEmployeeId}
          onChange={handleEmployeeChange}
        >
          <option value="">
            Select Employee
          </option>

          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.employeeCode} -{' '}
              {employee.firstName}{' '}
              {employee.lastName}
            </option>
          ))}
        </select>
      </div>

      {loadingAttendance && (
        <p>Loading attendance...</p>
      )}

      {!loadingAttendance &&
        selectedEmployeeId &&
        attendance.length === 0 && (
          <p>No attendance records found.</p>
        )}

      {!loadingAttendance &&
        attendance.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td>{record.attendanceDate}</td>

                  <td>
                    {record.employeeCode} -{' '}
                    {record.employeeName}
                  </td>

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
                  <td>
  <Link to={`/attendance/${record.id}`}>
    View
  </Link>

  {' '}

  <Link to={`/attendance/${record.id}/edit`}>
    Edit
  </Link>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

export default Attendance;

