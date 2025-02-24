"use client";
import React, { useState } from "react";
import { FollowStatusType } from "./type";
import { updateFollowers } from "@/lib/actions/update-followers";
import { predictFollowState } from "@/lib/helper/follow-status";

const Button = ({
  padding = 8,
  follow,
  username,
}: {
  padding?: number;
  follow: FollowStatusType;
  username: string;
}) => {

  const [status, setStatus] = useState<FollowStatusType>(follow);

  //Handle Follow update Status
  const handleStatus = async () => {
    setStatus((prev) => predictFollowState(prev));
    const res = await updateFollowers(username);
    if (!res) {
      setStatus((prev) => predictFollowState(prev));
    } else {
      setStatus(res);
    }
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
      className={`text-center w-full text-[18px] font-semibold rounded-xl border border-foreground ${ButtonClasses}`}
    >
      {status}
    </button>
  );
};

export default Button;
