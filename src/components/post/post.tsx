import React from "react";
import OperationalButtons from "./operational-buttons";
import Media from "./content";
import PostHead from "./post-head";
import { PostPropType } from "./type";

const Post = ({
  author,
  content,
  createdAt,
  image_urls,
  isUserLiked,
  likeCount,
  replyCount,
  id,
  noHR,
}: PostPropType & {
  noHR?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col pt-[10px] ${
        image_urls?.length > 0 ? "gap-[10px]" : ""
      }`}
    >
      <PostHead createdAt={createdAt} {...author} content={content} />

      <Media image_urls={image_urls} />

      <OperationalButtons
        threadId={id}
        replyCount={replyCount}
        isUserLiked={isUserLiked}
        likeCount={likeCount}
      />

      {!noHR && <hr className="opacity-30 text-foreground pb-[10px]" />}
    </div>
  );
};

export default Post;
