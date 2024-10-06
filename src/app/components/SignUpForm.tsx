"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import validator from "validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { users } from "@/lib/data"; // Import the users array

// Validation schema using Zod
const FormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(45, "First name must be less than 45 characters"),
    lastname: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(45, "Last name must be less than 45 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(45, "Password must be less than 45 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(45, "Password must be less than 45 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...userData } = data;

    try {
      // Check if the user already exists
      const existingUser = users.find((user) => user.email === userData.email);

      if (existingUser) {
        toast.error("User with this email already exists.");
        return;
      }

      // Add new user to the users array
      users.push({
        id: users.length + 1, // Automatically assign an ID
        ...userData,
      });

      toast.success("User Registered Successfully.");

      // Simulate sign-in after successful registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
      });

      if (signInResult?.error) {
        toast.error("Failed to sign in after registration.");
        console.error("Sign-in error:", signInResult.error);
      } else {
        toast.success("User Logged In Successfully.");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="p-2 m-2 gap-2 flex flex-col items-center justify-center ">
      <Button
        onClick={() => {
          signIn("github");
        }}
        className="w-full"
      >
        Sign in with Github <Github size={25} className="ml-4" />
      </Button>
      <Button
        onClick={() => {
          signIn("google");
        }}
        className="w-full"
      >
        Sign in with Google <FcGoogle size={25} className="ml-4" />
      </Button>
    </div>
  );
}
