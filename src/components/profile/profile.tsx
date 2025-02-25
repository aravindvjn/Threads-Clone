import React from "react";
import ProfilePic from "../post/profile-pic";
import FollowersStatus from "./followers-stats";
import { ProfilePropsType } from "./type";
import LoggedInProfile from "./logged-in-profile";
import Activities from "./activities";
import ProfileNav from "./profile-nav";

const ProfileHead = ({
  name,
  profilePic,
  username,
  mutualFollowers,
  followersCount,
  follow,
  isLoggedInUser,
}: ProfilePropsType & {
  isLoggedInUser?: boolean;
}) => {
  return (
    <div>
      
      <ProfileNav />

      <div className="flex p-[20px] justify-between">
        <div>
          <p className="text-[22px] pr-[10px] overflow-hidden font-semibold">
            {name}
          </p>
          <p className="opacity-70">@{username}</p>
        </div>
        <ProfilePic username="" profilePic={profilePic || ""} size={100} />
      </div>

      <div className="px-[20px]" >
        {!isLoggedInUser && (
          <FollowersStatus
            username={username}
            follow={follow}
            followersCount={followersCount}
            mutualFollowers={mutualFollowers}
          />
        )}

        {isLoggedInUser && <LoggedInProfile />}
      </div>

      <Activities username={username} />
    </div>
  );
};

export default ProfileHead;
