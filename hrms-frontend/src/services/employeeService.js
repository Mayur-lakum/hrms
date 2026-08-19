import api from './api';

export const getEmployees = async (
  page = 0,
  size = 10,
  sortBy = 'id',
  sortDir = 'asc'
) => {
  const response = await api.get('/api/employees', {
    params: {
      page,
      size,
      sortBy,
      sortDir,
    },
  });

  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/api/employees/${id}`);

  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await api.post('/api/employees', employeeData);

  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(
    `/api/employees/${id}`,
    employeeData
  );

  return response.data;
};

export const deleteEmployee = async (id) => {
  await api.delete(`/api/employees/${id}`);
};

export const getMyProfile = async () => {
  const response = await api.get('/api/employees/me');
  return response.data;
};