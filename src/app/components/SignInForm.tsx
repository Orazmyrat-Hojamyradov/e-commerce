"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z
    .string({
      required_error: "Please enter your password.",
    })
    .min(6, "Password should be at least 6 digits"),
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
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Success!");
    router.push("/");
  };

  return (
    <div className="p-2 m-2 gap-2 flex flex-col items-center justify-center w-full md:w-[50%]  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 p-2 shadow border rounded-md w-full"
      >
        <Input
          className="w-full"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          text="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing in..." : "Submit"}
        </Button>
      </form>
      <span className="text-center text-muted-foreground">or</span>
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
