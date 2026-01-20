import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurantId: null,

  addItem: (product) => {
    const { items, restaurantId } = get();

    // Check if adding from a different restaurant
    if (restaurantId && restaurantId !== product.restaurantId) {
      // Ideally ask user to clear cart, for now we just clear it
      set({
        items: [{ ...product, quantity: 1 }],
        restaurantId: product.restaurantId,
      });
      return;
    }

    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
        restaurantId: product.restaurantId,
      });
    } else {
      set({
        items: [...items, { ...product, quantity: 1 }],
        restaurantId: product.restaurantId,
      });
    }
  },

  removeItem: (itemId) => {
    const { items } = get();
    const existingItem = items.find((item) => item.id === itemId);

    if (existingItem && existingItem.quantity > 1) {
      set({
        items: items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      });
    } else {
      set({
        items: items.filter((item) => item.id !== itemId),
      });
    }
  },

  clearCart: () => set({ items: [], restaurantId: null }),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));
