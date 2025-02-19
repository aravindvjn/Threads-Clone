import React from "react";
import { MdOutlineGifBox, MdOutlineLocationOn } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { BiPoll } from "react-icons/bi";

const AttachMedia = () => {
  return (
    <div className="flex items-center gap-5 opacity-60 py-[5px]">
      <IoMdPhotos size={25} />
      <MdOutlineGifBox size={25} />
      <BiPoll size={25} />
      <MdOutlineLocationOn size={25} />
    </div>
  );
};

export default AttachMedia;
