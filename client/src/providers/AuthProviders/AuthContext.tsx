import React, { createContext, useContext, ReactNode } from 'react';
import AuthStore from '@store/AuthStore';

interface AuthContextProps {
  store: AuthStore;
}

// Создаем контекст
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Создаем обертку для использования в компонентах
export const AuthProvider: React.FC<AuthContextProps & { children: ReactNode }> = ({ store, children }) => {
  return <AuthContext.Provider value={{ store }}>{children}</AuthContext.Provider>;
};

// Создаем хук для использования значения контекста в компонентах
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};