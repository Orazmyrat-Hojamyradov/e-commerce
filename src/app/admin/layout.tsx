import React from "react";
import NavAdmin from "../components/NavAdmin";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <NavAdmin />
      <div className="container my-6 px-6">{children}</div>
    </div>
  );
}
