import React from "react";
import ProfilePic from "../post/profile-pic";
import Button from "../profile/button";

const ListedSingleProfile = () => {
  return (
    <>
      <div className="flex justify-between my-[10px] px-[20px]">
        <div className="flex gap-[15px]">
          <ProfilePic size={45} profilePic="" />
          <div>
            <p className="font-semibold">elonmusk</p>
            <p className="opacity-60">Elon Musk</p>
            <p>38.7 k followers</p>
          </div>
        </div>
        <div className="w-[100px] pt-[10px]">
          <Button padding={2} />
        </div>
      </div>
      <hr className="pb-[10px] opacity-20" />
    </>
  );
};

export default ListedSingleProfile;
