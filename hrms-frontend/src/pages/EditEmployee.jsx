import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDepartments } from '../services/departmentService';

import {
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from '../services/employeeService';

function EditEmployee() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);
        setError('');

        const [
          employeeData,
          departmentData,
          employeeListData,
        ] = await Promise.all([
          getEmployeeById(id),
          getDepartments(),
          getEmployees(0, 100, 'id', 'asc'),
        ]);

        setEmployee(employeeData);

        setFormData({
          employeeCode: employeeData.employeeCode || '',
          firstName: employeeData.firstName || '',
          lastName: employeeData.lastName || '',
          phone: employeeData.phone || '',
          gender: employeeData.gender || '',
          dateOfBirth: employeeData.dateOfBirth || '',
          joiningDate: employeeData.joiningDate || '',
          designation: employeeData.designation || '',
          salary: employeeData.salary || '',
          departmentId: employeeData.departmentId || '',
          managerId: employeeData.managerId || '',
          status: employeeData.status || 'ACTIVE',
          profileImage: employeeData.profileImage || '',
          userId: employeeData.userId || '',
        });

        setDepartments(departmentData);
        setManagers(employeeListData.content);
      } catch (error) {
        console.error(
          'Failed to load employee data:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load employee data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id]);

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

        departmentId: Number(
          formData.departmentId
        ),

        managerId: formData.managerId
          ? Number(formData.managerId)
          : null,

        userId: Number(formData.userId),
      };

      const updatedEmployee = await updateEmployee(
        id,
        requestData
      );

      setEmployee(updatedEmployee);

      setFormData({
        employeeCode:
          updatedEmployee.employeeCode || '',
        firstName:
          updatedEmployee.firstName || '',
        lastName:
          updatedEmployee.lastName || '',
        phone:
          updatedEmployee.phone || '',
        gender:
          updatedEmployee.gender || '',
        dateOfBirth:
          updatedEmployee.dateOfBirth || '',
        joiningDate:
          updatedEmployee.joiningDate || '',
        designation:
          updatedEmployee.designation || '',
        salary:
          updatedEmployee.salary || '',
        departmentId:
          updatedEmployee.departmentId || '',
        managerId:
          updatedEmployee.managerId || '',
        status:
          updatedEmployee.status || 'ACTIVE',
        profileImage:
          updatedEmployee.profileImage || '',
        userId:
          updatedEmployee.userId || '',
      });

      setSuccess(
        'Employee updated successfully!'
      );
    } catch (error) {
      console.error(
        'Failed to update employee:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to update employee.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading employee...</p>;
  }

  if (error && !formData) {
    return <p>{error}</p>;
  }

  if (!formData || !employee) {
    return <p>Employee data not found.</p>;
  }

  return (
    <div>
      <h1>Edit Employee</h1>

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
            <option value="">
              Select Gender
            </option>

            <option value="MALE">
              Male
            </option>

            <option value="FEMALE">
              Female
            </option>
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
            <option value="">
              Select Department
            </option>

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
            <option value="">
              No Manager
            </option>

            {managers
              .filter(
                (manager) =>
                  manager.id !== employee.id
              )
              .map((manager) => (
                <option
                  key={manager.id}
                  value={manager.id}
                >
                  {manager.firstName}{' '}
                  {manager.lastName}
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
            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
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
            readOnly
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Updating...'
              : 'Update Employee'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditEmployee;