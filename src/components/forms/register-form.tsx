"use client";
import Link from "next/link";
import React, { useActionState } from "react";
import ThreadBannerLogo from "../logo/thread-banner-logo";
import { IoArrowBack } from "react-icons/io5";
import { authAction } from "@/lib/actions/auth-action";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(authAction, {
    isLogin: true,
  });

  const inputClasses =
    "p-[15px] outline-none rounded-lg bg-cardcolor placeholder:opacity-60";

  return (
    <form
      action={formAction}
      className="flex flex-col gap-[15px] p-[20px] justify-center w-full h-dvh"
    >
      <div className="flex justify-center">
        <ThreadBannerLogo />
      </div>

      <p className="text-center font-semibold text-[18px]">
        Register a new Threads account
      </p>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className={inputClasses}
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        className={inputClasses}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        className={inputClasses}
      />

      <button className="p-[15px] bg-foreground font-semibold text-background rounded-lg">
        Register Account
      </button>

      <p className="pt-[10px] opacity-60">Already have an account?</p>

      <Link
        href={"/auth"}
        className="p-[15px] border border-bordercolor rounded-lg gap-[10px] flex items-center justify-center font-semibold"
      >
        <IoArrowBack />
        Back to Login
      </Link>
    </form>
  );
};

export default RegisterForm;
