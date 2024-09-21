import SignUpForm from "@/app/components/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="md:col-span-2 flex flex-col justify-center items-center">
      <div className="flex flex-row text-center p-4">
        <p className="text-center font-bold px-2">Already Signed Up?</p>
        <Link href={"/auth/signin"} className="text-blue-700">
          Sign In
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
}
