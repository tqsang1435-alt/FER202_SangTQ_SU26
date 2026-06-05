import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục user từ localStorage khi app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Register (cũng tương tự login)
  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook để sử dụng AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
