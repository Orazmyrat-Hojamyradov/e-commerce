"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import validator from "validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

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
      const result = await registerUser(userData);

      const signInResult = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
      });

      if (signInResult?.error) {
        toast.error("Failed to sign in after registration.");
        console.error("Sign-in error:", signInResult.error);
      } else {
        toast.success("The User Registered and Logged In Successfully.");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="p-2 m-2 gap-2 flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit(saveUser)}
        className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md"
      >
        <Input
          error={errors.firstname?.message}
          {...register("firstname")}
          placeholder="First Name"
        />
        <Input
          error={errors.lastname?.message}
          {...register("lastname")}
          placeholder="Last Name"
        />
        <Input
          error={errors.email?.message}
          {...register("email")}
          className="col-span-2"
          placeholder="Email"
        />
        <Input
          error={errors.phone?.message}
          {...register("phone")}
          className="col-span-2"
          placeholder="Phone"
        />
        <PasswordInput
          error={errors.password?.message}
          {...register("password")}
          text="Password"
        />
        <PasswordInput
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          text="Confirm Password"
        />
        <Button type="submit" color="primary" className="col-span-2">
          Submit
        </Button>
      </form>
      <span className="text-center text-muted-foreground col-span-2">or</span>
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
