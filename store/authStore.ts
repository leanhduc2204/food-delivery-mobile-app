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
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

// Mock delay to simulate API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email) => {
    set({ isLoading: true });
    await delay(1000); // Simulate API call

    // Mock user data
    const user = {
      id: "u123",
      name: "John Doe",
      email: email,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    };

    set({ user, isAuthenticated: true, isLoading: false });
  },

  register: async (name, email) => {
    set({ isLoading: true });
    await delay(1000);

    const user = {
      id: "u124",
      name: name,
      email: email,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    };

    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
