import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { ShoppingBasket } from "lucide-react";

export default function CartButton() {
  return (
    <CartDrawer>
      <Button className="h-full m-auto rounded-md transition-all p-2  text-lg">
        <ShoppingBasket size={25} />
      </Button>
    </CartDrawer>
  );
}
