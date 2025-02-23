import React from "react";
import ProfilePic from "../post/profile-pic";
import { UserDataType } from "@/lib/get-functions/get-user-data";
import Link from "next/link";

const ListedSingleProfile = (props: UserDataType) => {
  return (
    <Link href={`/@${props?.username}`}>
      <div className="flex justify-between my-[10px] px-[20px]">
        <div className="flex gap-[15px]">
          <ProfilePic size={65} profilePic={props?.profilePic || ""} />
          <div>
            <p className="font-semibold">{props?.name || "Unknown"}</p>
            <p className="opacity-60">{props?.username || "unavailable"}</p>
            <p className="font-light">{props?.followersCount || 0} followers</p>
          </div>
        </div>
        <div className="w-[120px] pt-[10px]">
          {/* <Button padding={2} /> */}
        </div>
      </div>
      <hr className="pb-[10px] opacity-20" />
    </Link>
  );
};

export default ListedSingleProfile;
