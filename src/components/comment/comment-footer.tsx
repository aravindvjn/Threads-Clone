import React from "react";

const CommentFooter = () => {
  return (
    <div className="absolute bottom-0 p-[10px] flex justify-between w-full">
      <div></div>
      <button className="px-4 py-2 rounded-full text-background bg-foreground">
        Post
      </button>
    </div>
  );
};

export default CommentFooter;
