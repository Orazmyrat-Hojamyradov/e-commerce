"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react"; // Import signOut if you want to allow signing out too
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { users } from "@/lib/data"; // Import the users array

interface Props {
  callbackUrl?: string;
}

// Validation schema using Zod
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z
    .string({
      required_error: "Please enter your password.",
    })
    .min(6, "Password should be at least 6 characters"),
});

type InputType = z.infer<typeof FormSchema>;

export default function SignInForm(props: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    // Check the user in the JSON array (mocking a database check)
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      toast.error("Invalid email or password!");
      return;
    }

    // Here, you can add any logic to create a session
    // You might want to use next-auth's session management instead
    const signInResult = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (signInResult?.error) {
      toast.error("Sign-in failed. Please try again.");
    } else {
      toast.success("Signed in successfully!");
      // Redirect to the homepage or dashboard
      router.push(props.callbackUrl || "/");
    }
  };

  return (
    <div className="p-2 m-2 gap-2 flex flex-col items-center justify-center">
      <Button onClick={() => signIn("github")} className="w-full">
        Sign in with Github <Github size={25} className="ml-4" />
      </Button>
      <Button onClick={() => signIn("google")} className="w-full">
        Sign in with Google <FcGoogle size={25} className="ml-4" />
      </Button>
    </div>
  );
}
