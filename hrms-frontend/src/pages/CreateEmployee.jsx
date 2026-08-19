import { useEffect, useState } from 'react';
import { getDepartments } from '../services/departmentService';
import {
  getEmployees, createEmployee
} from '../services/employeeService';

function CreateEmployee() {
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);

  const [formData, setFormData] = useState({
    employeeCode: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    joiningDate: '',
    designation: '',
    salary: '',
    departmentId: '',
    managerId: '',
    status: 'ACTIVE',
    profileImage: '',
    userId: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);
        setError('');

        const [departmentData, employeeData] = await Promise.all([
          getDepartments(),
          getEmployees(0, 100, 'id', 'asc'),
        ]);

        setDepartments(departmentData);
        setManagers(employeeData.content);
      } catch (error) {
        console.error('Failed to load employee form data:', error);

        setError(
          error.response?.data?.message ||
          'Failed to load form data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
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
        ...formData,
        salary: Number(formData.salary),
        departmentId: Number(formData.departmentId),
        managerId: formData.managerId
          ? Number(formData.managerId)
          : null,
        userId: Number(formData.userId),
      };
      await createEmployee(requestData);
      setSuccess('Employee created successfully!');

      setFormData({
        employeeCode: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        joiningDate: '',
        designation: '',
        salary: '',
        departmentId: '',
        managerId: '',
        status: 'ACTIVE',
        profileImage: '',
        userId: '',
      });
    } catch (error) {
      console.error('Failed to create employee:', error);

      setError(
        error.response?.data?.message ||
        'Failed to create employee.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading employee form...</p>;
  }

  if (error && !submitting) {
    // We still render the form if the supporting data failed,
    // so the error message can be displayed above it.
  }

  return (
    <div>
      <h1>Create Employee</h1>

      {error && <p>{error}</p>}

      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Employee Code</label>
          <input
            type="text"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Department</label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Manager</label>
          <select
            name="managerId"
            value={formData.managerId}
            onChange={handleChange}
          >
            <option value="">No Manager</option>

            {managers.map((manager) => (
              <option
                key={manager.id}
                value={manager.id}
              >
                {manager.firstName} {manager.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div>
          <label>Profile Image URL</label>
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>User ID</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Employee'}
        </button>

      </form>
    </div>
  );
}

export default CreateEmployee;