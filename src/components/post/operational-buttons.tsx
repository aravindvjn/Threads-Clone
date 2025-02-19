"use client";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Button from "./button";
import { LuSend } from "react-icons/lu";
import { tree } from "next/dist/build/templates/app-page";
import Comments from "../comment/comments";

const OperationalButtons = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const buttonClasses = "flex gap-[2px] opacity-60 items-center";

  const handleShowComments = () => {
    setShowComments(true);
  };

  return (
    <div className="flex pl-[67px] py-[10px] items-center gap-[18px]">
      <Comments setShowComments={setShowComments} showComments={showComments} />
      <Button onClick={handleLike}>
        <p
          className={`${buttonClasses} ${
            liked ? "text-red-500 opacity-100" : ""
          }`}
        >
          {liked ? <IoMdHeart size={25} /> : <IoIosHeartEmpty size={25} />}
          <span>50</span>
        </p>
      </Button>
      <Button onClick={handleShowComments}>
        <p className={buttonClasses}>
          <FaRegComment size={20} />
          <span>1</span>
        </p>
      </Button>
      <Button>
        <span className={buttonClasses}>
          <LuSend size={20} />
        </span>
      </Button>
    </div>
  );
};

export default OperationalButtons;
