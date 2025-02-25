"use client";
import { UserDataType } from "@/lib/get-functions/get-user-data";
import React, { ChangeEvent, useActionState, useRef, useState } from "react";
import ProfilePic from "../post/profile-pic";
import { inputClasses } from "./register-form";
import { handleCompressImages } from "@/lib/helper/compress-images";
import { updateProfileAction } from "@/lib/actions/update-profile-action";
import ArrowBack from "../buttons/arrow-back";

const EditProfile = (user: UserDataType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string>("");

  //handle Form submission
  const [state, formAction, isPending] = useActionState(
    updateProfileAction.bind(null, image),
    {
      error: "",
      success: false,
    }
  );

  const pickImage = () => {
    inputRef.current?.click();
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Compress the selected image
      const compressedBlob = await handleCompressImages([file]);

      if (compressedBlob.length > 0) {
        // Convert compressed blob into File
        const compressedFile = new File([compressedBlob[0]], file.name, {
          type: compressedBlob[0].type,
        });

        setImage(compressedFile);

        // Extract local link to show preview of the image
        const imageUrl = URL.createObjectURL(compressedFile);
        setImageUrls(imageUrl);
      }
    }
  };

  return (
    <form action={formAction} className="flex flex-col gap-[5px] p-[20px]">
      <ArrowBack />
      <p className="font-semibold text-[20px]">Edit Profile</p>

      <div onClick={pickImage} className="mx-auto cursor-pointer rounded-full">
        <ProfilePic
          username=""
          profilePic={imageUrls || user?.profilePic || ""}
          size={150}
        />
        <input
          accept="image/*"
          onChange={handleImage}
          ref={inputRef}
          type="file"
          className="hidden"
        />
      </div>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className={inputClasses}
        defaultValue={state.data?.name || user?.name}
      />

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className={inputClasses}
        defaultValue={state.data?.username || user?.username}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className={inputClasses}
        defaultValue={state.data?.email || user?.email}
      />

      {state.error && <p className="text-red-500">{state.error}</p>}

      <button disabled={isPending} className="my-[20px] bg-foreground text-background  p-[10px] rounded-lg font-semibold">
        {isPending ? "Saving...." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfile;
