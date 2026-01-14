import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


axios.defaults.withCredentials = true;
// Set the base URL for axios requests
// In production (Vercel), this will be the Render backend URL
// In development, it falls back to localhost:5000 if not set
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set token in headers if it exists in storage on load
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get('/api/auth/profile');
      setUser(data);
    } catch (error) {
       // If profile check fails, clear token (invalid or expired)
       localStorage.removeItem('token');
       delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token); // Save token
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set header
    setUser(data);
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password });
    localStorage.setItem('token', data.token); // Save token
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set header
    setUser(data);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error(error);
    }
    localStorage.removeItem('token'); // Clear token
    delete axios.defaults.headers.common['Authorization']; // Clear header
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
