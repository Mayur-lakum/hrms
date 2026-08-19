import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDepartmentById,
  updateDepartment,
} from '../services/departmentService';

function EditDepartment() {
  const { id } = useParams();

  const [formData, setFormData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getDepartmentById(id);

        setFormData({
          name: data.name || '',
          description: data.description || '',
          active:
            data.active !== undefined
              ? data.active
              : true,
        });
      } catch (error) {
        console.error(
          'Failed to load department:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load department.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      await updateDepartment(id, formData);

      setSuccess(
        'Department updated successfully!'
      );
    } catch (error) {
      console.error(
        'Failed to update department:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to update department.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading department...</p>;
  }

  if (error && !formData) {
    return <p>{error}</p>;
  }

  if (!formData) {
    return <p>Department not found.</p>;
  }

  return (
    <div>
      <h1>Edit Department</h1>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Department Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength="100"
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
            rows="4"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />

            {' '}Active
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? 'Updating...'
            : 'Update Department'}
        </button>

      </form>
    </div>
  );
}

export default EditDepartment;