import { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import { createAttendance } from '../services/attendanceService';

function CreateAttendance() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: '',
    attendanceDate: '',
    checkIn: '',
    checkOut: '',
    status: '',
    remarks: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      const requestData = {
        employeeId: Number(formData.employeeId),
        attendanceDate: formData.attendanceDate,
        checkIn: formData.checkIn || null,
        checkOut: formData.checkOut || null,
        status: formData.status,
        remarks: formData.remarks || null,
      };

      await createAttendance(requestData);

      setSuccess(
        'Attendance created successfully!'
      );

      setFormData({
        employeeId: '',
        attendanceDate: '',
        checkIn: '',
        checkOut: '',
        status: '',
        remarks: '',
      });
    } catch (error) {
      console.error(
        'Failed to create attendance:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to create attendance.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <h1>Create Attendance</h1>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Employee</label>

          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
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

        <div>
          <label>Attendance Date</label>

          <input
            type="date"
            name="attendanceDate"
            value={formData.attendanceDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Check In</label>

          <input
            type="time"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Check Out</label>

          <input
            type="time"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Status
            </option>

            <option value="PRESENT">
              Present
            </option>

            <option value="ABSENT">
              Absent
            </option>

            <option value="HALF_DAY">
              Half Day
            </option>

            <option value="ON_LEAVE">
              ON Leave
            </option>
          </select>
        </div>

        <div>
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? 'Creating...'
            : 'Create Attendance'}
        </button>

      </form>
    </div>
  );
}

export default CreateAttendance;