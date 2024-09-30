import { NavLink } from "../components/NavLink";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Hamburger from "./Hamburger";

const adminLinks = [
  {
    link: "/admin",
    name: "Dashboard",
  },
  {
    link: "/admin/products",
    name: "Products",
  },
  {
    link: "/admin/users",
    name: "Customers",
  },
];

export default function NavAdmin() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Ez downloads
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 ">
              {adminLinks.map((link) => (
                <NavLink key={link.name} href={link.link}>
                  {link.name}
                </NavLink>
              ))}

              {/* <NavLink href="/admin/orders">Sales</NavLink> */}
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-center items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex flex-row items-center justify-center gap-3">
                  <Hamburger />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-5 text-center font-bold">
                  {adminLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      href={link.link}
                      className="w-full"
                    >
                      <SheetClose className="w-full">{link.name}</SheetClose>
                    </NavLink>
                  ))}
                  {/* <NavLink href="/admin/orders">Sales</NavLink> */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
