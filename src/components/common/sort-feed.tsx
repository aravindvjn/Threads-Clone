"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SortFeed = () => {
  
  const pathName = usePathname();

  const commonClasses = "flex-1 font-semibold pb-[10px] flex justify-center";

  return (
    <div className="flex justify-around w-full">
      <Link
        className={`${pathName === "/" ? "border-b-2 border-white" : ""} ${commonClasses}`}
        href={"/"}
      >
        For you
      </Link>
      <Link
        className={`${pathName === "/following" ? "border-b-2 border-white" : ""} ${commonClasses}`}
        href={"/following"}
      >
        Following
      </Link>
    </div>
  );
};

export default SortFeed;
