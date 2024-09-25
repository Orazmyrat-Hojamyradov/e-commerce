import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/storeCart";
import Image from "next/image";

export default function CartItem({ product }: { product: any }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (!product) {
    return null;
  }

  return (
    <div className="w-full bg-black text-white flex flex-row justify-between items-center gap-2 p-3 rounded-2xl">
      <div className="bg-gray-200 w-[80px] h-[80px] self-start hidden md:block rounded-xl">
        <Image
          width={80}
          className="rounded-xl h-full w-full p-2"
          src={product.imagePath}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 flex-1">
        <span className="font-bold">{product.name}</span>
        <span>${product.priceInCents / 100}</span>
        <p>{product.descryption || "No description"}</p>
      </div>
      <Button
        onClick={() => {
          removeFromCart(product.id);
        }}
        asChild
        variant="destructive"
        className="w-[35px] h-[35px] cursor-pointer"
      >
        <span className="font-bold text-xl">X</span>
      </Button>
    </div>
  );
}
