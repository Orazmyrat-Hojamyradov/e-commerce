import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/storeCart";
import { X } from "lucide-react";
import Image from "next/image";

export default function CartItem({ product }: { product: any }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (!product) {
    return null;
  }

  return (
    <div className="relative w-full bg-black text-white flex flex-row justify-between items-center gap-2 p-3 rounded-2xl">
      <div className="bg-zinc-500 w-[85px] h-[85px] my-auto p-2 self-start hidden  md:block rounded-xl">
        <Image
          width={85}
          height={85}
          className="rounded-xl h-full w-full"
          src={product.imagePath}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col items-left justify-center gap-1 flex-1">
        <span className="font-bold text-sm  md:text-xl">{product.name}</span>
        <span className="font-bold text-sm">${product.priceInCents / 100}</span>
        <p>{product.description || "No description"}</p>
      </div>
      <Button
        onClick={() => {
          removeFromCart(product.id);
        }}
        asChild
        variant="destructive"
        className="w-[23px] h-[23px] absolute top-2 right-2 p-0 cursor-pointer"
      >
        <X size={20} />
      </Button>
    </div>
  );
}
