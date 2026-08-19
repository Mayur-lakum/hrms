import { useEffect, useState } from 'react';
import { getMyProfile } from '../services/employeeService';
import {
  getEmployeeLeaves,
  applyLeave
} from '../services/leaveService';

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    leaveType: 'CASUAL',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setError('');

      // Get logged-in employee
      const employeeData = await getMyProfile();

      setEmployee(employeeData);

      // Get leaves belonging to that employee
      const data = await getEmployeeLeaves(employeeData.id);

      setLeaves(data);
    } catch (error) {
      console.error('Failed to load leaves:', error);

      setError(
        error.response?.data?.message ||
        'Failed to load leaves.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!employee) {
      setError('Employee information not available.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      const leaveData = {
        employeeId: employee.id,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      };

      await applyLeave(leaveData);

      setSuccess('Leave application submitted successfully.');

      // Clear form
      setFormData({
        leaveType: 'CASUAL',
        startDate: '',
        endDate: '',
        reason: ''
      });

      setShowForm(false);

      // Refresh leave list
      const updatedLeaves = await getEmployeeLeaves(employee.id);
      setLeaves(updatedLeaves);

    } catch (error) {
      console.error('Failed to apply leave:', error);

      setError(
        error.response?.data?.message ||
        'Failed to apply for leave.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading leaves...</p>;
  }

  return (
    <div>
      <h1>My Leaves</h1>

      {/* Success message */}
      {success && (
        <p>{success}</p>
      )}

      {/* Error message */}
      {error && (
        <p>{error}</p>
      )}

      {/* Apply Leave button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>
          Apply Leave
        </button>
      )}

      {/* Apply Leave Form */}
      {showForm && (
        <div>
          <h2>Apply for Leave</h2>

          <form onSubmit={handleSubmit}>

            <div>
              <label>Leave Type</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="CASUAL">CASUAL</option>
                <option value="SICK">SICK</option>
                <option value="EARNED">EARNED</option>
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
                placeholder="Enter reason for leave"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Apply Leave'}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      {/* Leave List */}
      {leaves.length === 0 ? (
        <p>No leave records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyLeaves;