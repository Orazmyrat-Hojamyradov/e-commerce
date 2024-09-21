import React from "react";
import { Nav } from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />

      <div className="w-full my-6 px-6">
        {children}
        <ToastContainer />
      </div>
    </>
  );
}
