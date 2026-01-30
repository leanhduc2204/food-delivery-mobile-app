import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { MenuItem, Restaurant } from "./useRestaurants";

export interface Category {
  id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
  restaurantId: string;
  createdAt?: string;
  updatedAt?: string;
  restaurant?: Restaurant;
  menuItems?: MenuItem[];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<Category[]>("/categories");
      return response.data;
    },
  });
};
