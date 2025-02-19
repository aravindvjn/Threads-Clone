"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const ArrowBack = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="flex items-center text-[18px] -translate-x-[7px] gap-[4px]">
      <IoIosArrowBack size={20}/> Back
    </button>
  );
};

export default ArrowBack;
