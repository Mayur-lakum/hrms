import { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';
import { applyLeave } from '../services/leaveService';

function ApplyLeave() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
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

      if (formData.endDate < formData.startDate) {
        setError(
          'End date cannot be before start date.'
        );
        return;
      }

      const requestData = {
        employeeId: Number(formData.employeeId),
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
      };

      await applyLeave(requestData);

      setSuccess(
        'Leave applied successfully!'
      );

      setFormData({
        employeeId: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
      });
    } catch (error) {
      console.error(
        'Failed to apply leave:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to apply leave.'
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
      <h1>Apply Leave</h1>

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
          <label>Leave Type</label>

          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Leave Type
            </option>

            <option value="CASUAL">
              Casual Leave
            </option>

            <option value="SICK">
              Sick Leave
            </option>

            <option value="PAID">
              Paid Leave
            </option>

            <option value="UNPAID">
              Unpaid Leave
            </option>
          </select>
        </div>

        <div>
          <label>Start Date</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date</label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Reason</label>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? 'Applying...'
            : 'Apply Leave'}
        </button>

      </form>
    </div>
  );
}

export default ApplyLeave;