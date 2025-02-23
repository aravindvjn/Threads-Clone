import React from "react";
import ArrowBack from "../buttons/arrow-back";
import { BsInstagram } from "react-icons/bs";
import { PiDotsThreeCircle } from "react-icons/pi";
import ProfilePic from "../post/profile-pic";
import FollowersStatus from "./followers-stats";
import { UserDataType } from "@/lib/get-functions/get-user-data";
import { FollowStatusType } from "./type";

export type ProfilePropsType = {
  username: string;
  name: string;
  profilePic: string | null;
  followersCount: number;
  mutualFollowers: {
      name: string;
      profilePic: string | null;
      username: string;
  }[];
  follow:FollowStatusType;
};

const ProfileHead = ({
  name,
  profilePic,
  username,
  mutualFollowers,
  followersCount,
  follow
}: ProfilePropsType) => {

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
            {name}
          </p>
          <p>{username}</p>
        </div>
        <ProfilePic profilePic={profilePic || ""} size={72} />
      </div>

      <FollowersStatus username={username} follow={follow} followersCount={followersCount} mutualFollowers={mutualFollowers} />

    </div>
  );
};

export default ProfileHead;
