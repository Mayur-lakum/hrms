import { useEffect, useState } from 'react';
import {
  getEmployees,
  deleteEmployee,
} from '../services/employeeService';
import { Link } from 'react-router-dom';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pageSize = 10;

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getEmployees(
        page,
        pageSize,
        'id',
        'asc'
      );

      setEmployees(data.content);
      setPageData(data);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      await deleteEmployee(id);

      await fetchEmployees();
    } catch (error) {
      console.error(
        'Failed to delete employee:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to delete employee.'
      );
    }
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <h1>Employees</h1>

      {error && <p>{error}</p>}

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.employeeCode}</td>

                <td>
                  {employee.firstName}{' '}
                  {employee.lastName}
                </td>

                <td>{employee.email}</td>

                <td>{employee.designation}</td>

                <td>{employee.departmentName}</td>

                <td>{employee.status}</td>

                <td>
                  <Link
                    to={`/employees/${employee.id}`}
                  >
                    View
                  </Link>

                  {' '}

                  <button
                    onClick={() =>
                      handleDelete(employee.id)
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

      {pageData && (
        <div>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>

          <span>
            {' '}
            Page {pageData.number + 1} of{' '}
            {pageData.totalPages}{' '}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={pageData.last}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Employees;