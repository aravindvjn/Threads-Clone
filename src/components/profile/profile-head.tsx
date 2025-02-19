import React from "react";
import ArrowBack from "../buttons/arrow-back";
import { BsInstagram } from "react-icons/bs";
import { PiDotsThreeCircle } from "react-icons/pi";
import ProfilePic from "../post/profile-pic";
import FollowersStatus from "./followers-stats";

const ProfileHead = () => {
  return (
    <div className="p-[20px]">
      <div className="flex items-center justify-between">
        <ArrowBack />
        <div className="flex items-center gap-[16px]">
          <BsInstagram size={20} />
          <PiDotsThreeCircle size={25} />
        </div>
      </div>
      <div className="flex py-[18px] justify-between">
        <div>
          <p className="text-[22px] pr-[10px] overflow-hidden font-semibold">
            Mark ZuckerBerg
          </p>
          <p>zuck</p>
        </div>
        <ProfilePic profilePic="" size={72} />
      </div>
      <FollowersStatus />
    </div>
  );
};

export default ProfileHead;
