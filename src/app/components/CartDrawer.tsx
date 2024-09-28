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
import { useSession } from "next-auth/react";
import Link from "next/link";

export const CartDrawer: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { data: session } = useSession();
  const { cartItems } = useCartStore();

  const uniqueItems = cartItems.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const totalPrice = Array.isArray(uniqueItems)
    ? uniqueItems.reduce((total, item) => total + item.priceInCents, 0)
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
            <span className="font-bold">
              {session ? uniqueItems.length : 0}
            </span>
          </SheetTitle>
        </SheetHeader>

        {session ? (
          <div className="flex flex-col w-full h-full gap-2 p-2 overflow-auto">
            {uniqueItems.length > 0 ? (
              uniqueItems.map((item) => (
                <CartItem key={item.id} product={item} />
              ))
            ) : (
              <div className="text-center font-bold my-auto text-xl">
                No items in the cart.
              </div>
            )}
          </div>
        ) : (
          <Button asChild>
            <Link
              href="/auth/signup"
              className="text-center font-bold my-auto text-lg md:text-xl"
            >
              Sign Up To Use Cart
            </Link>
          </Button>
        )}

        <SheetFooter className="mb-2 flex flex-row items-center justify-center">
          <div className="w-full">
            <span className="flex flex-1 text-lg text-neutral-500">
              Total
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            <span className="font-bold text-lg">
              {session ? formatCurrency(totalPrice / 100) : "$0"}
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
