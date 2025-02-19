import React from "react";
import ProfilePic from "../post/profile-pic";
import Button from "../profile/button";
import { CgClose } from "react-icons/cg";

const SingleSuggestion = () => {
  return (
    <div className="flex relative rounded-2xl flex-col items-center min-w-[180px] text-center p-[15px] pt-[20px] gap-[7px] bg-cardcolor">
      <button className="opacity-60 absolute right-[14px] top-[14px]">
        <CgClose />
      </button>
      <ProfilePic size={90} profilePic="" />
      <p className="font-bold line-clamp-1">Aravind Vijayan</p>
      <p className="opacity-60 line-clamp-1">6windh</p>
      <Button />
    </div>
  );
};

export default SingleSuggestion;
