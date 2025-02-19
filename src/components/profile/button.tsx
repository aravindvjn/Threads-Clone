"use client";
import React, { useState } from "react";
import { FollowStatusType } from "./type";

const Button = ({ padding = 8 }: { padding?: number }) => {
  const [status, setStatus] = useState<FollowStatusType>("Follow");

  const handleStatus = () => {
    setStatus((prevStatus) =>
      prevStatus === "Follow" ? "Following" : "Follow"
    );
  };

  const ButtonClasses =
    status === "Follow" ? "bg-foreground text-background" : "";

  return (
    <button
      style={{
        paddingTop: padding,
        paddingBottom: padding,
      }}
      onClick={handleStatus}
      className={`text-center  w-full text-[18px] font-semibold rounded-xl border border-foreground ${ButtonClasses}`}
    >
      {status}
    </button>
  );
};

export default Button;
