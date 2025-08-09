'use client';
import { createContext, useState, useContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string;
  view: string;
  setView: (view: string) => void;
  onLogin: (role: string) => void;
  onSignup: () => void;
  onRoleChange: (role: string | null) => void;
  onSwitchToSignup: () => void;
  onSwitchToLogin: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('Worker'); // 'Worker', 'Manager', 'HR', 'MD'
  const [view, setView] = useState('login'); // 'login' or 'signup'

  const onLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setView('login');
  };

  const onSignup = () => {
    // In a real application, you would send this data to a backend API
    // For this example, we'll just log the user in as a worker after "signup"
    console.log('User signed up. Redirecting to dashboard.');
    setIsLoggedIn(true);
    setUserRole('Worker');
  };

  const onRoleChange = (role: string | null) => {
    if (role === null) {
      setIsLoggedIn(false);
      setView('login');
    } else {
      setUserRole(role);
    }
  };

  const onSwitchToSignup = () => {
    setView('signup');
  };

  const onSwitchToLogin = () => {
    setView('login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, view, setView, onLogin, onSignup, onRoleChange, onSwitchToSignup, onSwitchToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
