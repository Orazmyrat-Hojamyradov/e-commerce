import { NavLink } from "../components/NavLink";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
                  <Button variant="default" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <span className="sr-only">Open menu</span>
                  </Button>
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
