import React from "react";
import ProfilePic from "../post/profile-pic";
import Button from "../profile/button";
import { CgClose } from "react-icons/cg";
import Link from "next/link";

type SingleSuggestionType = {
  name: string;
  username: string;
  profilePic: string | null;
};
const SingleSuggestion = ({
  name,
  profilePic,
  username,
}: SingleSuggestionType) => {
  return (
    <Link href={`/@${username}`} className="flex relative rounded-2xl flex-col items-center min-w-[180px] text-center p-[15px] pt-[20px] gap-[7px] bg-cardcolor">
      <button className="opacity-60 absolute right-[14px] top-[14px]">
        <CgClose />
      </button>
      <ProfilePic username="" size={90} profilePic={profilePic || ""} />
      <p className="font-bold line-clamp-1">{name}</p>
      <p className="opacity-60 line-clamp-1">{username}</p>
      <Button follow="Follow" username={username} />
    </Link>
  );
};

export default SingleSuggestion;
