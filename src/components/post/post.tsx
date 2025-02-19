import React from "react";
import ProfilePic from "./profile-pic";
import { MdVerified } from "react-icons/md";
import OperationalButtons from "./operational-buttons";
import Media from "./content";
import PostHead from "./post-head";

const Post = () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat, ipsum vitae faucibus ullamcorper, lectus purus semper lectus, et elementum felis ligula et nunc. Sed non leo ut ipsum faucibus scelerisque.";

  return (
    <div className="flex flex-col pt-[10px] gap-[10px]">
      <PostHead content={content} />
      <Media />
      <OperationalButtons />
      <hr className="opacity-30 text-foreground pb-[10px]" />
    </div>
  );
};

export default Post;
