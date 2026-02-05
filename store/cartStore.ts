import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Restaurant {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (restaurant: Restaurant, item: Omit<CartItem, "quantity">) => void;
  increaseQty: (itemId: string) => void;
  decreaseQty: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  updateSpecialInstructions: (
    itemId: string,
    specialInstructions: string,
  ) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      restaurant: null,
      items: [],

      addItem: (restaurant, item) => {
        const { restaurant: currentRestaurant, items } = get();
        if (currentRestaurant && currentRestaurant.id !== restaurant.id) {
          set({ restaurant, items: [{ ...item, quantity: 1 }] });
          return;
        }

        const existing = items.find((i) => i.id === item.id);

        if (existing) {
          set({
            restaurant,
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          set({
            restaurant,
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },

      increaseQty: (itemId) =>
        set({
          items: get().items.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }),

      decreaseQty: (itemId) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        }),

      removeItem: (itemId) =>
        set({
          items: get().items.filter((i) => i.id !== itemId),
        }),

      clearCart: () => set({ items: [], restaurant: null }),

      updateSpecialInstructions: (itemId, specialInstructions) =>
        set({
          items: get().items.map((i) =>
            i.id === itemId ? { ...i, specialInstructions } : i,
          ),
        }),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
