import React from "react";
import defaultProfilePicture from "../../assets/default-profile.svg";
import Image from "next/image";
import { ProfilePictureProps } from "./type";
import Link from "next/link";

const ProfilePic = ({ profilePic, size, username }: ProfilePictureProps) => {
  const image = (
    <Image
      style={{
        width: size,
        height: size,
      }}
      className="rounded-full object-cover aspect-square"
      src={profilePic || defaultProfilePicture}
      height={size}
      width={size}
      alt="profile picture of user"
    />
  );
  if (username) {
    return <Link href={`/@${username}`}>{image}</Link>;
  }
  return image;
};

export default ProfilePic;
