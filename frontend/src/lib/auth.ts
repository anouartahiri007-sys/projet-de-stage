import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'guest' | 'doctor' | 'nurse' | 'veterinarian' | 'rh' | 'candidat';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  cin?: string;
  department?: string;
  matricule?: string;
  profession?: string;
  preferences?: any;
  created_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string, remember?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token, remember = false) => {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('auth-token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        // clear persisted token from both storages
        localStorage.removeItem('auth-token');
        sessionStorage.removeItem('auth-token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // persisted to localStorage via zustand middleware
    }
  )
);

