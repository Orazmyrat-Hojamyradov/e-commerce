import React from "react";
import { Nav } from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orazmyrat Hojamyradov",
  description: "My personal portfolio.",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Nav />

      <div className="w-full my-6 px-6">
        {children}
        <ToastContainer />
      </div>
    </div>
  );
}
