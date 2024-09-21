"use client";

import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface PasswordInputProps {
  text: string;
  error?: string;
}

function PasswordInput(
  props: PasswordInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const { text, error, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative col-span-2">
      <Input
        {...rest}
        ref={ref}
        type={showPassword ? "text" : "password"}
        placeholder={text}
        className={cn(
          "pr-10",
          error ? "border-red-500 focus-visible:ring-red-500" : ""
        )}
      />
      <button
        type="button"
        className={clsx(
          error
            ? "absolute right-0 top-0 h-[60%] px-3  hover:bg-transparent "
            : "absolute right-0 top-0 h-full px-3  hover:bg-transparent "
        )}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOffIcon className=" h-4 w-4 text-gray-500" />
        ) : (
          <EyeIcon className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {error && <p className="pt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Wrap the PasswordInput with forwardRef to pass refs
const ForwardedPasswordInput = forwardRef(PasswordInput);

export default ForwardedPasswordInput;
