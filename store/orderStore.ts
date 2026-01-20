import { create } from "zustand";
import { CartItem } from "./cartStore";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  restaurantId: string;
  date: string;
  status: "Pending" | "Preparing" | "Delivering" | "Delivered";
}

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;
  addOrder: (items: CartItem[], total: number, restaurantId: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  activeOrder: null,

  addOrder: (items, total, restaurantId) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items,
      total,
      restaurantId,
      date: new Date().toISOString(),
      status: "Preparing",
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      activeOrder: newOrder,
    }));
  },
}));
