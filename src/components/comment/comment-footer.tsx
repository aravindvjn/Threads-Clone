import React from "react";

const CommentFooter = ({isPending}:{isPending:boolean}) => {
  return (
    <div className="p-[20px] flex justify-between w-full">
      <div></div>
      <button disabled={isPending} className="px-4 py-2 rounded-full text-background bg-foreground">
        {isPending ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default CommentFooter;
