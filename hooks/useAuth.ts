import { api } from "@/api/axios";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useRegisterMutation = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/auth/register", {
        ...data,
        role: "CUSTOMER",
      });
      return response.data?.user;
    },
    onSuccess: (data) => {
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
      };
      setAuth(user, true);
      Toast.show({
        type: "success",
        text1: "Welcome!",
        text2: "Account created successfully 👋",
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.response?.data?.message || "Something went wrong",
      });
    },
  });
};

export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: any) => {
      const response = await api.post("/auth/login", credentials);
      return response.data?.user;
    },
    onSuccess: (data: any) => {
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
      };
      setAuth(user, true);
      Toast.show({
        type: "success",
        text1: "Welcome Back!",
        text2: " innovative login successfully 🚀",
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response?.data?.message || "Invalid email or password",
      });
    },
  });
};
