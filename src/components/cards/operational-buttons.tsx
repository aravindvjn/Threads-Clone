"use client";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Button from "./button";
import { LuSend } from "react-icons/lu";

const OperationalButtons = () => {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const buttonClasses = "flex gap-[2px] opacity-60 items-center";

  return (
    <div className="flex pl-[57px] py-[10px] items-center gap-[18px]">
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
      <Button>
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
