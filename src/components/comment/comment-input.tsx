"use client";

import React, { useRef } from "react";
import { MdVerified } from "react-icons/md";
import ProfilePic from "../post/profile-pic";
import AttachMedia from "../common/attach-media";

const CommentInput = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textArea = textAreaRef?.current;
    if (textArea) {
      textArea.style.height = `auto`;
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  return (
    <div className="flex px-[10px] pt-[10px] gap-[12px]">
      <ProfilePic profilePic="" size={47} />
      <div className="flex flex-col">
        <p className="flex text-[18px] font-semibold items-center gap-1">
          elonmusk <MdVerified className="text-blue-600" />
        </p>
        <textarea
          ref={textAreaRef}
          autoFocus
          className="bg-transparent outline-none text-blue-500"
          placeholder={`Reply to ishowspeed`}
          onInput={handleInput}
          rows={1}
        />
        <AttachMedia />
      </div>
    </div>
  );
};

export default CommentInput;
