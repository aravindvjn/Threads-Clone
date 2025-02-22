import React from "react";
import PostHead from "../post/post-head";
import { CommentsType } from "./type";
import Image from "next/image";

const SingleComment = ({ author, content, image_url }: CommentsType) => {
  return (
    <div className="flex flex-col gap-[10px] py-[10px]">
      <PostHead {...author} content={content} />
      {image_url && (
        <div>
          <Image src={image_url} height={400} width={300} alt="reply image" className="w-[100px] aspect-square rounded ml-[57px] border border-bordercolor" />
        </div>
      )}
    </div>
  );
};

export default SingleComment;
