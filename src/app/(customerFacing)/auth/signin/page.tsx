import OauthForm from "@/app/components/OauthForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-3">
      <h2 className="font-bold text-lg">Sign In</h2>
      <OauthForm />
    </div>
  );
}
