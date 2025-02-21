"use client";
import Link from "next/link";
import React, { useActionState } from "react";
import ThreadBannerLogo from "../logo/thread-banner-logo";
import { IoArrowForward } from "react-icons/io5";
import { authAction } from "@/lib/actions/auth-action";

const LoginForm = () => {
  const inputClasses =
    "p-[15px] outline-none rounded-lg bg-cardcolor placeholder:opacity-60";

  const [state, formAction, isPending] = useActionState(authAction, {
    isLogin: true,
  });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-[15px] p-[20px] justify-center w-full h-dvh"
    >
      <div className="flex justify-center">
        <ThreadBannerLogo />
      </div>

      <p className="text-center font-semibold text-[18px]">
        Log in with your Instagram account
      </p>

      <input
        defaultValue={state.data?.username}
        type="text"
        placeholder="Username"
        name="username"
        className={inputClasses}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const target = e.currentTarget;
          target.value = target.value.toLowerCase()
          target.value = target.value.replace(/[^a-z0-9_]/g, "");
        }}
      />

      <input
        defaultValue={state.data?.password}
        type="text"
        placeholder="Password"
        name="password"
        className={inputClasses}
      />

      {state.error && <p className="text-red-500">{state.error}</p>}

      <button
        disabled={isPending}
        className="p-[15px] bg-foreground font-semibold text-background rounded-lg"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
      <Link
        className="text-center font-light opacity-60"
        href={"/forgot-password"}
      >
        Forgot password?
      </Link>
      <Link
        href={"/auth/register"}
        className="p-[15px] border border-bordercolor rounded-lg gap-[10px] flex items-center justify-center font-semibold"
      >
        Create new account <IoArrowForward />
      </Link>
    </form>
  );
};

export default LoginForm;
