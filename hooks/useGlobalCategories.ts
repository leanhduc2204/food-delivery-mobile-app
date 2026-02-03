import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface GlobalCategory {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  isActive: boolean;
  sortOrder: number;
}

export const useGlobalCategories = () => {
  return useQuery({
    queryKey: ["global-categories"],
    queryFn: async () => {
      const response = await api.get<GlobalCategory[]>(`/global-categories`);
      return response.data;
    },
  });
};
