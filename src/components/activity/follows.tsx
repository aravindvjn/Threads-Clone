import React from "react";
import ListedSingleProfile from "../common/listed-single-profile";
import ProfilePic from "../post/profile-pic";
import { timeAgo } from "@/lib/helper/timeago";
import { getFollowsActivity } from "@/lib/get-functions/activities/get-follows-activity";

const Follows = async () => {
  const follows: FollowActivityType[] = await getFollowsActivity();

  if (follows.length === 0) {
    return <p className="pt-[40px] opacity-50 text-center">No Activity yet.</p>;
  }
  return (
    <div>
      {follows?.map((user, index) => (
        <div key={index} className="flex py-[10px] px-[10px] gap-[10px]">
          <div className="w-[60px]">
            <ProfilePic
              username={user.follower.username}
              profilePic={user.follower.profilePic || ""}
              size={50}
            />
          </div>
          <div className="w-full">
            <p className="font-semibold">
              {user.follower.username}{" "}
              <span className="pl-[2px] opacity-40 text-[14px]">
                {timeAgo(user.createdAt)}
              </span>
            </p>
            <p className="opacity-60 text-[14px]">Followed you</p>
            <hr className="opacity-30 sm:opacity-15 mt-[10px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Follows;
