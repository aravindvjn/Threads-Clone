import React from "react";
import ProfilePic from "../post/profile-pic";
import PostHead from "../post/post-head";

const SingleComment = () => {
  return (
    <div className="flex gap-[10px] py-[10px]">
      <PostHead content="React this, I add you" />
    </div>
  );
};

export default SingleComment;
