import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: (user, isAuthenticated) => {
    set({ user, isAuthenticated });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
