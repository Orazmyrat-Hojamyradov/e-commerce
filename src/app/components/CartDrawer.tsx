"use client";

import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sheet } from "lucide-react";

export const CartDrawer: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center" asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0">
        <SheetHeader>
          <SheetTitle>
            Items in Cart: <span className="font-bold">3</span>
          </SheetTitle>
        </SheetHeader>

        <Button />

        <SheetFooter className="mb-2 flex flex-row items-center justify-center">
          <div className="w-full">
            <span className="flex flex-1 text-lg text-neutral-500">
              Total
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            <span className="font-bold text-lg">100</span>
          </div>

          <Button className="w-full h-12 text-base">
            Buy <ArrowRight className="w-5 ml-2" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
