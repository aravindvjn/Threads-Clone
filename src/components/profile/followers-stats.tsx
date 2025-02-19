import React from "react";
import ProfilePic from "../post/profile-pic";
import Button from "./button";

const FollowersStatus = () => {
  return (
    <div className="flex flex-col gap-[20px]"> 
      <div className="flex items-center">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <SingleProfileRing key={index} index={index} />
            ))}
        <p className="opacity-55 pl-[5px]">412 k followers</p>
      </div>
      <Button />
    </div>
  );
};

export default FollowersStatus;

const SingleProfileRing = ({ index }: { index: number }) => {
  return (
    <div
      className={`relative w-[28px] h-[28px] flex items-center justify-center ${
        index !== 0 ? "-ml-3" : ""
      }`}
    >
      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
        <ProfilePic profilePic="" size={24} />
      </div>
    </div>
  );
};
