"use client";
import { UserDataType } from "@/lib/get-functions/get-user-data";
import React, { useRef } from "react";
import ProfilePic from "../post/profile-pic";
import { inputClasses } from "./register-form";

const EditProfile = (user: UserDataType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const pickImage = () => {
    inputRef.current?.click();
  };
  return (
    <div className="flex flex-col gap-[5px] p-[20px]">
      <p className="font-semibold text-[20px]">Edit Profile</p>
      <div onClick={pickImage} className="mx-auto rounded-full">
        <ProfilePic
          username=""
          profilePic={user?.profilePic || ""}
          size={150}
        />
        <input ref={inputRef} type="file" className="hidden" />
      </div>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className={inputClasses}
        defaultValue={user?.name}
      />

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className={inputClasses}
        defaultValue={user?.username}
      />
      <button className="my-[20px] bg-foreground text-background  p-[10px] rounded-lg font-semibold">Save Changes</button>
    </div>
  );
};

export default EditProfile;
