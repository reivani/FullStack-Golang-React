import { createContext } from 'react';

// Menentukan tipe dari context value
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Membuat context dengan default value undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);