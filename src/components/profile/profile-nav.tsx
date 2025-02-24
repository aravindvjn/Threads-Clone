import React from "react";
import ArrowBack from "../buttons/arrow-back";
import { BsInstagram } from "react-icons/bs";
import { PiDotsThreeCircle } from "react-icons/pi";

const ProfileNav = () => {
  return (
    <div className="flex p-[20px] items-center justify-between">
      <ArrowBack />

      <div className="flex items-center gap-[16px]">
        <BsInstagram size={20} />
        <PiDotsThreeCircle size={25} />
      </div>
    </div>
  );
};

export default ProfileNav;
