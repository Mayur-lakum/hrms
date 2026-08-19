import api from './api';

export const applyLeave = async (leaveData) => {
  const response = await api.post(
    '/api/leaves',
    leaveData
  );

  return response.data;
};

export const getAllLeaves = async () => {
  const response = await api.get('/api/leaves');

  return response.data;
};

export const getLeaveById = async (id) => {
  const response = await api.get(
    `/api/leaves/${id}`
  );

  return response.data;
};

export const getEmployeeLeaves = async (employeeId) => {
  const response = await api.get(
    `/api/leaves/employee/${employeeId}`
  );

  return response.data;
};

export const updateLeaveStatus = async (
  id,
  status
) => {
  const response = await api.put(
    `/api/leaves/${id}/status`,
    null,
    {
      params: {
        status,
      },
    }
  );

  return response.data;
};