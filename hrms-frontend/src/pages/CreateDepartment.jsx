import { useState } from 'react';
import { createDepartment } from '../services/departmentService';

function CreateDepartment() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

      await createDepartment(formData);

      setSuccess('Department created successfully!');

      setFormData({
        name: '',
        description: '',
        active: true,
      });
    } catch (error) {
      console.error(
        'Failed to create department:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to create department.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create Department</h1>

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
            ? 'Creating...'
            : 'Create Department'}
        </button>

      </form>
    </div>
  );
}

export default CreateDepartment;