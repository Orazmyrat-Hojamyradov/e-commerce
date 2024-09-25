"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/formatters";
import { useCartStore } from "@/lib/storeCart";

export const CartDrawer: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { cartItems } = useCartStore();

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.priceInCents, 0)
    : 0;

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center" asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 ">
        <SheetHeader>
          <SheetTitle>
            Items in Cart:
            <span className="font-bold"> {cartItems.length}</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col w-full h-full gap-2 p-2 overflow-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} product={item} />)
          ) : (
            <div className="text-center font-bold my-auto text-xl">
              No items in the cart.
            </div>
          )}
        </div>

        <SheetFooter className="mb-2 flex flex-row items-center justify-center">
          <div className="w-full">
            <span className="flex flex-1 text-lg text-neutral-500">
              Total
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            <span className="font-bold text-lg">
              {formatCurrency(totalPrice / 100)}
            </span>
          </div>

          <Button className="w-full h-12 text-base">
            Buy <ArrowRight className="w-5 ml-2" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
