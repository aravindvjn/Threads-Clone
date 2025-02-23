"use client";
import React, { startTransition, useOptimistic, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Button from "./button";
import { LuSend } from "react-icons/lu";
import Comments from "../comment/comments";
import { updateThreadLike } from "@/lib/actions/update-thread-like";
import { threadId } from "worker_threads";

type OperationalButtonsType = {
  isUserLiked: boolean;
  likeCount: number;
  replyCount: number;
  threadId: string;
};

const OperationalButtons = ({
  isUserLiked,
  likeCount,
  replyCount,
  threadId,
}: OperationalButtonsType) => {
  //State to show comments page
  const [showComments, setShowComments] = useState<string>("");

  //Optimisitic States to update Likes and Like Count
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isUserLiked);

  const [optimisticLikeCount, setOptimisticLikeCount] =
    useOptimistic(likeCount);

  //Handle Like (with server action to update if the operation is success, otherwise back to old state.)
  const handleLike = async () => {
    startTransition(() => {
      setOptimisticLiked((prev) => !prev);
      setOptimisticLikeCount((prev) => prev + (optimisticLiked ? -1 : 1));
    });

    try {
      await updateThreadLike(threadId);
    } catch {
      startTransition(() => {
        setOptimisticLiked((prev) => !prev);
        setOptimisticLikeCount((prev) => prev + (optimisticLiked ? 1 : -1));
      });
    }
  };

  //Render Like Component
  const renderLikeComponent = optimisticLiked ? (
    <IoMdHeart size={25} />
  ) : (
    <IoIosHeartEmpty size={25} />
  );

  const buttonClasses = "flex gap-[2px] opacity-60 items-center";

  const handleShowComments = () => {
    if (threadId) {
      setShowComments(threadId);
    }
  };

  return (
    <div className="flex pl-[67px] py-[10px] items-center gap-[18px]">
      
      {showComments && (
        <Comments
          setShowComments={setShowComments}
          showComments={showComments}
        />
      )}

      <Button onClick={handleLike}>
        <p
          className={`${buttonClasses} ${
            optimisticLiked ? "text-red-500 opacity-100" : ""
          }`}
        >
          {renderLikeComponent}

          <span>{optimisticLikeCount}</span>
        </p>
      </Button>

      <Button onClick={handleShowComments}>
        <p className={buttonClasses}>
          <FaRegComment size={20} />
          <span className="ml-[2px]">{replyCount}</span>
        </p>
      </Button>

      <Button>
        <span className={buttonClasses}>
          <LuSend size={20} />
        </span>
      </Button>
    </div>
  );
};

export default OperationalButtons;
