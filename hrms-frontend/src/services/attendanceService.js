import api from './api';

export const createAttendance = async (attendanceData) => {
  const response = await api.post(
    '/api/attendance',
    attendanceData
  );

  return response.data;
};

export const getAttendanceById = async (id) => {
  const response = await api.get(
    `/api/attendance/${id}`
  );

  return response.data;
};

export const getEmployeeAttendance = async (employeeId) => {
  const response = await api.get(
    `/api/attendance/employee/${employeeId}`
  );

  return response.data;
};

export const updateAttendance = async (
  id,
  attendanceData
) => {
  const response = await api.put(
    `/api/attendance/${id}`,
    attendanceData
  );

  return response.data;
};
