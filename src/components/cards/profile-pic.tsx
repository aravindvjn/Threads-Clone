import Image from "next/image";
import React from "react";

type ProfilePictureProps = {
  profilePic: string;
  size: number;
};

const defaultProfilePicture =
  "https://images.pexels.com/photos/30773764/pexels-photo-30773764/free-photo-of-vibrant-outdoor-fashion-shoot-with-red-accents.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
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
