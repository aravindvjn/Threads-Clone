"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdVerified } from "react-icons/md";
import ProfilePic from "../post/profile-pic";
import AttachMedia from "../common/attach-media";
import ThreadImagePreview from "../common/thread-image-preview";
import { getUserData, UserDataType } from "@/lib/get-functions/get-user-data";

type CommentInputProps = {
  setImages?: Dispatch<SetStateAction<File[] | null>>;
  setImageUrls: Dispatch<SetStateAction<string[]>>;
  imageUrls:string[]
};

const CommentInput = ({ setImages, setImageUrls,imageUrls }: CommentInputProps) => {
  const [user, setUser] = useState<UserDataType>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textArea = textAreaRef?.current;
    if (textArea) {
      textArea.style.height = `auto`;
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const results = await getUserData();
      setUser(results);
    };

    fetchCurrentUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex px-[10px] pt-[10px] gap-[12px]">
        <ProfilePic profilePic={user.profilePic || ""} size={47} />
        <div className="flex flex-col">
          <p className="flex text-[18px] font-semibold items-center gap-1">
            {user?.username}
            {false && <MdVerified className="text-blue-600" />}
          </p>
          <textarea
            ref={textAreaRef}
            autoFocus
            className="bg-transparent outline-none text-blue-500"
            placeholder={`Reply to this thread`}
            onInput={handleInput}
            rows={1}
            name="content"
          />
          <AttachMedia setImageUrls={setImageUrls} setImages={setImages} />
        </div>
      </div>
      <ThreadImagePreview imageUrls={imageUrls} />
    </>
  );
};

export default CommentInput;
