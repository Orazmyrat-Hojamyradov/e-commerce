"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function NavLink(props: Omit<ComponentProps<typeof Link>, "classname">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        " text-lg  m-2 rounded-3xl transition-all p-2 hover:bg-foreground hover:text-background focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-foreground text-background"
      )}
    />
  );
}
