import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('token')
  );

  const [role, setRole] = useState(() => {
    const savedToken = localStorage.getItem('token');

    if (!savedToken) {
      return null;
    }

    try {
      const decodedToken = jwtDecode(savedToken);
      return decodedToken.role;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  });

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });

    const receivedToken = response.data.token;

    const decodedToken = jwtDecode(receivedToken);

    localStorage.setItem('token', receivedToken);

    setToken(receivedToken);
    setRole(decodedToken.role);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');

    setToken(null);
    setRole(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

