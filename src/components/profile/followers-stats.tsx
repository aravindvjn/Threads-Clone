import React from "react";
import ProfilePic from "../post/profile-pic";
import Button from "./button";
import { UserDataType } from "@/lib/get-functions/get-user-data";
import { FollowStatusType } from "./type";

type ProfileData = {
  mutualFollowers: UserDataType[];
  followersCount: number;
  follow: FollowStatusType;
  username: string;
};

const FollowersStatus = ({
  followersCount,
  mutualFollowers,
  follow,
  username,
}: ProfileData) => {
  const renderMutuals = () => {
    if (mutualFollowers?.length > 0) {
      return mutualFollowers?.map((user, index) => (
        <SingleProfileRing key={user?.username} index={index} {...user!} />
      ));
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex items-center">
        {renderMutuals()}

        <p className="opacity-55 pl-[5px]">{followersCount || 0} followers</p>
      </div>
      <Button username={username} follow={follow} />
    </div>
  );
};

export default FollowersStatus;

const SingleProfileRing = ({
  index,
  profilePic,
}: { index: number } & UserDataType) => {
  return (
    <div
      className={`relative w-[28px] h-[28px] flex items-center justify-center ${
        index !== 0 ? "-ml-3" : ""
      }`}
    >
      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
        <ProfilePic profilePic={profilePic || ""} size={24} />
      </div>
    </div>
  );
};
