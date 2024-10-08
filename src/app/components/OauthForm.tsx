"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"; // Import signOut if you want to allow signing out too
import { useRouter } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";

export default function OauthForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async (provider: string) => {
    await signIn(provider, { redirect: false });
    setTimeout(
      () =>
        swal({
          text: "Logged In successfully",
          icon: "Success",
        }),
      1500
    );
  };

  return (
    <div className="p-2 m-2 gap-2 flex flex-col items-center justify-center">
      <Button onClick={() => handleSignIn("github")} className="w-full">
        <div className="flex flex-row items-center justify-center gap-2">
          <Github size={25} />
          <p>Sign in with Github</p>
        </div>
      </Button>
      <Button onClick={() => handleSignIn("google")} className="w-full" asChild>
        <div className="flex flex-row items-center justify-center gap-2">
          <FcGoogle size={25} />
          <p>Sign in with Google</p>
        </div>
      </Button>
      {session && (
        <Button
          className="w-full mt-3"
          asChild
          onClick={() => router.push("/")}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <ArrowLeft size={25} />
            <p>Back to Homepage</p>
          </div>
        </Button>
      )}
    </div>
  );
}
