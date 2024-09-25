"use client";

import { Button } from "@/components/ui/button";
import { ProductCardProps } from "./ProductCard";
import { useCartStore } from "@/lib/storeCart";

type AddToCartButtonProps = {
  product: ProductCardProps;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="text-white px-4 py-2 w-full rounded"
    >
      Add to Cart
    </Button>
  );
}
