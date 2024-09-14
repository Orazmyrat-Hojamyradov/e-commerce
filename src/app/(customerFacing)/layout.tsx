import React from "react";
import { Nav, NavLink } from "../components/Nav";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Cart</NavLink>
      </Nav>
      <div className="w-full my-6 px-6">{children}</div>
    </>
  );
}
