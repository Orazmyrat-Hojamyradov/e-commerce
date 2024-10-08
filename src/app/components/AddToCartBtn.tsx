"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import swal from "sweetalert";
import { useCartStore } from "@/lib/storeCart";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    swal({
      text: "Successfully added to Cart",
      icon: "success",
    });
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
