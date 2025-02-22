import React from "react";
import defaultProfilePicture from '../../assets/default-profile.svg'
import Image from "next/image";
type ProfilePictureProps = {
  profilePic: string;
  size: number;
};

const ProfilePic = ({ profilePic, size }: ProfilePictureProps) => {
  return (
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
};

export default ProfilePic;
