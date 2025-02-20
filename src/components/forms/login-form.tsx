import Link from "next/link";
import React from "react";
import ThreadBannerLogo from "../logo/thread-banner-logo";
import { IoArrowForward } from "react-icons/io5";

const LoginForm = () => {
  const inputClasses =
    "p-[15px] outline-none rounded-lg bg-cardcolor placeholder:opacity-60";
  return (
    <form className="flex flex-col gap-[15px] p-[20px] justify-center w-full h-dvh">
      <div className="flex justify-center">
        <ThreadBannerLogo />
      </div>
      <p className="text-center font-semibold text-[18px]">
        Log in with your Instagram account
      </p>
      <input type="text" placeholder="Username" name="username" className={inputClasses} />
      <input type="text" placeholder="Password" name="password" className={inputClasses} />
      <button className="p-[15px] bg-foreground font-semibold text-background rounded-lg">
        Login
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
