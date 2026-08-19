import api from "./api";

export const getDepartments=async()=>{
    const response = await api.get('/api/departments');

    return response.data;
}

export const getDepartmentById = async (id) => {
  const response = await api.get(`/api/departments/${id}`);

  return response.data;
};

export const createDepartment = async (departmentData) => {
  const response = await api.post(
    '/api/departments',
    departmentData
  );

  return response.data;
};

export const updateDepartment = async (id, departmentData) => {
  const response = await api.put(
    `/api/departments/${id}`,
    departmentData
  );

  return response.data;
};


export const deleteDepartment = async (id) => {
  await api.delete(`/api/departments/${id}`);
};