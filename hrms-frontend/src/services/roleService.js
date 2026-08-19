import api from './api';

export const getRoles = async () => {
  const response = await api.get('/api/roles');

  return response.data;
};

export const createRole = async (roleData) => {
  const response = await api.post(
    '/api/roles',
    roleData
  );

  return response.data;
};

export const deleteRole = async (id) => {
  const response = await api.delete(
    `/api/roles/${id}`
  );

  return response.data;
};