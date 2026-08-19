import { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import { getEmployeeLeaves } from '../services/leaveService';
import { Link } from 'react-router-dom';

function Leaves() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [leaves, setLeaves] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingLeaves, setLoadingLeaves] = useState(false);

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
    setLeaves([]);
    setError('');

    if (!employeeId) {
      return;
    }

    try {
      setLoadingLeaves(true);

      const data = await getEmployeeLeaves(
        employeeId
      );

      setLeaves(data);
    } catch (error) {
      console.error(
        'Failed to fetch leaves:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to load leaves.'
      );
    } finally {
      setLoadingLeaves(false);
    }
  };

  if (loadingEmployees) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <h1>Leaves</h1>

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

      {loadingLeaves && (
        <p>Loading leaves...</p>
      )}

      {!loadingLeaves &&
        selectedEmployeeId &&
        leaves.length === 0 && (
          <p>No leave records found.</p>
        )}

      {!loadingLeaves &&
        leaves.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>

                  <td>{leave.startDate}</td>

                  <td>{leave.endDate}</td>

                  <td>{leave.reason}</td>

                  <td>{leave.status}</td>

                  <td>
                    <Link
                      to={`/leaves/${leave.id}`}
                    >
                      View
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

export default Leaves;

