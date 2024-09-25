import { ProductCardProps } from "@/app/components/ProductCard";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cartItems: ProductCardProps[];
  addToCart: (product: ProductCardProps) => void;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product) =>
        set((state) => ({
          cartItems: [...state.cartItems, product],
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
