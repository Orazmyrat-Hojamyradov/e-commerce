import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";
import { NavLink } from "./NavLink";
import Hamburger from "./Hamburger";

const links = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/products",
    name: "Products",
  },
  {
    link: "/admin",
    name: "Dashboard",
  },
];

export function Nav() {
  return (
    <nav className="sticky border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Ez downloads
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 ">
              {links.map((link) => (
                <NavLink key={link.name} href={link.link}>
                  {link.name}
                </NavLink>
              ))}

              <CartButton />
              <AuthButton />
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-center items-center md:hidden">
            <CartButton />
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex flex-row items-center justify-center gap-3">
                  <Hamburger />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-5 text-center font-bold">
                  {links.map((link) => (
                    <NavLink
                      key={link.name}
                      href={link.link}
                      className="w-full"
                    >
                      <SheetClose className="w-full">{link.name}</SheetClose>
                    </NavLink>
                  ))}

                  <SheetClose className="w-full">
                    <AuthButton />
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
