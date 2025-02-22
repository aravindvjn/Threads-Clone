import React from "react";
import ProfilePic from "./profile-pic";
import { MdVerified } from "react-icons/md";
import { timeAgo } from "@/lib/helper/timeago";

const PostHead = ({
  content,
  contentOpacity,
  profilePic,
  username,
  createdAt,
}: {
  content: string;
  contentOpacity?: number;
  id: string;
  username: string;
  profilePic: string | null;
  createdAt?: Date;
}) => {
  return (
    <div className="flex px-[10px] pt-[10px] gap-[12px]">
      <ProfilePic profilePic={profilePic || ""} size={47} />
      <div className="flex flex-col">
        <p className="flex text-[18px] font-semibold items-center gap-1">
          {username} {false && <MdVerified className="text-blue-600" />}
          <span className="text-gray-500 font-normal">
            {timeAgo(createdAt)}
          </span>
        </p>
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
