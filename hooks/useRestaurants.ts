import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "./useCategories";
import { GlobalCategory } from "./useGlobalCategories";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GlobalCategoryLink {
  restaurantId: string;
  globalCategoryId: string;
  globalCategory: GlobalCategory;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  image: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  categories: Category[];
  createdAt?: string;
  updatedAt?: string;
  globalCategoryLinks: GlobalCategoryLink[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface RestaurantsResponse {
  data: Restaurant[];
  pagination: Pagination;
}

export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await api.get<RestaurantsResponse>("/restaurants");
      return response.data.data;
    },
  });
};

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await api.get<Restaurant>(`/restaurants/${id}`);
      return response.data;
    },
  });
};
