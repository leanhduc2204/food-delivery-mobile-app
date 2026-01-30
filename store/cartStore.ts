import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
}

interface CartState {
  cartItems: CartItem[];
  restaurantId: string | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  restaurantId: null,

  addItem: (product) => {
    const { cartItems, restaurantId } = get();

    // Check if adding from a different restaurant
    if (restaurantId && restaurantId !== product.restaurantId) {
      // Ideally ask user to clear cart, for now we just clear it
      set({
        cartItems: [{ ...product, quantity: 1 }],
        restaurantId: product.restaurantId,
      });
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
        restaurantId: product.restaurantId,
      });
    } else {
      set({
        cartItems: [...cartItems, { ...product, quantity: 1 }],
        restaurantId: product.restaurantId,
      });
    }
  },

  removeItem: (itemId) => {
    const { cartItems } = get();
    const existingItem = cartItems.find((item) => item.id === itemId);

    if (existingItem && existingItem.quantity > 1) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      });
    } else {
      set({
        cartItems: cartItems.filter((item) => item.id !== itemId),
      });
    }
  },

  clearCart: () => set({ cartItems: [], restaurantId: null }),

  getTotalPrice: () => {
    const { cartItems } = get();
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  },

  getItemCount: () => {
    const { cartItems } = get();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  },
}));
