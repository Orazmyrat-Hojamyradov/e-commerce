"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Button
          onClick={() => {
            signOut();
          }}
          className="w-[95%] text-lg rounded-3xl transition-all p-2"
          asChild
        >
          <Link className="h-full" href="/">
            Sign Out
          </Link>
        </Button>
      ) : (
        <Button
          className="w-[95%] text-lg  rounded-3xl transition-all p-2"
          asChild
        >
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      )}
    </>
  );
}
