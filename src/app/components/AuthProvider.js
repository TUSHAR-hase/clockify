'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
const router = useRouter();

  // Initialize auth state from cookie
  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser) {
      try {
        const parsedUser = JSON.parse(cookieUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
         const userData = JSON.parse(Cookies.get("user"));

    // Redirect based on role
    switch (userData.role) {
      case "admin":
        router.push("/pages/admin");
        break;
      case "freelancer":
        router.push("/pages/freelancer");
        break;
      case "client":
        router.push("/pages/client");
        break;
      default:
        router.push("/");
    }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    Cookies.set('user', JSON.stringify(userData), { expires: 7, sameSite: 'strict' });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    Cookies.remove('user');
  };

  // Context value
  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
