import React from "react";
import ProfilePic from "./profile-pic";
import { MdVerified } from "react-icons/md";

const PostHead = ({ content }: { content: string }) => {
  return (
    <div className="flex px-[10px] pt-[10px] gap-[12px]">
      <ProfilePic profilePic="" size={47} />
      <div className="flex flex-col gap-[7px]">
        <p className="flex text-[18px] font-semibold items-center gap-1">
          elonmusk <MdVerified className="text-blue-600" />
          <span className="text-gray-500 font-normal"> 10h</span>
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostHead;
