import React from "react";
import ProfilePic from "./profile-pic";
import { MdVerified } from "react-icons/md";
import { timeAgo } from "@/lib/helper/timeago";
import type { PostHeadProps } from "./type";
import Link from "next/link";

const PostHead = ({
  content,
  contentOpacity,
  profilePic,
  username,
  createdAt,
}:PostHeadProps ) => {
  return (
    <div className="flex px-[10px] pt-[10px] gap-[12px]">

      <ProfilePic username={username} profilePic={profilePic || ""} size={47} />

      <div className="flex flex-col">
        <Link href={`/@${username}`} className="flex text-[18px] font-semibold items-center gap-1">

          {username} {false && <MdVerified className="text-blue-600" />}

          <span className="text-gray-500 font-normal pl-1">
            {timeAgo(createdAt)}
          </span>

        </Link>
        <p
          style={{
            opacity: contentOpacity,
          }}
        >
          {content}
        </p>
      </div>

    </div>
  );
};

export default PostHead;
