import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getLeaveById,
  updateLeaveStatus,
} from '../services/leaveService';

function LeaveDetails() {
  const { id } = useParams();

  const [leave, setLeave] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchLeave = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getLeaveById(id);

      setLeave(data);
    } catch (error) {
      console.error(
        'Failed to fetch leave:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to load leave details.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [id]);

  const handleStatusUpdate = async (status) => {
    const action =
      status === 'APPROVED'
        ? 'approve'
        : 'reject';

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this leave?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdating(true);
      setError('');
      setSuccess('');

      const updatedLeave =
        await updateLeaveStatus(id, status);

      setLeave(updatedLeave);

      setSuccess(
        `Leave ${status.toLowerCase()} successfully!`
      );
    } catch (error) {
      console.error(
        'Failed to update leave status:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to update leave status.'
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading leave details...</p>;
  }

  if (error && !leave) {
    return <p>{error}</p>;
  }

  if (!leave) {
    return <p>Leave record not found.</p>;
  }

  return (
    <div>
      <h1>Leave Details</h1>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}

      <div>
        <p>
          <strong>Employee Code:</strong>{' '}
          {leave.employeeCode}
        </p>

        <p>
          <strong>Employee Name:</strong>{' '}
          {leave.employeeName}
        </p>

        <p>
          <strong>Leave Type:</strong>{' '}
          {leave.leaveType}
        </p>

        <p>
          <strong>Start Date:</strong>{' '}
          {leave.startDate}
        </p>

        <p>
          <strong>End Date:</strong>{' '}
          {leave.endDate}
        </p>

        <p>
          <strong>Reason:</strong>{' '}
          {leave.reason}
        </p>

        <p>
          <strong>Status:</strong>{' '}
          {leave.status}
        </p>
      </div>

      {leave.status === 'PENDING' && (
        <div>
          <button
            type="button"
            onClick={() =>
              handleStatusUpdate('APPROVED')
            }
            disabled={updating}
          >
            {updating
              ? 'Updating...'
              : 'Approve'}
          </button>

          {' '}

          <button
            type="button"
            onClick={() =>
              handleStatusUpdate('REJECTED')
            }
            disabled={updating}
          >
            {updating
              ? 'Updating...'
              : 'Reject'}
          </button>
        </div>
      )}

      <br />

      <Link to="/leaves">
        Back to Leaves
      </Link>
    </div>
  );
}

export default LeaveDetails;