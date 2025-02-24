"use client";
import Link from "next/link";
import React, { useActionState } from "react";
import ThreadBannerLogo from "../logo/thread-banner-logo";
import { IoArrowBack } from "react-icons/io5";
import { authAction } from "@/lib/actions/auth-action";

export const inputClasses =
"p-[15px] outline-none rounded-lg bg-cardcolor placeholder:opacity-60";


const RegisterForm = () => {

  //Handle server action to register a new user
  const [state, formAction, isPending] = useActionState(authAction, {
    isLogin: false,
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
        Register a new Threads account
      </p>

      <input
        minLength={3}
        maxLength={20}
        defaultValue={state.data?.name}
        type="text"
        name="name"
        placeholder="Name"
        className={inputClasses}
      />
      <input
        defaultValue={state.data?.email}
        type="email"
        name="email"
        placeholder="Email"
        className={inputClasses}
      />
      <input
        minLength={3}
        maxLength={15}
        defaultValue={state.data?.username}
        type="text"
        placeholder="Username"
        name="username"
        className={inputClasses}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const target = e.currentTarget;
          target.value = target.value.replace(/[^a-z0-9_]/g, "");
        }}
      />

      <input
        minLength={8}
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
        {isPending ? "Registering..." : "Register Account"}
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
